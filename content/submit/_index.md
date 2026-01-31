---
title: "Submit a Resource"
description: "Help fellow founders discover free resources by contributing to the Seattle Startups directory"
layout: "submit"
---

## How to Contribute

Seattle Startups is a community-curated directory. Every resource was added by founders like you. Here's how you can contribute:

### Option 1: GitHub Pull Request (Recommended)

1. **Fork the repository** on [GitHub](https://github.com/adambkovacs/seattlestartups.info)
2. **Add your resource** to the appropriate YAML file in `data/resources/`
3. **Submit a Pull Request** with your changes

### Resource Format

Add your resource to the relevant category file (e.g., `accelerators.yaml`, `mentorship.yaml`):

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

### Required Fields

| Field | Description |
|-------|-------------|
| `name` | Official name of the resource/program |
| `description` | 1-2 sentences explaining what it offers |
| `organization` | Organization providing the resource |
| `website` | Direct link to the resource page |
| `cost` | "Free" for free resources, or cost details |
| `counties` | King, Snohomish, Pierce, Kitsap, and/or Thurston |
| `categories` | Accelerators, Mentorship, Funding, Coworking, Events, Education, Libraries |

### Option 2: GitHub Issue

Don't want to deal with YAML? [Open a GitHub Issue](https://github.com/adambkovacs/seattlestartups.info/issues/new) with:

- Resource name and organization
- Website URL
- Brief description
- Which counties it serves
- Category (Accelerators, Mentorship, Funding, etc.)

We'll add it for you!

### Guidelines

**We accept resources that are:**
- Free or have free tiers accessible to early-stage founders
- Available in Greater Seattle (King, Snohomish, Pierce, Kitsap, Thurston)
- Currently active (we verify proof-of-life annually)
- Relevant to startup founders (ideation through Series A)

**We don't accept:**
- Paid services without free options
- Inactive or defunct programs
- Resources not serving the Greater Seattle area
- Generic national resources without local presence

### Questions?

[Open an issue](https://github.com/adambkovacs/seattlestartups.info/issues) or reach out through the repository.
