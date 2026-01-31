<p align="center">
  <img src="https://img.shields.io/badge/resources-170%2B-0891b2?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyTDEyIDZNMTIgNkw4IDhMMTYgOEwxMiA2TTEwIDhMMTAgMTJMMTQgMTJMMTQgOE0xMSAxMkwxMSAyME0xMyAxMkwxMyAyME04IDIwTDE2IDIwTTIgMjJMNiAxNkwxMCAxOUwxNCAxNEwxOCAxOEwyMiAyMiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4=" alt="170+ Resources"/>
  <img src="https://img.shields.io/badge/counties-5-059669?style=for-the-badge" alt="5 Counties"/>
  <img src="https://img.shields.io/badge/cost-$0-22543d?style=for-the-badge" alt="Free"/>
  <img src="https://img.shields.io/badge/license-MIT-64748b?style=for-the-badge" alt="MIT License"/>
</p>

<h1 align="center">
  🏔️ Seattle Startups
</h1>

<p align="center">
  <strong>The Pacific Northwest startup ecosystem, mapped.</strong><br/>
  Accelerators, funding, workspaces, mentorship—every free resource founders actually use.
</p>

<p align="center">
  <a href="https://seattlestartups.info">View Site</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="CONTRIBUTING.md">Contribute</a> •
  <a href="https://github.com/adambkovacs/seattlestartups.info/issues">Report Issue</a>
</p>

---

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/adambkovacs/seattlestartups.info/hugo.yml?branch=main&style=flat-square&label=deploy" alt="Deploy Status"/>
  <img src="https://img.shields.io/github/last-commit/adambkovacs/seattlestartups.info?style=flat-square" alt="Last Commit"/>
  <img src="https://img.shields.io/github/contributors/adambkovacs/seattlestartups.info?style=flat-square" alt="Contributors"/>
  <img src="https://img.shields.io/github/stars/adambkovacs/seattlestartups.info?style=flat-square" alt="Stars"/>
</p>

---

## 🎯 What This Is

A community-curated directory of **free startup resources** across Greater Seattle:

| County | Coverage |
|--------|----------|
| **King** | Seattle, Bellevue, Redmond, Eastside |
| **Pierce** | Tacoma, South Sound |
| **Snohomish** | Everett, North Sound |
| **Kitsap** | Bainbridge, Silverdale, Poulsbo |
| **Thurston** | Olympia, Lacey |

### Resource Categories

🚀 **Accelerators & Incubators** — WTIA, CoMotion, Founders, SEA619
💰 **Funding & Grants** — Angel groups, competitions, state grants
🏢 **Coworking & Labs** — Free desks, makerspaces, maritime hubs
🎓 **Education** — SBDCs, workshops, university programs
👥 **Mentorship** — SCORE, founder circles, office hours
📅 **Events** — Pitch nights, networking, demo days

---

## 🚀 Quick Start

### View the Site

**[seattlestartups.info](https://seattlestartups.info)** — browse, search, filter by category or county.

### Run Locally

```bash
# Clone
git clone https://github.com/adambkovacs/seattlestartups.info.git
cd seattlestartups.info

# Run dev server
hugo server -D

# Open http://localhost:1313
```

### Add a Resource

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full guide. Quick version:

```bash
# 1. Fork & clone
# 2. Create content/resources/your-resource.md
# 3. Use the template from CONTRIBUTING.md
# 4. Submit PR
```

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| **Static Site** | [Hugo](https://gohugo.io) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) (CDN) |
| **Fonts** | Poppins, Montserrat |
| **Hosting** | GitHub Pages |
| **CI/CD** | GitHub Actions |
| **Domain** | Porkbun DNS |

### Project Structure

```
seattlestartups.info/
├── content/
│   ├── resources/        # Individual resource pages
│   ├── counties/         # County landing pages
│   └── research/         # Background research docs
├── data/
│   └── resources/        # YAML data files (126 resources)
├── themes/
│   └── startup-theme/    # Custom Hugo theme
│       └── layouts/
│           ├── partials/ # Header, footer, cards
│           └── _default/ # Base templates
└── .github/
    └── workflows/        # CI + Deploy actions
```

---

## 📊 Data

Resources are stored in two formats:

1. **YAML data files** (`data/resources/*.yaml`) — structured, machine-readable
2. **Markdown content** (`content/resources/*.md`) — rich, human-readable pages

### Data Files

| File | Count | Contents |
|------|-------|----------|
| `accelerators.yaml` | 19 | Accelerators, incubators, competitions |
| `mentorship.yaml` | 23 | SCORE, founder circles, coaching |
| `funding.yaml` | 15 | Grants, angel groups, pitch competitions |
| `spaces.yaml` | 22 | Coworking, makerspaces, labs |
| `events.yaml` | 21 | Pitch nights, networking, conferences |
| `libraries.yaml` | 8 | Library business centers |
| `universities.yaml` | 18 | University programs, student resources |

### Audience Tags

Resources targeting specific communities are tagged:

- `bipoc` — BIPOC/minority founders
- `women` — Women entrepreneurs
- `veterans` — Veteran founders
- `lgbtq` — LGBTQ+ founders

---

## 🤝 Contributing

We welcome contributions! See **[CONTRIBUTING.md](CONTRIBUTING.md)** for:

- How to add a resource (5 min)
- How to fix errors
- PR guidelines
- Local development setup

### Quick Contribution

1. **Know a resource?** → [Open an issue](https://github.com/adambkovacs/seattlestartups.info/issues/new) with details
2. **Want to add it yourself?** → Fork, add markdown file, submit PR
3. **Found an error?** → PR with fix or open issue

---

## 📜 License

**MIT License** — do whatever you want with this.

The resource data is community-contributed and factual. No warranties on accuracy; verify before relying on any resource.

---

## 🙏 Acknowledgments

Built for the Seattle startup community.

- Research compiled from [WTIA](https://washingtontechnology.org), regional EDCs, and community input
- Design inspired by Pacific Northwest: overcast skies, evergreen forests, Rainier views
- Powered by [Hugo](https://gohugo.io), [Tailwind](https://tailwindcss.com), [GitHub Pages](https://pages.github.com)

---

<p align="center">
  <sub>Made with ☕ in Seattle</sub>
</p>
