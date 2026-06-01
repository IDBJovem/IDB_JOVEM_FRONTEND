import { test, expect } from '../helpers/testWithCoverage.js';

test.describe('Fluxos de Navegação Pública (Cross-page)', () => {
  test('Fluxo Home -> Eventos -> Detalhes -> Voltar -> Home', async ({ page }) => {
    // 1. Inicia na Home
    await page.goto('/');
    await expect(page).toHaveURL('/');

    // 2. Clica no link "Ver evento" ou link de "Eventos" no Header
    const nav = page.locator('nav').first();
    await nav.getByText('Eventos', { exact: true }).click();
    await expect(page).toHaveURL(/\/eventos/);

    // 3. Na página de Eventos, clica no primeiro "Veja mais"
    const gridContainer = page.locator('section.pb-20 > div > div.grid');
    const primeiroCardLink = gridContainer.getByRole('link', { name: /Veja mais/i }).first();

    if (await primeiroCardLink.isVisible().catch(() => false)) {
      await primeiroCardLink.click();

      // 4. Deve estar na página de Detalhes do Evento
      await expect(page).toHaveURL(/\/eventos\/[\w-]+/);
      const btnVoltar = page.getByLabel('Voltar');
      await expect(btnVoltar).toBeVisible();

      // 5. Clica em Voltar
      await btnVoltar.click();
      await expect(page).toHaveURL(/\/eventos$/);
    }

    // 6. Volta para Home clicando na Logo
    await page.getByRole('link', { name: 'IDB Jovem & Teens' }).click();
    await expect(page).toHaveURL('/');
  });

  test('Fluxo Home -> Galeria -> Voltar', async ({ page }) => {
    // 1. Inicia na Home
    await page.goto('/');

    // 2. Vai para a Galeria através do link "Ver mais +" na seção de galeria
    const galeriaSection = page.locator('section').filter({ hasText: 'Galeria de fotos' });
    const btnVerMais = galeriaSection.getByRole('link', { name: /Ver mais \+/i });

    await btnVerMais.click();
    await expect(page).toHaveURL(/\/galeria/);

    // 3. Na página de Galeria, testa o botão de voltar
    const btnVoltar = page.getByLabel('Voltar');
    await btnVoltar.click();

    // 4. Deve retornar para a home
    await expect(page).toHaveURL('/');
  });

  test('Fluxo Home -> Eventos Próximos -> Voltar', async ({ page }) => {
    // 1. Inicia na Home
    await page.goto('/');

    // 2. Vai para Eventos Próximos através do Header Desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    const btnProxEventos = page.getByRole('button', { name: /Eventos próximos/i });

    await btnProxEventos.click();
    await expect(page).toHaveURL(/\/eventos-proximos/);

    // 3. Na página de Eventos Próximos, testa o botão de voltar
    const btnVoltar = page.getByLabel('Voltar');
    await btnVoltar.click();

    // 4. Deve retornar para a home
    await expect(page).toHaveURL('/');
  });

  test('Acessar rota admin sem auth e fazer login', async ({ page }) => {
    // 1. Tentar acessar admin
    await page.goto('/admin/eventos');

    // 2. Deve ser redirecionado para /login
    await expect(page).toHaveURL(/\/login/);

    // 3. Preencher login válido
    await page.getByPlaceholder('Digite seu usuário').fill('idbjovem');
    await page.getByPlaceholder('Digite sua senha').fill('idbjovem');
    await page.getByRole('button', { name: 'Login' }).click();

    // 4. Redirecionamento após login deve levar para dashboard, pois a rota original não é lembrada neste front
    await expect(page).toHaveURL(/\/admin/);
  });
});
