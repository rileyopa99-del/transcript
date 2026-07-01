#!/usr/bin/env python3
"""Web app for the sales-ops transcript analyzer.

Run locally:
    export ANTHROPIC_API_KEY=sk-ant-...
    python3 app.py

Run in production (e.g. behind gunicorn on Render/Railway/Fly.io):
    gunicorn app:app
"""

import os

from flask import Flask, jsonify, render_template, request

from transcript_analyzer import DEFAULT_MODEL, analyze

app = Flask(__name__)

MAX_TRANSCRIPT_CHARS = 100_000


@app.route("/")
def index():
    return render_template("index.html", model=DEFAULT_MODEL)


@app.route("/analyze", methods=["POST"])
def analyze_endpoint():
    data = request.get_json(silent=True) or {}
    transcript = (data.get("transcript") or "").strip()

    if not transcript:
        return jsonify({"error": "Please paste a transcript before analyzing."}), 400

    if len(transcript) > MAX_TRANSCRIPT_CHARS:
        return (
            jsonify(
                {
                    "error": (
                        f"Transcript is too long ({len(transcript):,} characters). "
                        f"Max is {MAX_TRANSCRIPT_CHARS:,}."
                    )
                }
            ),
            400,
        )

    try:
        report = analyze(transcript)
    except Exception as exc:  # surface a clean message instead of a stack trace
        return jsonify({"error": f"Analysis failed: {exc}"}), 502

    return jsonify({"report": report})


@app.route("/healthz")
def healthz():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
