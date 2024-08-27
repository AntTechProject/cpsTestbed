import { test, expect } from '@playwright/test';

test.describe('Simulation Page', () => {
  test('should display simulation results after clicking RUN SIMULATIONS button', async ({ page }) => {
    // Step 1: Navigate to the page
    await page.goto('http://localhost:5173'); // Adjust this URL based on your local development server

    // Step 2: Check initial state
    const runButton = page.locator('#submit-btn');
    await expect(runButton).toBeVisible();

    const outputText = page.locator('text=Please run the simulation first');
    await expect(outputText).toBeVisible();

    // Step 3: Click the RUN SIMULATIONS button
    await runButton.click();
    console.log("RUN SIMULATIONS button clicked"); // Debugging log

    // Step 4: Check the debug output for state changes
    const debugReadyText = page.locator('text=Debug - ready: true');
    await debugReadyText.waitFor({ timeout: 15000 }); // Increase the timeout if necessary

    // Step 5: Verify the text appears after simulation completes
    const powerflowText = page.locator('text=Powerflow simulation results...');
    await expect(powerflowText).toBeVisible();

    const dynsimText = page.locator('text=Dynamic simulation results...');
    await expect(dynsimText).toBeVisible();
  });
});