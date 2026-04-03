const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  console.log('\n=== TASK 18: Desktop full flow ===');
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(1000);
  await page.click('text=Mitose');
  await page.waitForTimeout(1500);

  // Play timeline
  const play = await page.locator('button[aria-label="Reproduzir"]').first().count();
  console.log('Play button present:', play > 0);
  if (play > 0) {
    await page.click('button[aria-label="Reproduzir"]');
    await page.waitForTimeout(3500);
    await page.click('button[aria-label="Pausar"]');
    await page.waitForTimeout(500);

    // Scrub to Anáfase
    await page.click('text=Anáfase');
    await page.waitForTimeout(500);
  }

  await page.screenshot({ path: '.sisyphus/evidence/task-18-desktop-flow.png', fullPage: true });
  console.log('Saved screenshot: task-18-desktop-flow.png');

  console.log('\n=== TASK 18: Mobile flow (PhaseSelector drawer) ===');
  const mobile = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await mobile.goto('http://localhost:3000/mitose');
  await mobile.waitForTimeout(1000);

  // Open FAB
  const fab = await mobile.locator('button[aria-label="Abrir menu de fases"]').count();
  console.log('FAB present:', fab > 0);
  if (fab > 0) {
    await mobile.click('button[aria-label="Abrir menu de fases"]');
    await mobile.waitForTimeout(500);
    // Select Metáfase
    await mobile.click('text=Metáfase');
    await mobile.waitForTimeout(500);
  }
  await mobile.screenshot({ path: '.sisyphus/evidence/task-18-mobile-flow.png', fullPage: true });
  console.log('Saved screenshot: task-18-mobile-flow.png');

  console.log('\n=== TASK 18: Meiose I/II toggle flow ===');
  const meiose = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await meiose.goto('http://localhost:3000/meiose');
  await meiose.waitForTimeout(1000);
  await meiose.click('button:has-text("Meiose II")');
  await meiose.waitForTimeout(500);
  // Play one step
  const play2 = await meiose.locator('button[aria-label="Reproduzir"]').count();
  if (play2 > 0) {
    await meiose.click('button[aria-label="Reproduzir"]');
    await meiose.waitForTimeout(3500);
    await meiose.click('button[aria-label="Pausar"]');
  }
  await meiose.screenshot({ path: '.sisyphus/evidence/task-18-meiose-flow.png', fullPage: true });
  console.log('Saved screenshot: task-18-meiose-flow.png');

  await browser.close();
  console.log('\n=== TASK 18 PLAYWRIGHT SCENARIOS COMPLETE ===');
})();
