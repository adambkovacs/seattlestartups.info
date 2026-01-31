const fs = require('fs');
const path = require('path');

const projectDir = '/Users/adamkovacs/Documents/codebuild/seattlestartups.info';
const dataDir = path.join(projectDir, 'data', 'resources');
const contentDir = path.join(projectDir, 'content', 'resources');

// Simple YAML parser for our specific format
function parseYaml(content) {
  const resources = [];
  let currentResource = null;
  let arrayKey = null;

  const lines = content.split('\n');

  for (const line of lines) {
    if (line.trim().startsWith('#') || line.trim() === '') continue;

    // New resource starts with "  - name:"
    const nameMatch = line.match(/^\s{2}-\s+name:\s*"(.+)"$/);
    if (nameMatch) {
      if (currentResource) resources.push(currentResource);
      currentResource = { name: nameMatch[1] };
      arrayKey = null;
      continue;
    }

    if (currentResource) {
      // Array items like "      - King"
      const arrayMatch = line.match(/^\s{6}-\s+(.+)$/);
      if (arrayMatch && arrayKey) {
        if (!currentResource[arrayKey]) currentResource[arrayKey] = [];
        let val = arrayMatch[1].trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        currentResource[arrayKey].push(val);
        continue;
      }

      // Key: value pairs
      const kvMatch = line.match(/^\s{4}(\w+):\s*(.*)$/);
      if (kvMatch) {
        const key = kvMatch[1];
        let value = kvMatch[2].trim();

        if (value === '' || value === '[]') {
          arrayKey = key;
          currentResource[key] = [];
          continue;
        }

        arrayKey = null;

        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }

        if (value === 'true') value = true;
        if (value === 'false') value = false;

        currentResource[key] = value;
      }
    }
  }

  if (currentResource) resources.push(currentResource);
  return resources;
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapeQuotes(s) {
  return (s || '').replace(/"/g, '\\"');
}

// Create content directory
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Remove old generated files (keep _index.md)
const existingFiles = fs.readdirSync(contentDir);
for (const file of existingFiles) {
  if (file !== '_index.md' && file.endsWith('.md')) {
    fs.unlinkSync(path.join(contentDir, file));
  }
}

let count = 0;
const yamlFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.yaml')).sort();

for (const yamlFile of yamlFiles) {
  console.log(`Processing ${yamlFile}...`);

  const content = fs.readFileSync(path.join(dataDir, yamlFile), 'utf8');
  const resources = parseYaml(content);

  let fileCount = 0;
  for (const resource of resources) {
    if (!resource.name) continue;

    const slug = slugify(resource.name);
    const today = new Date().toISOString().split('T')[0];

    const counties = JSON.stringify(resource.counties || ['King']);
    const categories = JSON.stringify(resource.categories || ['Resources']);
    const audiences = JSON.stringify(resource.audiences || []);

    const frontmatter = `---
title: "${escapeQuotes(resource.name)}"
description: "${escapeQuotes(resource.description)}"
organization: "${escapeQuotes(resource.organization)}"
website: "${resource.website || ''}"
cost: "${resource.cost || 'Free'}"
eligibility: "${escapeQuotes(resource.eligibility)}"
city: "${resource.city || 'Seattle'}"
counties: ${counties}
categories: ${categories}
audiences: ${audiences}
featured: ${resource.featured === true || resource.featured === 'true'}
date: ${today}
type: resources
---
`;

    fs.writeFileSync(path.join(contentDir, `${slug}.md`), frontmatter);
    count++;
    fileCount++;
  }

  console.log(`  Created ${fileCount} pages`);
}

console.log(`\n✅ Generated ${count} resource pages in ${contentDir}`);
