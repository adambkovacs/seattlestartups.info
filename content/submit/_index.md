---
title: "Contribute to Seattle Startups"
description: "Help fellow founders by contributing resources, research, data, or articles to the Seattle Startups directory"
layout: "submit"
---

## How to Contribute

Seattle Startups is a community-curated directory. Every resource was added by founders like you. We accept multiple types of contributions:

### What We Accept

| Contribution Type | Description | How to Submit |
|-------------------|-------------|---------------|
| **Resources** | Free programs, accelerators, funding opportunities | Pull Request or GitHub Issue |
| **Research & Data** | Market research, ecosystem studies, surveys | Pull Request or GitHub Issue |
| **Articles & Guides** | How-to guides, founder stories, ecosystem analysis | Pull Request or Email |
| **Corrections** | Fix outdated info, broken links, program changes | GitHub Issue |

---

## Option 1: GitHub Pull Request (Recommended)

1. **Fork the repository** on [GitHub](https://github.com/adambkovacs/seattlestartups.info)
2. **Add your contribution** to the appropriate location:
   - Resources → `data/resources/` (YAML files)
   - Guides → `content/guides/` (Markdown files)
   - Research → `content/research/` (Markdown files)
3. **Submit a Pull Request** with your changes

### Resource Format

Add resources to the relevant category file (e.g., `accelerators.yaml`, `mentorship.yaml`):

```yaml
- name: "Resource Name"
  description: "1-2 sentence description of what the resource offers"
  organization: "Organization providing the resource"
  website: "https://example.com"
  cost: "Free"
  eligibility: "Who can access this resource"
  counties:
    - King
    - Snohomish
  categories:
    - Accelerators
  audiences:
    - bipoc
    - women
    - veterans
  featured: false
```

### Article/Guide Format

Create a new Markdown file in `content/guides/`:

```markdown
---
title: "Your Article Title"
description: "Brief description for SEO"
date: 2026-01-31
categories: ["Guides"]
tags: ["relevant", "tags"]
author: "Your Name"
---

Your content here...
```

---

## Option 2: GitHub Issue

Don't want to deal with code? [Open a GitHub Issue](https://github.com/adambkovacs/seattlestartups.info/issues/new) with:

**For Resources:**
- Resource name and organization
- Website URL
- Brief description
- Which counties it serves
- Category (Accelerators, Mentorship, Funding, etc.)

**For Research/Data:**
- Title and summary
- Source/methodology
- Key findings
- Link to full research (if available)

**For Articles:**
- Proposed title
- Brief outline
- Your expertise/background

**For Corrections:**
- Which page or resource
- What's incorrect
- What it should say
- Source for correction

We'll format and add it for you!

---

## Guidelines

### We Accept Contributions That Are:

**Resources:**
- Free or have free tiers accessible to early-stage founders
- Available in Greater Seattle (King, Snohomish, Pierce, Kitsap, Thurston)
- Currently active (we verify proof-of-life annually)
- Relevant to startup founders (ideation through Series A)

**Research & Data:**
- Relevant to the Seattle/Puget Sound startup ecosystem
- Based on verifiable methodology
- Recent (within last 2 years preferred)
- Not behind paywalls (or have freely accessible summaries)

**Articles & Guides:**
- Actionable and practical for founders
- Based on real experience or solid research
- Not promotional or sales-focused
- Written in clear, accessible language

### We Don't Accept:

- Paid services without free options
- Inactive or defunct programs
- Resources not serving the Greater Seattle area
- Promotional content or advertisements
- Generic content not specific to Seattle
- Unverified claims without sources

---

## Attribution

We value contributors! Here's how we give credit:

| Contribution | Attribution |
|--------------|-------------|
| Resource submission | Listed on the resource page |
| Article/Guide | Author byline and bio |
| Research/Data | Full citation with link |
| Major corrections | Acknowledgment in changelog |

---

## Questions?

- **General questions:** [Open an issue](https://github.com/adambkovacs/seattlestartups.info/issues)
- **Partnership inquiries:** Contact via GitHub
- **Press/media:** Contact via GitHub

---

*This directory is maintained by volunteers who believe in open access to startup resources. Your contributions help founders across the Puget Sound region.*
