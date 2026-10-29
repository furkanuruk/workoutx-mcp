/**
 * Smoke test: spawn the built bridge over stdio, list the hosted tools and,
 * if WORKOUTX_API_KEY is set, make one live call.
 *   npm run smoke                                           # production
 *   WORKOUTX_MCP_URL=http://localhost:3000/mcp npm run smoke
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const serverPath = resolve(dirname(fileURLToPath(import.meta.url)), "../dist/index.js");
const client = new Client({ name: "workoutx-smoke", version: "1.0.0" });
await client.connect(
  new StdioClientTransport({ command: process.execPath, args: [serverPath], env: { ...process.env }, stderr: "inherit" }),
);

const { tools } = await client.listTools();
console.log(`tools (${tools.length}): ${tools.map((t) => t.name).join(", ")}`);
if (!tools.some((t) => t.name === "search_exercises")) throw new Error("search_exercises missing");

if (process.env.WORKOUTX_API_KEY) {
  const r = await client.callTool({ name: "search_exercises", arguments: { name: "squat", limit: 1 } });
  console.log(r.isError ? "live call FAILED:" : "live call ok:", r.content[0].text.slice(0, 200));
  if (r.isError) process.exitCode = 1;
}
await client.close();
