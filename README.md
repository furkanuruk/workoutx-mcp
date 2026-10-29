# WorkoutX MCP Server — Exercise & Fitness API for AI Agents

[![npm](https://img.shields.io/npm/v/workoutx-mcp)](https://www.npmjs.com/package/workoutx-mcp)
[![MCP](https://img.shields.io/badge/MCP-Streamable%20HTTP-black)](https://workoutxapp.com/mcp.html)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Give **Claude Code, Cursor, ChatGPT, Grok, VS Code and Claude Desktop** the
[WorkoutX Exercise API](https://workoutxapp.com): 1,900+ exercises with 720p MP4
animations (male and female models), a workout and multi-week program generator, an
evidence-rated supplement database, and developer tools for building fitness apps:
typed models, code examples, request debugging and usage stats.

> *"Add a workout screen to the app using a 45-minute dumbbell chest session from WorkoutX."*
> *"Generate Swift models for exercises and workouts."*
> *"Why are we getting 429s since yesterday?"*

- **Hosted endpoint:** `https://api.workoutxapp.com/mcp` (Streamable HTTP) — nothing to run
- **Auth:** your WorkoutX API key in the `X-WorkoutX-Key` header (or `Authorization: Bearer`)
- **Free plan:** 500 requests, no credit card — [get a key](https://workoutxapp.com/dashboard.html)
- Every tool call counts as one API request, with the same plan limits as the REST API
- Docs and setup guide: **[workoutxapp.com/mcp.html](https://workoutxapp.com/mcp.html)**

## Tools

**Developer tools**

| Tool | What it does |
|---|---|
| `get_endpoint_reference` | Parameters, response shape, errors and a curl example for any v2 endpoint |
| `generate_types` | TypeScript, Swift (Codable), Kotlin (kotlinx.serialization) or Dart models |
| `get_code_example` | Snippets for React Native, Swift, Flutter, Next.js, Node and Python: lists, video playback with link refresh, workouts, error handling, a backend proxy |
| `diagnose_request` | Paste a failing request (and status/body): the cause and the fix. Never sends it |

**Exercise data, workouts and supplements**

| Tool | What it does |
|---|---|
| `get_usage_stats` | Your requests, success rate, p95 latency, errors by status, top endpoints, quota and media limits |
| `export_exercise_seed` | Exercise ids, names, muscles and equipment as JSON or CSV, without media (no media limit used) |
| `get_trending_exercises` | Most requested exercises and filters across WorkoutX apps, anonymised |
| `search_exercises` | Search and filter the catalog; `fields` and `includeMedia` for smaller answers |
| `get_exercise` | One exercise: instructions, tips, muscles, calories, media links |
| `get_exercise_media` | Fresh signed MP4 and thumbnail links |
| `list_exercise_filters` | Valid body parts, targets, equipment, categories and muscles |
| `find_exercise_alternatives` | Swaps for the same muscles, with or without given equipment |
| `find_similar_exercises` | Most similar exercises, ranked |
| `estimate_calories` | Calories from body weight and duration |
| `map_v1_exercise` | v1 exercise id → v2 exercise |
| `generate_workout` | One full session with warm-up, sets/reps/rest and cool-down (Growth+) |
| `generate_program` | Multi-week program with periodisation and deloads (Scale) |
| `search_supplements` | Supplements with evidence, dosage and timing (Growth+) |
| `get_supplement_stack` | Recommended stack for a goal (Scale) |
| `check_api_key` | Plan and remaining quota |

All tools are read-only and need an API key; each call counts as one API request.

## Connect

### Claude Code

```bash
claude mcp add --transport http workoutx https://api.workoutxapp.com/mcp --header "X-WorkoutX-Key: wx_your_key"
```

### Cursor (`~/.cursor/mcp.json`) and VS Code

```json
{
  "mcpServers": {
    "workoutx": {
      "url": "https://api.workoutxapp.com/mcp",
      "headers": { "X-WorkoutX-Key": "wx_your_key" }
    }
  }
}
```

### Claude Desktop and other stdio-only clients

This package bridges stdio to the hosted endpoint:

```json
{
  "mcpServers": {
    "workoutx": {
      "command": "npx",
      "args": ["-y", "workoutx-mcp"],
      "env": { "WORKOUTX_API_KEY": "wx_your_key" }
    }
  }
}
```

| Variable | Required | Default |
|---|---|---|
| `WORKOUTX_API_KEY` | yes | — |
| `WORKOUTX_MCP_URL` | no | `https://api.workoutxapp.com/mcp` |

## Development

```bash
npm install && npm run build
npm run smoke                                            # against production
WORKOUTX_MCP_URL=http://localhost:3000/mcp npm run smoke # against a local API
```

## Links

- Website: [workoutxapp.com](https://workoutxapp.com) · MCP guide: [workoutxapp.com/mcp.html](https://workoutxapp.com/mcp.html)
- REST API docs: [workoutxapp.com/docs.html](https://workoutxapp.com/docs.html)
- SDKs: [JavaScript](https://github.com/furkanuruk/workoutx-sdk-js) · [Python](https://github.com/furkanuruk/workoutx-sdk-python) · [Swift](https://github.com/furkanuruk/workoutx-sdk-swift) · [Flutter](https://github.com/furkanuruk/workoutx-sdk-flutter)
- Support: support@workoutxapp.com

MIT licensed.
