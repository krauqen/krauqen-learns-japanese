---
name: daily-japanese-coach
description: Daily coaching workflow for this Japanese-learning repo. Use when the user wants Codex to walk them through one day of study, brainstorm how to use the time and energy available, choose a minimum/normal/stretch session, optionally guide the session in chat, and update the Markdown repo afterward with dated logs, phrase-bank changes, kana cheat sheet updates, resource index updates, weekly review notes, web app sync, or plan adjustments.
---

# Daily Japanese Coach

## Overview

Coach one recovery-aware Japanese study day for the Animal Crossing: New Horizons fluency goal. Keep Markdown as the source of truth and update the repo only after confirming what actually happened.

## Repo Files

Read these files before proposing the day:

- `START_HERE.md`
- `plans/8-week-recovery-plan.md`
- the newest relevant files under `logs/`, if any
- `vocab/animal-crossing-phrase-bank.md` when vocab or gameplay is involved
- `resources/kana-cheat-sheet.md` when kana, read-aloud, or contrast drills are involved
- `resources/README.md` when tools, references, or study resources change
- the current checkpoint file when near the end of month 1 or 2

If the current week is not obvious from logs or the user has not said it, infer conservatively from the plan and ask one short question only if necessary.

## Session Workflow

1. Orient: summarize the current week, real-world test, and likely next useful action in 2-4 sentences.
2. Ask for constraints: available time, energy/pain level, and whether Animal Crossing is possible today. Ask no more than 3 questions.
3. Propose a session: choose minimum, normal, or stretch. Include a concrete sequence with time boxes and a fallback if fatigue interrupts.
4. Coach the session: if the user wants to work in chat, guide one step at a time. Keep prompts small enough for low-energy recovery days.
5. Capture evidence: at the end, ask what was completed, what Japanese was encountered, and any new phrases worth keeping.
6. Update files: create or edit Markdown logs and phrase-bank entries with `apply_patch`. Do not invent progress the user did not report.
7. Sync learning references: update the kana cheat sheet, resources index, checkpoint, or plan when the session creates new evidence that belongs there.
8. Sync the web app: if any Markdown file is created or should newly appear in the reader, update the `docs` list in `app/app.js` in the same turn.
9. Close the loop: summarize what changed, the next minimum step, and any plan adjustment implied by today.

## Daily Log Rules

Prefer dated logs under `logs/daily/YYYY-MM-DD.md`. If the directory does not exist, create it.

Use `logs/daily-log-template.md` as the shape, but keep entries concise. A valid daily log should include:

- date
- selected version: minimum, normal, or stretch
- what was done
- one real Japanese encounter, if any
- new words/phrases, if any
- friction
- tomorrow's minimum next step

If the user completes a weekly review, create or update `logs/weekly/week-XX.md` using `logs/weekly-review-template.md`.

## Resource Sync Rules

Keep `resources/kana-cheat-sheet.md` aligned with actual practice. Add kana from new words, read-aloud drills, or explicit contrast drills; include the source word or drill and a short meaning or note. Do not add a full chart unless the user has actually practiced it.

Keep `resources/README.md` aligned with the user's real tool stack. Update chosen resources when the user starts, stops, or relies on a tool such as Renshuu, Duolingo, a dictionary, review system, tutor, group, or Codex coaching. Keep this list small and current.

When a phrase is game-relevant and worth review, update `vocab/animal-crossing-phrase-bank.md`; when it mainly teaches kana recognition, update the kana cheat sheet; when it changes how the user studies, update the resources index or plan. Some session evidence may belong in more than one place.

## Web App Sync Rules

The web app reads Markdown from the hard-coded `docs` array in `app/app.js`. After creating a dated daily log, weekly review, checkpoint, plan, resource, phrase-bank file, or other Markdown file, add or update its entry there so the reader exposes it.

For dated daily logs, use the title `Today: YYYY-MM-DD` for the current date's log and rename the previous current-day entry to `Daily Log: YYYY-MM-DD`. Keep the log under the `Logs` group and use the day-of-month as the icon when it fits in two characters.

Before finishing a session update, compare the repo's Markdown files against the `docs` paths and fix any missing entries. A quick shell check is acceptable; do not include `.git` files.

## Phrase Bank Rules

Update `vocab/animal-crossing-phrase-bank.md` only with phrases the user encountered or deliberately chose. Prefer repeated, game-relevant, or emotionally sticky phrases. Mark uncertain readings or meanings with `?` rather than pretending certainty.

## Coaching Style

Be warm, practical, and low-pressure. Treat ACL recovery as a real constraint. Preserve momentum with small wins, not guilt. Optimize for a study day the user can actually finish.

Use real-world outcomes rather than abstract study volume. Tie tasks back to the current weekly test and the Animal Crossing goal.

## File Editing

Before editing, say which files will change. Use `apply_patch` for manual edits. Respect unrelated user changes and do not rewrite the whole plan unless the user asks.

When the user says the session is done, update the repo in the same turn whenever possible.

## Example Invocation

User: "Use daily-japanese-coach. I have 45 minutes and low energy today."

Expected behavior: inspect the plan/logs, identify the current week, suggest a minimum-to-normal session, guide the user through the first action if requested, then create a dated daily log and phrase-bank entries from what actually happened.
