import { test, expect } from '../helpers/testWithCoverage.js';

test.describe('Página Eventos Próximos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/eventos-proximos');
  });

  test('deve exibir o título corretamente', async ({ page }) => {
    const titulo = page.getByRole('heading', { name: 'Eventos mais Próximos de Você' });
    await expect(titulo).toBeVisible();
  });

  test('deve possuir um mapa leaflet carregado', async ({ page }) => {
    const mapContainer = page.locator('.leaflet-container');
    await expect(mapContainer).toBeVisible();
  });

  test('deve possuir um botão para voltar', async ({ page }) => {
    // Vamos de / para /eventos-proximos para testar navegação de volta
    await page.goto('/');
    await page.goto('/eventos-proximos');

    const btnVoltar = page.getByLabel('Voltar');
    await expect(btnVoltar).toBeVisible();
    
    await btnVoltar.click();
    await expect(page).toHaveURL('/');
  });
});
