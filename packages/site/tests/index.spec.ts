import { test, expect } from '@playwright/test'

test('toResolve', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('IDLE')).toBeVisible()

  await page.getByRole('button', { name: 'toResolve' }).click()

  await expect(page.getByText('PENDING')).toBeVisible()
  await expect(page.getByText('FULFILLED')).toBeVisible()
  await expect(page.getByText('IDLE')).toBeVisible()
})

test('toThrow', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByText('IDLE')).toBeVisible()

  await page.getByRole('button', { name: 'toThrow' }).click()

  await expect(page.getByText('PENDING')).toBeVisible()
  await expect(page.getByText('REJECTED')).toBeVisible()
  await expect(page.getByText('IDLE')).toBeVisible()
})
