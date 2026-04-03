import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const evidenceDir = path.join(process.cwd(), '.sisyphus', 'evidence');

test.beforeAll(() => {
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }
});

test.describe('Task 18 - Accessibility and Loader', () => {
  
  test.describe('Desktop Flow', () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test('Timeline keyboard navigation and selection', async ({ page }) => {
      await page.goto('/mitose');

      await expect(page.getByRole('alert', { name: /carregando/i }).or(page.locator('text=Carregando cena...'))).toBeHidden({ timeout: 15000 });

      const timeline = page.getByRole('listbox', { name: 'Linha do tempo das fases' });
      await expect(timeline).toBeVisible();

      const firstOption = page.locator('role=option').first();
      await firstOption.focus();
      await expect(firstOption).toBeFocused();

      await page.keyboard.press('ArrowRight');
      const secondOption = page.locator('role=option').nth(1);
      await expect(secondOption).toBeFocused();

      await page.keyboard.press('Enter');
      await expect(secondOption).toHaveAttribute('aria-selected', 'true');

      await page.screenshot({ path: path.join(evidenceDir, 'task-18-desktop-timeline.png') });
    });
  });

  test.describe('Mobile Flow', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('PhaseSelector drawer focus trap and ESC behavior', async ({ page }) => {
      await page.goto('/mitose');

      await expect(page.getByRole('alert', { name: /carregando/i }).or(page.locator('text=Carregando cena...'))).toBeHidden({ timeout: 15000 });

      const fabButton = page.getByRole('button', { name: 'Abrir menu de fases' });
      await expect(fabButton).toBeVisible();

      await fabButton.click();
      
      const drawer = page.getByRole('dialog', { name: 'Menu de fases' });
      await expect(drawer).toBeVisible();

      await page.waitForTimeout(200);
      
      const closeButton = page.getByRole('button', { name: 'Fechar menu de fases' });
      await expect(closeButton).toBeFocused();

      await page.screenshot({ path: path.join(evidenceDir, 'task-18-mobile-drawer-open.png') });

      await page.keyboard.press('Escape');
      await expect(drawer).toBeHidden();

      await expect(fabButton).toBeFocused();

      await page.screenshot({ path: path.join(evidenceDir, 'task-18-mobile-drawer.png') });
    });
  });

  test.describe('Loader Flow', () => {
    test('SceneLoader shows initially and then hides', async ({ page }) => {
      await page.goto('/mitose');

      const loader = page.locator('text=Carregando cena...').first();
      await expect(loader).toBeVisible();

      await page.screenshot({ path: path.join(evidenceDir, 'task-18-loader.png') });

      await expect(loader).toBeHidden({ timeout: 15000 });
    });
  });
});