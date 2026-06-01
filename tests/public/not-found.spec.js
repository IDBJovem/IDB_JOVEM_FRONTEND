import { test, expect } from '../helpers/testWithCoverage.js';

test.describe('Página Não Encontrada (404)', () => {
  test.beforeEach(async ({ page }) => {
    // Entrar em uma rota inexistente
    await page.goto('/rota-que-nao-existe-12345');
  });

  test('deve exibir o código 404', async ({ page }) => {
    const codigo = page.getByRole('heading', { name: '404' });
    await expect(codigo).toBeVisible();
  });

  test('deve exibir a mensagem de página não encontrada', async ({ page }) => {
    const msg = page.getByRole('heading', { name: 'Página não encontrada' });
    await expect(msg).toBeVisible();

    const desc = page.getByText(/Desculpe, a página que você está procurando não existe/i);
    await expect(desc).toBeVisible();
  });

  test('deve redirecionar para a home ao clicar no botão de voltar', async ({ page }) => {
    const btnVoltar = page.getByRole('link', { name: 'Voltar para o Início' });
    await expect(btnVoltar).toBeVisible();
    
    await btnVoltar.click();
    await expect(page).toHaveURL('/');
  });
});
