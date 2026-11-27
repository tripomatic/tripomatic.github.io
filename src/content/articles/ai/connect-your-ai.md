---
title: "How do I connect Claude, ChatGPT or another AI to my trips?"
description: "Add Tripomatic as a connector in your AI assistant using the address https://mcp.tripomatic.com/mcp, then sign in to Tripomatic and approve. The assistant can then read and edit your trips. It is free on every plan, and every change can be undone for 180 days."
section: ai
order: 3
platforms: [ios, android, web]
feature: connect-ai
appVersion: '26.8.9'
updated: 2026-11-27
popular: true
related: [planning/version-history, ai/ai-assistant]
faq:
  - q: "Does it cost anything?"
    a: "No. Connecting is free on every Tripomatic plan. What the assistant can do follows your plan; for example PDF export needs Premium."
  - q: "Can the assistant delete my trips?"
    a: "No. It cannot delete trips, share or invite people, or buy anything. Everything it changes is recorded in Version history."
  - q: "Does Tripomatic see my conversations?"
    a: "No. Tripomatic only receives the actions the assistant takes on your trips."
  - q: "How do I disconnect?"
    a: "In the Customer Portal at customer.tripomatic.com, open Connected apps › Manage connected assistants. Access ends within minutes. Also remove the connector in the assistant's settings."
---

Tripomatic works with AI assistants through the **Model Context Protocol (MCP)**. You need a Tripomatic account; guest accounts cannot connect. Full guide with screenshots: [tripomatic.com/en/connect-ai](https://tripomatic.com/en/connect-ai).

**Server address (the same for every assistant):** `https://mcp.tripomatic.com/mcp`

![Claude answering a question about a Tripomatic trip](./img/connect-ai-claude-chat.webp)

## Claude (web, desktop, mobile)

1. Open **Settings › Connectors** and choose **Add custom connector**.
2. Name it **Tripomatic** and paste the address.
3. Tap **Add**, then **Connect**, sign in to Tripomatic and approve access.

**Claude Code:** run `claude mcp add --transport http tripomatic https://mcp.tripomatic.com/mcp`, then `/mcp` and choose Tripomatic to sign in.

## ChatGPT

1. Go to **chatgpt.com/plugins**, tap **+** and choose **Add custom MCP server**.
2. Enter a name and the address, choose OAuth, and confirm.
3. Create it as a plugin and sign in to Tripomatic.
4. In a chat, type `@` and pick **Tripomatic**.

Availability depends on your ChatGPT plan, region and workspace settings.

## Gemini, Grok and others

- **Gemini**: Settings › Connected apps › add a custom app (currently personal accounts, US, English).
- **Grok**: grok.com/connectors › New Connector › Custom, then paste the address.
- **Any other assistant**: look for Connectors, Connected apps, Plugins, Tools or Integrations that accept a server address.

## What it can do

- **Read**: your trips (including shared ones), favorites, attachments, your plan and usage.
- **Change**: add, move and remove places and notes, add days, set stays, create a trip, change its title and dates, update favorites, save a file, export a trip (Premium).
- **Look up**: weather, travel alerts and public holidays.
- **Cannot**: delete a trip, share or invite, buy anything, or edit trips you can only view.

## Undo

Changes apply immediately and appear in the trip's [Version history](/planning/version-history/), where they can be undone for **180 days**. You can also ask the assistant to undo them.
