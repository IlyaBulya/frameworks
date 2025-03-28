import { test, expect } from '@playwright/test';

// Test both Vue and React implementations
const apps = [
  { name: 'Vue', url: 'http://localhost:5173', title: 'Vue Todo App' },
  {
    name: 'React',
    url: 'http://localhost:5174',
    title: 'React Todo Application',
  },
];

for (const app of apps) {
  test.describe(`Todo App - ${app.name}`, () => {
    test('should load the application', async ({ page }) => {
      await page.goto(app.url);

      // Check that the title is displayed
      await expect(page.locator('h1')).toHaveText(app.title);

      // Check that the input and add button are present
      await expect(page.getByTestId('new-todo-input')).toBeVisible();
      await expect(page.getByTestId('add-todo-button')).toBeVisible();
    });

    test('should add a new todo', async ({ page }) => {
      await page.goto(app.url);

      // Verify that initially there are no todos
      await expect(page.getByTestId('empty-message')).toBeVisible();

      // Add a new todo
      await page.getByTestId('new-todo-input').fill(`New ${app.name} Todo`);
      await page.getByTestId('add-todo-button').click();

      // Verify the new todo was added
      await expect(page.getByTestId('todo-item')).toHaveCount(1);
      await expect(page.getByTestId('todo-item').first()).toContainText(
        `New ${app.name} Todo`
      );

      // Verify the input was cleared
      await expect(page.getByTestId('new-todo-input')).toHaveValue('');
    });

    test('should toggle todo completion status', async ({ page }) => {
      await page.goto(app.url);

      // Add a new todo since we start with empty list
      await page.getByTestId('new-todo-input').fill(`Toggle Test ${app.name}`);
      await page.getByTestId('add-todo-button').click();

      // Get the todo item and its checkbox
      const todo = page.getByTestId('todo-item').first();
      const checkbox = todo.getByTestId('todo-checkbox');

      // Check initial state (not completed)
      await expect(todo).not.toHaveClass(/completed/);

      // Toggle completion
      await checkbox.click();

      // Verify it's now completed
      await expect(todo).toHaveClass(/completed/);

      // Toggle back
      await checkbox.click();

      // Verify it's not completed again
      await expect(todo).not.toHaveClass(/completed/);
    });

    test('should delete a todo', async ({ page }) => {
      await page.goto(app.url);

      // Add a new todo since we start with empty list
      await page.getByTestId('new-todo-input').fill(`Delete Test ${app.name}`);
      await page.getByTestId('add-todo-button').click();

      // Verify we have one todo
      await expect(page.getByTestId('todo-item')).toHaveCount(1);

      // Delete the todo
      await page.getByTestId('delete-todo-button').click();

      // Verify the todo was deleted and we see the empty message
      await expect(page.getByTestId('empty-message')).toBeVisible();
    });

    test('should fetch todos when refresh button is clicked', async ({
      page,
    }) => {
      await page.goto(app.url);

      // Initially we should see the empty message
      await expect(page.getByTestId('empty-message')).toBeVisible();

      // Click refresh button
      await page.getByTestId('fetch-todos-button').click();

      // Verify loading indicator appears
      await expect(page.getByTestId('loading-indicator')).toBeVisible();

      // Verify loading indicator disappears
      await page
        .getByTestId('loading-indicator')
        .waitFor({ state: 'hidden', timeout: 5000 });

      // Verify todos are displayed (should be at least one from the API)
      await expect(page.getByTestId('todo-item').first()).toBeVisible();
      const count = await page.getByTestId('todo-item').count();
      expect(count).toBeGreaterThan(0);
    });
  });
}
