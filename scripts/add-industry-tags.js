#!/usr/bin/env node

/**
 * Add industry tags to YAML resources based on name/description keywords
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DATA_DIR = path.join(__dirname, '../data/resources');

// Industry keyword mappings
const industryKeywords = {
  tech: ['tech', 'software', 'saas', 'cloud', 'digital', 'app', 'platform', 'coding', 'code', 'developer'],
  ai: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'data science', 'neural'],
  cleantech: ['cleantech', 'clean tech', 'sustainability', 'green', 'environmental', 'climate', 'energy', 'solar', 'renewable'],
  lifesciences: ['life science', 'biotech', 'bio', 'medical', 'healthcare', 'health', 'pharma', 'drug'],
  maritime: ['maritime', 'marine', 'ocean', 'blue economy', 'shipping', 'port', 'boat', 'vessel'],
  aerospace: ['aerospace', 'aviation', 'defense', 'space', 'military', 'drone'],
  food: ['food', 'culinary', 'kitchen', 'restaurant', 'agriculture', 'farm', 'ag tech'],
  creative: ['creative', 'media', 'design', 'art', 'film', 'music', 'entertainment', 'content'],
  hardware: ['hardware', 'manufacturing', 'maker', 'prototype', 'physical product', '3d print', 'cnc'],
  fintech: ['fintech', 'financial', 'banking', 'payment', 'insurance', 'trading']
};

function detectIndustries(resource) {
  const text = `${resource.name} ${resource.description || ''} ${resource.organization || ''}`.toLowerCase();
  const industries = [];

  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      industries.push(industry);
    }
  }

  // Default to 'general' if no specific industry detected
  if (industries.length === 0) {
    industries.push('general');
  }

  return industries;
}

function processYamlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(content);

  if (!data || !data.resources) return;

  let modified = false;
  for (const resource of data.resources) {
    if (!resource.industries || resource.industries.length === 0) {
      resource.industries = detectIndustries(resource);
      modified = true;
    }
  }

  if (modified) {
    const newContent = yaml.dump(data, {
      lineWidth: -1,
      quotingType: '"',
      forceQuotes: true
    });
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated: ${path.basename(filePath)}`);
  }
}

// Process all YAML files
const yamlFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.yaml'));
yamlFiles.forEach(file => {
  processYamlFile(path.join(DATA_DIR, file));
});

console.log('Done adding industry tags!');
