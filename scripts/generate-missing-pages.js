#!/usr/bin/env node

/**
 * Generate missing content pages from YAML data files
 *
 * This script reads all YAML resource files and creates markdown
 * content pages for resources that don't have them yet.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DATA_DIR = path.join(__dirname, '../data/resources');
const CONTENT_DIR = path.join(__dirname, '../content/resources');

// Slugify function matching Hugo's behavior
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[&]/g, '-and-')
    .replace(/[+]/g, '-plus-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');
}

// Get existing content pages
function getExistingPages() {
  const files = fs.readdirSync(CONTENT_DIR);
  return new Set(
    files
      .filter(f => f.endsWith('.md') && f !== '_index.md')
      .map(f => f.replace('.md', ''))
  );
}

// Read all YAML resources
function getAllResources() {
  const resources = [];
  const yamlFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.yaml'));

  for (const file of yamlFiles) {
    const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
    const data = yaml.load(content);

    if (data && data.resources) {
      for (const resource of data.resources) {
        resources.push({
          ...resource,
          sourceFile: file
        });
      }
    }
  }

  return resources;
}

// Generate markdown frontmatter
function generateMarkdown(resource) {
  const frontmatter = {
    title: resource.name,
    description: resource.description || '',
    organization: resource.organization || '',
    website: resource.website || '',
    cost: resource.cost || 'Free',
    eligibility: resource.eligibility || '',
    city: resource.city || 'Seattle',
    counties: resource.counties || ['King'],
    categories: resource.categories || [],
    audiences: resource.audiences || [],
    featured: resource.featured || false,
    date: new Date().toISOString().split('T')[0],
    type: 'resources'
  };

  // Build YAML frontmatter
  let md = '---\n';
  md += `title: "${frontmatter.title.replace(/"/g, '\\"')}"\n`;
  md += `description: "${frontmatter.description.replace(/"/g, '\\"')}"\n`;
  md += `organization: "${frontmatter.organization.replace(/"/g, '\\"')}"\n`;
  md += `website: "${frontmatter.website}"\n`;
  md += `cost: "${frontmatter.cost}"\n`;
  md += `eligibility: "${frontmatter.eligibility.replace(/"/g, '\\"')}"\n`;
  md += `city: "${frontmatter.city}"\n`;
  md += `counties: ${JSON.stringify(frontmatter.counties)}\n`;
  md += `categories: ${JSON.stringify(frontmatter.categories)}\n`;
  md += `audiences: ${JSON.stringify(frontmatter.audiences)}\n`;
  md += `featured: ${frontmatter.featured}\n`;
  md += `date: ${frontmatter.date}\n`;
  md += `type: ${frontmatter.type}\n`;
  md += '---\n';

  return md;
}

// Main execution
function main() {
  const existingPages = getExistingPages();
  const resources = getAllResources();
  const seenSlugs = new Set();
  let created = 0;
  let skipped = 0;

  console.log(`Found ${existingPages.size} existing content pages`);
  console.log(`Found ${resources.length} resources in YAML files`);
  console.log('');

  for (const resource of resources) {
    const slug = slugify(resource.name);

    // Skip duplicates within YAML
    if (seenSlugs.has(slug)) {
      continue;
    }
    seenSlugs.add(slug);

    // Skip if page exists
    if (existingPages.has(slug)) {
      skipped++;
      continue;
    }

    // Generate the page
    const markdown = generateMarkdown(resource);
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);

    fs.writeFileSync(filePath, markdown);
    created++;
    console.log(`Created: ${slug}.md (from ${resource.sourceFile})`);
  }

  console.log('');
  console.log(`Summary:`);
  console.log(`  - Created: ${created} new pages`);
  console.log(`  - Skipped: ${skipped} existing pages`);
  console.log(`  - Total unique resources: ${seenSlugs.size}`);
}

main();
