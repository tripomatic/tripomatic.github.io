# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Tripomatic support documentation site, a Jekyll-based static site hosted on GitHub Pages at [support.tripomatic.com](https://support.tripomatic.com). It contains help articles and documentation for Tripomatic (formerly Sygic Travel) users.

## Development Commands

```bash
# Install dependencies (first time only)
bundle install

# Run local development server (opens browser with live reload)
./run.sh
# or
bundle exec jekyll serve
```

After changes are committed to `master`, GitHub Pages rebuilds the site automatically (takes 3-5 minutes).

## Content Structure

- Content pages are markdown files (`.md` or `.markdown`) organized in topic folders
- Each page requires Jekyll front matter with at least a `title`:
  ```markdown
  ---
  title: Page Title
  ---
  ```
- Main navigation and page links are in `index.markdown`
- Images go in `assets/` with subfolders matching the content structure
- System folders start with `_` (do not add content there)

**Topic folders:**
- `editing-your-trip/` - Trip editing help
- `general-questions/` - General app questions
- `guides/` - Country travel guides
- `how-to-plan-a-trip/` - Trip planning tutorials
- `on-the-road/` - Navigation and GPS features
- `rebranding/` - Sygic Travel to Tripomatic migration info
- `shared-planning/` - Collaborative planning features
- `sygic-travel-premium/` - Premium subscription info

## Workflow

1. Create/edit markdown files in appropriate topic folders
2. Add images to `assets/` using markdown: `![Alt text](/assets/folder/image.jpg)`
3. Update `index.markdown` when adding/removing pages
4. Commit directly to `master` branch
