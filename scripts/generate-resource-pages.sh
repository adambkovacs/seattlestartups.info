#!/bin/bash
# Generate individual markdown pages for each resource in YAML data files
# This creates SEO-friendly individual pages at /resources/{slug}/

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DATA_DIR="$PROJECT_DIR/data/resources"
CONTENT_DIR="$PROJECT_DIR/content/resources"

# Create content directory if it doesn't exist
mkdir -p "$CONTENT_DIR"

# Remove old generated files (keep _index.md)
find "$CONTENT_DIR" -name "*.md" ! -name "_index.md" -delete 2>/dev/null || true

echo "Generating resource pages from YAML data..."

# Counter for resources
count=0

# Process each YAML file
for yaml_file in "$DATA_DIR"/*.yaml; do
  [ -f "$yaml_file" ] || continue

  filename=$(basename "$yaml_file" .yaml)
  echo "Processing $filename.yaml..."

  # Use yq to parse YAML and generate markdown files
  # If yq isn't available, fall back to a simpler approach
  if command -v yq &> /dev/null; then
    # Parse with yq
    yq eval '.resources[]' "$yaml_file" -o=json 2>/dev/null | while read -r resource; do
      name=$(echo "$resource" | jq -r '.name // empty')
      [ -z "$name" ] && continue

      # Generate slug from name
      slug=$(echo "$name" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$//')

      description=$(echo "$resource" | jq -r '.description // ""')
      organization=$(echo "$resource" | jq -r '.organization // ""')
      website=$(echo "$resource" | jq -r '.website // ""')
      cost=$(echo "$resource" | jq -r '.cost // "Free"')
      eligibility=$(echo "$resource" | jq -r '.eligibility // ""')
      city=$(echo "$resource" | jq -r '.city // "Seattle"')
      featured=$(echo "$resource" | jq -r '.featured // false')

      # Get arrays
      counties=$(echo "$resource" | jq -c '.counties // ["King"]')
      categories=$(echo "$resource" | jq -c '.categories // ["Resources"]')
      audiences=$(echo "$resource" | jq -c '.audiences // []')

      # Create markdown file
      cat > "$CONTENT_DIR/$slug.md" << EOF
---
title: "$name"
description: "$description"
organization: "$organization"
website: "$website"
cost: "$cost"
eligibility: "$eligibility"
city: "$city"
counties: $counties
categories: $categories
audiences: $audiences
featured: $featured
date: $(date +%Y-%m-%d)
type: resources
---
EOF

      ((count++)) || true
    done
  else
    # Fallback: use Python for YAML parsing
    python3 << PYTHON_SCRIPT
import yaml
import json
import re
import os
from datetime import date

yaml_file = "$yaml_file"
content_dir = "$CONTENT_DIR"

def slugify(text):
    slug = text.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    return slug

with open(yaml_file, 'r') as f:
    data = yaml.safe_load(f)

if not data or 'resources' not in data:
    exit(0)

for resource in data['resources']:
    name = resource.get('name', '')
    if not name:
        continue

    slug = slugify(name)

    # Build frontmatter
    frontmatter = {
        'title': name,
        'description': resource.get('description', ''),
        'organization': resource.get('organization', ''),
        'website': resource.get('website', ''),
        'cost': resource.get('cost', 'Free'),
        'eligibility': resource.get('eligibility', ''),
        'city': resource.get('city', 'Seattle'),
        'counties': resource.get('counties', ['King']),
        'categories': resource.get('categories', ['Resources']),
        'audiences': resource.get('audiences', []),
        'featured': resource.get('featured', False),
        'date': str(date.today()),
        'type': 'resources'
    }

    # Write markdown file
    filepath = os.path.join(content_dir, f'{slug}.md')
    with open(filepath, 'w') as f:
        f.write('---\n')
        f.write(yaml.dump(frontmatter, default_flow_style=False, allow_unicode=True, sort_keys=False))
        f.write('---\n')

    print(f"  Created: {slug}.md")
PYTHON_SCRIPT
  fi
done

# Count generated files
generated=$(find "$CONTENT_DIR" -name "*.md" ! -name "_index.md" | wc -l | tr -d ' ')
echo ""
echo "✅ Generated $generated resource pages in $CONTENT_DIR"
echo ""
echo "Run 'hugo server' to preview the site with individual resource pages."
