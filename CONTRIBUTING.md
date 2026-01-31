# Contributing to Seattle Startups

Thanks for helping grow the Seattle startup ecosystem! This guide explains how to add resources, fix errors, or improve the site.

## Quick Start: Add a Resource

**Time required:** ~5 minutes

1. Fork this repo
2. Create a new file in `content/resources/`
3. Use the template below
4. Submit a PR

That's it. We review PRs within 48 hours.

---

## Resource Template

Create a file like `content/resources/your-resource-name.md`:

```markdown
---
title: "Resource Name"
description: "One sentence about what this resource provides"
date: 2026-01-30
draft: false

# Categorization
categories:
  - "Funding"  # Options: Funding, Accelerators, Incubators, Coworking, Mentorship, Education, Networking, Legal, Government, Tools, Events, Community
counties:
  - "King"     # Options: King, Pierce, Snohomish, Kitsap, Thurston

# Resource details
organization: "Organization Name"
website: "https://example.com"
cost: "Free"  # or "Paid", "$500", etc.
eligibility: "Who can apply/access"

# Optional
audiences:
  - "bipoc"    # Options: bipoc, women, veterans, lgbtq
featured: false
---

## About

Write 2-3 paragraphs about the resource. What does it offer? Who runs it? What makes it valuable?

## What You Get

- Bullet points
- Of specific benefits
- Or services provided

## How to Apply

Steps to access this resource.
```

---

## Contribution Types

### 1. Add a New Resource

**Requirements:**
- Resource must be legitimately free (or have a free tier)
- Must serve the Greater Seattle area (King, Pierce, Snohomish, Kitsap, or Thurston counties)
- Must be currently active (not defunct)

**Process:**
1. Check it doesn't already exist (search the site or `content/resources/`)
2. Create the markdown file using the template
3. Submit PR with title: `resource: Add [Resource Name]`

### 2. Fix an Error

Found outdated info, broken link, or typo?

1. Open an issue describing the problem, OR
2. Submit a PR with the fix directly

**PR title format:** `fix: [Brief description]`

### 3. Improve the Site

Ideas for design, features, or structure improvements:

1. Open an issue first to discuss
2. Get feedback before building
3. Submit PR when ready

**PR title format:** `feat: [Brief description]` or `improve: [Brief description]`

---

## PR Guidelines

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
resource: Add WTIA Founder Cohort
fix: Update CoMotion Labs URL
feat: Add search filtering by county
docs: Improve contribution guide
```

### Branch Naming

```
resource/add-wtia-founder-cohort
fix/comotion-labs-url
feat/county-filter
```

### PR Checklist

Before submitting:

- [ ] Resource is free or has free tier
- [ ] Resource serves Greater Seattle area
- [ ] Resource is currently active
- [ ] File follows the template format
- [ ] No duplicate of existing resource
- [ ] PR title follows convention

---

## Local Development

### Prerequisites

- [Hugo](https://gohugo.io/installation/) (extended version)
- Git

### Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/seattlestartups.info.git
cd seattlestartups.info

# Start dev server
hugo server -D

# Open http://localhost:1313
```

### Build

```bash
hugo --gc --minify
# Output in ./public/
```

---

## Code of Conduct

Be helpful. Be accurate. Be kind.

- Submit real, verified resources only
- No spam, self-promotion without value, or affiliate links
- Respect other contributors
- Keep discussions constructive

---

## Questions?

- **General questions:** Open a [Discussion](https://github.com/adambkovacs/seattlestartups.info/discussions)
- **Bug reports:** Open an [Issue](https://github.com/adambkovacs/seattlestartups.info/issues)
- **Resource suggestions:** Open an Issue with `[Resource]` prefix

---

## Recognition

Contributors are automatically listed in the GitHub contributors page. Major contributors may be featured on the site.

Thanks for helping Seattle founders find the resources they need! 🚀
