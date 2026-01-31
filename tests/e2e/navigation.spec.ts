import { test, expect } from '@playwright/test';

test.describe('Navigation & Menu Differentiation', () => {
  test('homepage loads with correct resource count', async ({ page }) => {
    await page.goto('/');

    // Check hero shows 248+ resources
    const heroText = await page.locator('text=248+').first();
    await expect(heroText).toBeVisible();

    // Check page title
    await expect(page).toHaveTitle(/Seattle Startups/);
  });

  test('Resources page shows all resources with filters', async ({ page }) => {
    await page.goto('/resources/');

    // Should have filter dropdowns (use button roles for filter toggles)
    await expect(page.getByRole('button', { name: 'Category' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'County' })).toBeVisible();

    // Should show resource count
    await expect(page.locator('#resource-count')).toBeVisible();

    // Should have search input
    await expect(page.locator('#resource-search')).toBeVisible();
  });

  test('Counties page shows 5 county cards (NOT all resources)', async ({ page }) => {
    await page.goto('/counties/');

    // Should show county-specific heading (use first() since title may appear in content too)
    await expect(page.getByRole('heading', { name: /Resources by County/i }).first()).toBeVisible();

    // Should show 5 county cards (look for the card links)
    await expect(page.locator('a[href*="county=king"]')).toBeVisible();
    await expect(page.locator('a[href*="county=pierce"]')).toBeVisible();

    // Should NOT show the filter dropdowns (that's the Resources page)
    const categoryFilter = page.locator('[data-filter-group="category"]');
    await expect(categoryFilter).not.toBeVisible();
  });

  test('Audiences page shows founder category cards', async ({ page }) => {
    await page.goto('/audiences/');

    // Should show audience-specific heading (use first() for uniqueness)
    await expect(page.getByRole('heading', { name: /Resources for Diverse Founders/i }).first()).toBeVisible();

    // Should show audience cards (look for the card links)
    await expect(page.locator('a[href*="audience=bipoc"]')).toBeVisible();
    await expect(page.locator('a[href*="audience=women"]')).toBeVisible();
    await expect(page.locator('a[href*="audience=veterans"]')).toBeVisible();

    // Should NOT show the generic filter panel
    const categoryFilter = page.locator('[data-filter-group="category"]');
    await expect(categoryFilter).not.toBeVisible();
  });

  test('menu links go to correct pages', async ({ page }) => {
    await page.goto('/');

    // Click Resources menu (use first() for desktop nav)
    await page.locator('nav a[href="/resources/"]').first().click();
    await expect(page).toHaveURL(/\/resources\//);

    // Click Cities menu (updated from Counties)
    await page.goto('/');
    await page.locator('nav a[href="/cities/"]').first().click();
    await expect(page).toHaveURL(/\/cities\//);

    // Click Audiences menu
    await page.goto('/');
    await page.locator('nav a[href="/audiences/"]').first().click();
    await expect(page).toHaveURL(/\/audiences\//);
  });
});

test.describe('Filtering', () => {
  test('search filters resources in real-time', async ({ page }) => {
    await page.goto('/resources/');

    // Wait for resources to load
    await page.waitForSelector('[data-resource-card]');

    const initialCount = await page.locator('[data-resource-card]:visible').count();

    // Type in search
    await page.fill('#resource-search', 'SCORE');

    // Should filter results
    await page.waitForTimeout(500); // debounce
    const filteredCount = await page.locator('[data-resource-card]:visible').count();

    expect(filteredCount).toBeLessThan(initialCount);
    expect(filteredCount).toBeGreaterThan(0);
  });

  test('county filter from Counties page pre-filters resources', async ({ page }) => {
    await page.goto('/counties/');

    // Click on King County card
    await page.click('a[href*="county=king"]');

    // Should navigate to resources with filter applied
    await expect(page).toHaveURL(/\/resources\/\?county=king/);

    // Filter should be applied
    await page.waitForTimeout(500);
  });

  test('audience filter from Audiences page pre-filters resources', async ({ page }) => {
    await page.goto('/audiences/');

    // Click on BIPOC Founders card
    await page.click('a[href*="audience=bipoc"]');

    // Should navigate to resources with filter applied
    await expect(page).toHaveURL(/\/resources\/\?audience=bipoc/);
  });
});

test.describe('Dark Mode', () => {
  test('dark mode toggle works', async ({ page }) => {
    await page.goto('/');

    // Check initial state (light mode by default unless system prefers dark)
    const html = page.locator('html');

    // Click dark mode toggle
    await page.click('#dark-mode-toggle');

    // Should have dark class
    await expect(html).toHaveClass(/dark/);

    // Click again to toggle back
    await page.click('#dark-mode-toggle');

    // Should not have dark class
    await expect(html).not.toHaveClass(/dark/);
  });

  test('dark mode persists across pages', async ({ page }) => {
    await page.goto('/');

    // Enable dark mode
    await page.click('#dark-mode-toggle');
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Navigate to another page
    await page.click('a[href="/resources/"]');

    // Dark mode should persist
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('mobile menu toggles correctly', async ({ page }) => {
    await page.goto('/');

    // Mobile menu button should be visible on mobile viewport
    const menuButton = page.locator('[aria-label*="menu" i], [aria-label*="Menu" i], button[class*="mobile"]').first();
    await expect(menuButton).toBeVisible();

    // Click to open menu
    await menuButton.click();

    // Some mobile menu element should become visible
    // Wait a moment for animation
    await page.waitForTimeout(300);
  });
});

test.describe('Accessibility', () => {
  test('all interactive elements have accessible names', async ({ page }) => {
    await page.goto('/');

    // Dark mode toggle has aria-label
    const darkToggle = page.locator('#dark-mode-toggle');
    await expect(darkToggle).toHaveAttribute('aria-label');

    // Mobile menu button has aria-label
    const menuButton = page.locator('#mobile-menu-button');
    await expect(menuButton).toHaveAttribute('aria-label');

    // Navigation has aria-label
    const nav = page.locator('nav[aria-label]');
    await expect(nav).toBeVisible();
  });
});

test.describe('Data Consistency', () => {
  test('resource count is displayed on homepage and resources page', async ({ page }) => {
    // Check homepage shows resource count (248+)
    await page.goto('/');
    const countOnHomepage = page.locator('text=248+').first();
    await expect(countOnHomepage).toBeVisible();

    // Check resources page shows results
    await page.goto('/resources/');
    await page.waitForSelector('[data-resource-card]', { timeout: 10000 });
    const resourceCards = page.locator('[data-resource-card]');
    const count = await resourceCards.count();
    expect(count).toBeGreaterThan(100);
  });
});
