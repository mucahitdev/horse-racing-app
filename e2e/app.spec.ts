import { test, expect } from '@playwright/test'

test.describe('Horse Racing App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display initial empty state', async ({ page }) => {
    // Check navbar
    await expect(page.getByText(/horse racing/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /generate program/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /start/i })).toBeDisabled()

    // Check empty states - English text (use first occurrence)
    await expect(page.getByText(/program not generated/i).first()).toBeVisible()
  })

  test('should generate program when clicking Generate Program button', async ({ page }) => {
    // Click Generate Program
    await page.getByRole('button', { name: /generate program/i }).click()

    // Wait for horses to be generated
    await expect(page.getByText(/horses \(20\)/i)).toBeVisible({ timeout: 5000 })

    // Check that 20 horses are displayed - only in Horses section
    const horsesCard = page.getByRole('heading', { name: /^horses/i }).locator('..').locator('..')
    const horseRows = horsesCard.locator('table tbody tr')
    await expect(horseRows).toHaveCount(20)

    // Check that program section is populated
    await expect(page.getByText(/round 1 - 1200m/i)).toBeVisible()
    await expect(page.getByText(/round 6 - 2200m/i)).toBeVisible()

    // Check that Start button is now enabled
    await expect(page.getByRole('button', { name: /start/i })).toBeEnabled()
  })

  test('should start race when clicking Start button', async ({ page }) => {
    // Generate program first
    await page.getByRole('button', { name: /generate program/i }).click()
    await expect(page.getByText(/horses \(20\)/i)).toBeVisible({ timeout: 5000 })

    // Click Start
    await page.getByRole('button', { name: /start/i }).click()

    // Check that button changes to Pause
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible({ timeout: 2000 })

    // Check that race track shows round information - look for race track title
    // Race track card title might be "Race Track" or "Round 1 - 1200m"
    await expect(page.getByText(/round 1 - 1200m/i).first()).toBeVisible({ timeout: 2000 })
  })

  test('should pause and resume race', async ({ page }) => {
    // Generate and start race
    await page.getByRole('button', { name: /generate program/i }).click()
    await expect(page.getByText(/horses \(20\)/i)).toBeVisible({ timeout: 5000 })
    await page.getByRole('button', { name: /start/i }).click()

    // Wait a bit for race to start
    await page.waitForTimeout(500)

    // Pause
    await page.getByRole('button', { name: /pause/i }).click()
    await expect(page.getByRole('button', { name: /resume/i })).toBeVisible()

    // Resume
    await page.getByRole('button', { name: /resume/i }).click()
    await expect(page.getByRole('button', { name: /pause/i })).toBeVisible()
  })

  test('should complete a race round and show results', async ({ page }) => {
    // Generate and start race
    await page.getByRole('button', { name: /generate program/i }).click()
    await expect(page.getByText(/horses \(20\)/i)).toBeVisible({ timeout: 5000 })
    await page.getByRole('button', { name: /start/i }).click()

    // Wait for first round to complete (this may take 4-8 seconds)
    // Look for results in the Results section specifically
    const resultsCard = page.getByRole('heading', { name: /^results$/i }).locator('..').locator('..')
    
    // Wait for results to appear (round 1 should appear in results)
    await expect(resultsCard.getByText(/round 1 - 1200m/i)).toBeVisible({ timeout: 20000 })
    
    // Verify results table has horses
    const resultsTable = resultsCard.locator('table tbody tr')
    await expect(resultsTable.first()).toBeVisible({ timeout: 5000 })
  })

  test('should display horse list with correct structure', async ({ page }) => {
    // Generate program
    await page.getByRole('button', { name: /generate program/i }).click()
    await expect(page.getByText(/horses \(20\)/i)).toBeVisible({ timeout: 5000 })

    // Get the Horses card specifically
    const horsesCard = page.getByRole('heading', { name: /^horses/i }).locator('..').locator('..')

    // Check table headers in Horses section only
    await expect(horsesCard.getByRole('columnheader', { name: /^name$/i })).toBeVisible()
    await expect(horsesCard.getByRole('columnheader', { name: /^condition$/i })).toBeVisible()
    await expect(horsesCard.getByRole('columnheader', { name: /^color$/i })).toBeVisible()

    // Check that horses have all required fields
    const firstRow = horsesCard.locator('table tbody tr').first()
    await expect(firstRow.locator('td').nth(0)).not.toBeEmpty() // Name
    await expect(firstRow.locator('td').nth(1)).not.toBeEmpty() // Condition
    // Color is a div, check that it exists
    await expect(firstRow.locator('td').nth(2).locator('div')).toBeVisible() // Color div
  })

  test('should show race schedule with 6 rounds', async ({ page }) => {
    // Generate program
    await page.getByRole('button', { name: /generate program/i }).click()
    await expect(page.getByText(/horses \(20\)/i)).toBeVisible({ timeout: 5000 })

    // Get Program card specifically
    const programCard = page.getByRole('heading', { name: /^program$/i }).locator('..').locator('..')

    // Check that all 6 rounds are visible in program section
    for (let i = 1; i <= 6; i++) {
      await expect(programCard.getByText(new RegExp(`round ${i}`, 'i'))).toBeVisible()
    }
  })
})
