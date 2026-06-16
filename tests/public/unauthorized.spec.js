import { test, expect } from '../helpers/testWithCoverage.js';
import { loginAsAdmin } from '../helpers/adminAuth.js';
import { setupApiMock } from '../helpers/apiMock.js';

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

  test('deve deslogar e redirecionar para /login se a API retornar 401 dentro de /admin', async ({ page }) => {
    await setupApiMock(page);
    // Injeta o token fake de admin
    await loginAsAdmin(page);

    // Intercepta apenas chamadas de API para retornar 401
    await page.route(/\/evento\/?/, async (route, request) => {
      if (request.resourceType() === 'fetch' || request.resourceType() === 'xhr') {
        return route.fulfill({ status: 401, body: 'Unauthorized' });
      }
      return route.fallback();
    });

    // Tenta acessar uma página admin (que fará fetch na montagem)
    await page.goto('/admin/eventos');

    // Aguarda que a URL vire /login (o interceptor de erro do axios vai acionar window.location.href = '/login')
    await page.waitForURL('**/login', { timeout: 10000 }).catch(() => {});
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page).toHaveURL(/\/login/);
  });
});
