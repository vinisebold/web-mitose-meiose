const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();

  // Mobile flow: find first visible FAB and click
  const mobile = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await mobile.goto('http://localhost:3000/mitose');
  await mobile.waitForTimeout(1500);

  const fabHandles = await mobile.$$('[aria-label="Abrir menu de fases"]');
  let clicked = false;
  for (const h of fabHandles) {
    const box = await h.boundingBox();
    const visible = await h.isVisible();
    if (visible && box) {
      await h.click();
      clicked = true;
      break;
    }
  }
  console.log('Clicked visible FAB:', clicked);
  await mobile.waitForTimeout(500);
  // If drawer opened, try clicking Metáfase
  try {
    await mobile.click('text=Metáfase', { timeout: 2000 });
    console.log('Clicked Metáfase');
  } catch (e) {
    console.log('Could not click Metáfase directly, trying selector fallback');
    const el = await mobile.$('button:has-text("Metáfase")');
    if (el) {
      await el.click();
      console.log('Clicked Metáfase via fallback');
    }
  }

  await mobile.screenshot({ path: '.sisyphus/evidence/task-18-mobile-flow-fixed.png', fullPage: true });
  console.log('Saved mobile screenshot');
  await mobile.close();

  // Ensure meiose screenshot exists (re-run Meiose flow)
  const meiose = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await meiose.goto('http://localhost:3000/meiose');
  await meiose.waitForTimeout(1500);
  await meiose.click('button:has-text("Meiose II")');
  await meiose.waitForTimeout(500);
  const play2 = await meiose.locator('button[aria-label="Reproduzir"]').count();
  if (play2 > 0) {
    await meiose.click('button[aria-label="Reproduzir"]');
    await meiose.waitForTimeout(3500);
    await meiose.click('button[aria-label="Pausar"]');
  }
  await meiose.screenshot({ path: '.sisyphus/evidence/task-18-meiose-flow-fixed.png', fullPage: true });
  console.log('Saved meiose screenshot');

  await browser.close();
  console.log('Verification scripts complete');
})();
