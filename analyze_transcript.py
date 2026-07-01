#!/usr/bin/env python3
"""Sales-ops transcript analyzer (CLI).

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

from transcript_analyzer import DEFAULT_MAX_TOKENS, DEFAULT_MODEL, analyze


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Analyze a sales call transcript into a structured report.")
    parser.add_argument("transcript", nargs="?", help="Path to the transcript text file")
    parser.add_argument("--stdin", action="store_true", help="Read the transcript from stdin instead of a file")
    parser.add_argument("--output", "-o", help="Write the report to this file instead of stdout")
    parser.add_argument("--model", default=DEFAULT_MODEL, help=f"Claude model ID to use (default: {DEFAULT_MODEL})")
    parser.add_argument("--max-tokens", type=int, default=DEFAULT_MAX_TOKENS, help="Max output tokens")
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

    report = analyze(transcript, model=args.model, max_tokens=args.max_tokens)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(report)
        print(f"Report written to {args.output}", file=sys.stderr)
    else:
        print(report)


if __name__ == "__main__":
    main()
