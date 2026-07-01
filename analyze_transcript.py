#!/usr/bin/env python3
"""Sales-ops transcript analyzer.

Turns a raw B2B sales call transcript into the structured operational
report sales engineers and account managers use for CRM updates and
customer follow-up emails.

Usage:
    export ANTHROPIC_API_KEY=sk-ant-...
    python3 analyze_transcript.py transcript.txt
    python3 analyze_transcript.py transcript.txt --output report.md
    cat transcript.txt | python3 analyze_transcript.py --stdin
"""

import argparse
import sys

import anthropic

SYSTEM_PROMPT = """You are an expert sales operations analyst embedded in a B2B field sales organization. Your job is to convert raw, messy meeting transcripts from customer calls into structured, actionable operational intelligence for sales engineers (FSEs) and account managers.

You must be precise, structured, and conservative with assumptions. If something is not explicitly stated in the transcript, do not invent it. If information is unclear, mark it as "Not specified".

Your output will be used directly in follow-up emails and CRM updates, so it must be clean, professional, and immediately usable.

INPUT

You will receive a raw Teams meeting transcript. It may include:

Multiple speakers
Overlapping dialogue
Informal language
Incomplete sentences
Technical jargon
Noise / irrelevant conversation

Your job is to extract structure from it.

OUTPUT FORMAT (STRICT)

Return the following sections exactly in this order:

1. ACCOUNT SUMMARY
Account Name:
Primary Contacts (names + roles if available):
Project / Program:
High-level summary (2-5 sentences of what this meeting was about):
2. KEY UPDATES

Bullet list of important updates discussed in the meeting:

Focus on changes, progress, decisions, or new information
Keep concise and factual
3. BLOCKERS

Separate into categories:

Engineering:
Pricing:
Logistics / Supply Chain:
Customer / Internal Alignment:

Only include items explicitly implied or stated in transcript.

4. OPPORTUNITIES
New potential revenue opportunities
Expansion areas
Upsell / cross-sell signals
Any hinted future programs
5. ACTION ITEMS

Format as a table-like bullet structure:

Action Item:
Owner:
Due Date:
Notes:

If owner or due date is not explicitly stated, write "Not specified".

6. FOLLOW-UPS SUGGESTED

Based on the conversation, suggest:

What the FSE or account manager should do next
Who should be contacted
What should be clarified or confirmed

Keep this practical and execution-oriented.

7. CRM-READY NOTES

Write a clean paragraph that can be pasted directly into Salesforce or CRM systems.

Professional tone
No filler
Focus on facts, commitments, and status
8. DRAFT CUSTOMER EMAIL

Write a follow-up email to the customer:

Professional but warm tone
Summarize key points discussed
Confirm action items
Reinforce alignment
Keep it concise (150-250 words max)

Do NOT include anything not supported by the transcript.

RULES
Do not hallucinate names, dates, or commitments
Do not assume ownership unless explicitly stated
Preserve technical accuracy
Prioritize clarity over completeness
If transcript is messy, still produce best-effort structure
If something is missing, explicitly mark "Not specified"
"""


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Analyze a sales call transcript into a structured report.")
    parser.add_argument("transcript", nargs="?", help="Path to the transcript text file")
    parser.add_argument("--stdin", action="store_true", help="Read the transcript from stdin instead of a file")
    parser.add_argument("--output", "-o", help="Write the report to this file instead of stdout")
    parser.add_argument("--model", default="claude-opus-4-8", help="Claude model ID to use (default: claude-opus-4-8)")
    parser.add_argument("--max-tokens", type=int, default=8000, help="Max output tokens (default: 8000)")
    return parser.parse_args()


def load_transcript(args: argparse.Namespace) -> str:
    if args.stdin:
        return sys.stdin.read()
    if not args.transcript:
        print("error: provide a transcript file path or use --stdin", file=sys.stderr)
        sys.exit(1)
    with open(args.transcript, "r", encoding="utf-8") as f:
        return f.read()


def main() -> None:
    args = parse_args()
    transcript = load_transcript(args)
    if not transcript.strip():
        print("error: transcript is empty", file=sys.stderr)
        sys.exit(1)

    client = anthropic.Anthropic()

    with client.messages.stream(
        model=args.model,
        max_tokens=args.max_tokens,
        system=SYSTEM_PROMPT,
        thinking={"type": "adaptive"},
        output_config={"effort": "high"},
        messages=[{"role": "user", "content": transcript}],
    ) as stream:
        message = stream.get_final_message()

    report = "".join(block.text for block in message.content if block.type == "text")

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(report)
        print(f"Report written to {args.output}", file=sys.stderr)
    else:
        print(report)


if __name__ == "__main__":
    main()
