import { test, expect } from '../helpers/testWithCoverage.js';

test.describe('Página Não Autorizada (401)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/unauthorized');
  });

  test('deve exibir o código 401', async ({ page }) => {
    const codigo = page.getByRole('heading', { name: '401' });
    await expect(codigo).toBeVisible();
  });

  test('deve exibir a mensagem de acesso negado', async ({ page }) => {
    const msg = page.getByRole('heading', { name: 'Acesso Negado' });
    await expect(msg).toBeVisible();

    const desc = page.getByText(/Você não tem permissão para acessar esta página/i);
    await expect(desc).toBeVisible();
  });

  test('deve redirecionar para a página de login ao clicar no botão', async ({ page }) => {
    const btnLogin = page.getByRole('link', { name: 'Ir para Login' });
    await expect(btnLogin).toBeVisible();
    
    await btnLogin.click();
    await expect(page).toHaveURL(/\/login/);
  });
});
