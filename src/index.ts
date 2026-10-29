#!/usr/bin/env node
/**
 * workoutx-mcp — stdio bridge to the hosted WorkoutX MCP server.
 *
 * Clients that speak HTTP MCP (Cursor, Claude Code, VS Code, ChatGPT) can use
 * https://api.workoutxapp.com/mcp directly. This package is for clients that
 * only launch local stdio servers (e.g. Claude Desktop): it connects to the
 * hosted server with your key and forwards tools/list and tools/call, so the
 * tools are always the current hosted set with no local copy to go stale.
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const VERSION = "2.1.0";
const ENDPOINT = (process.env.WORKOUTX_MCP_URL || "https://api.workoutxapp.com/mcp").replace(/\/+$/, "");
const API_KEY = process.env.WORKOUTX_API_KEY || "";

async function main() {
  // stdout carries the MCP stream; log to stderr only.
  console.error(`[workoutx-mcp] ${VERSION} · ${ENDPOINT} · apiKey=${API_KEY ? "set" : "MISSING"}`);
  if (!API_KEY) {
    console.error("[workoutx-mcp] WORKOUTX_API_KEY is not set; tool calls will fail. Free key: https://workoutxapp.com/dashboard.html");
  }

  const upstream = new Client({ name: "workoutx-mcp", version: VERSION });
  await upstream.connect(
    new StreamableHTTPClientTransport(new URL(ENDPOINT), {
      requestInit: { headers: API_KEY ? { "X-WorkoutX-Key": API_KEY } : {} },
    }),
  );

  const server = new Server(
    { name: "workoutx", version: VERSION },
    { capabilities: { tools: {} }, instructions: upstream.getInstructions() },
  );
  server.setRequestHandler(ListToolsRequestSchema, (req) => upstream.listTools(req.params));
  server.setRequestHandler(CallToolRequestSchema, (req) => upstream.callTool(req.params));

  await server.connect(new StdioServerTransport());
  console.error("[workoutx-mcp] ready");
}

main().catch((err) => {
  console.error("[workoutx-mcp] fatal:", err instanceof Error ? err.message : err);
  process.exit(1);
});
