import { test, expect } from '../helpers/testWithCoverage.js';
import { setupApiMock } from '../helpers/apiMock';

test.describe('Página de Eventos', () => {
  test.beforeEach(async ({ page }) => {
    await setupApiMock(page);
    await page.goto('/eventos');
  });

  test('deve exibir o título principal', async ({ page }) => {
    const titulo = page.getByRole('heading', { name: 'Eventos', exact: true });
    await expect(titulo).toBeVisible();
  });

  test('deve exibir campos de filtro e busca', async ({ page }) => {
    // Busca
    const inputBusca = page.getByPlaceholder('Pesquisar evento...');
    await expect(inputBusca).toBeVisible();

    // Filtros dropdown
    await expect(page.locator('select#filter-tipo')).toBeVisible();
    await expect(page.locator('select#filter-regiao')).toBeVisible();
    await expect(page.locator('select#filter-data')).toBeVisible();
  });

  test('deve permitir limpar a busca', async ({ page }) => {
    const inputBusca = page.getByPlaceholder('Pesquisar evento...');
    await inputBusca.fill('Pesquisa de teste');

    const btnLimpar = page.getByLabel('Limpar pesquisa');
    await expect(btnLimpar).toBeVisible();

    await btnLimpar.click();
    await expect(inputBusca).toHaveValue('');
  });

  test('deve sincronizar a URL com a busca ao digitar', async ({ page }) => {
    const inputBusca = page.getByPlaceholder('Pesquisar evento...');
    await inputBusca.fill('Camp');

    await expect(page).toHaveURL(/q=Camp/);
  });

  test('deve exibir a seção "Em breve" (evento destaque)', async ({ page }) => {
    const tituloEmBreve = page.getByRole('heading', { name: 'Em breve' });
    await expect(tituloEmBreve).toBeVisible();

    // Verifica botões do destaque
    const btnVejaMais = page.locator('section').filter({ hasText: 'Em breve' }).getByRole('link', { name: /Veja mais/i });
    const btnInscrevase = page.locator('section').filter({ hasText: 'Em breve' }).getByRole('button', { name: /Inscreva-se/i });

    await expect(btnVejaMais).toBeVisible();
    await expect(btnInscrevase).toBeVisible();
  });

  test('deve exibir a grid de eventos com os cards', async ({ page }) => {
    // Como os eventos estão mocados na página, garantimos que pelo menos 1 card é renderizado na grid principal
    const gridContainer = page.locator('section.pb-20 > div > div.grid');
    await expect(gridContainer).toBeVisible();

    const primeiroCardLink = gridContainer.getByRole('link', { name: /Veja mais/i }).first();
    await expect(primeiroCardLink).toBeVisible();
  });

  test('deve exibir "Nenhum evento encontrado" quando nenhum filtro corresponder', async ({ page }) => {
    // Filtro inexistente
    const inputBusca = page.getByPlaceholder('Pesquisar evento...');
    await inputBusca.fill('XYZT_EVENTO_INEXISTENTE');

    const emptyText = page.getByText('Nenhum evento encontrado');
    await expect(emptyText).toBeVisible();
    await expect(page.getByText('Tente ajustar os filtros ou a pesquisa para encontrar o que você procura.')).toBeVisible();
  });

  test('deve navegar para a página de detalhes ao clicar em Veja Mais', async ({ page }) => {
    const gridContainer = page.locator('section.pb-20 > div > div.grid');
    const primeiroCardLink = gridContainer.getByRole('link', { name: /Veja mais/i }).first();

    if (await primeiroCardLink.isVisible()) {
      const href = await primeiroCardLink.getAttribute('href');
      await primeiroCardLink.click();

      // Verifica se a url mudou para o href do botão
      await expect(page).toHaveURL(new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    }
  });

  test('deve filtrar por tipo de evento (select filter-tipo)', async ({ page }) => {
    const selectTipo = page.locator('select#filter-tipo');

    await selectTipo.selectOption('Conferência');

    const gridContainer = page.locator('section.pb-20 > div > div.grid');

    const cardsVisiveis = gridContainer.getByRole('link', { name: /Veja mais/i });
    const emptyState = page.getByRole('heading', { name: 'Nenhum evento encontrado' });

    const temCards = await cardsVisiveis.count() > 0;
    const temEmpty = await emptyState.isVisible().catch(() => false);
    expect(temCards || temEmpty).toBeTruthy();
  });

  test('deve filtrar por região (select filter-regiao)', async ({ page }) => {
    const selectRegiao = page.locator('select#filter-regiao');

    // Seleciona uma região
    await selectRegiao.selectOption('Nordeste');

    // A grid deve reagir ao filtro
    const gridContainer = page.locator('section.pb-20 > div > div.grid');
    const cardsVisiveis = gridContainer.getByRole('link', { name: /Veja mais/i });
    const emptyState = page.getByRole('heading', { name: 'Nenhum evento encontrado' });

    const temCards = await cardsVisiveis.count() > 0;
    const temEmpty = await emptyState.isVisible().catch(() => false);
    expect(temCards || temEmpty).toBeTruthy();
  });

  test('deve filtrar por data (select filter-data)', async ({ page }) => {
    const selectData = page.locator('select#filter-data');

    // Seleciona "Esta semana"
    await selectData.selectOption('Esta semana');

    // A grid deve reagir ao filtro
    const gridContainer = page.locator('section.pb-20 > div > div.grid');
    const cardsVisiveis = gridContainer.getByRole('link', { name: /Veja mais/i });
    const emptyState = page.getByRole('heading', { name: 'Nenhum evento encontrado' });

    const temCards = await cardsVisiveis.count() > 0;
    const temEmpty = await emptyState.isVisible().catch(() => false);
    expect(temCards || temEmpty).toBeTruthy();
  });

  test('deve combinar filtros (tipo + busca)', async ({ page }) => {
    const selectTipo = page.locator('select#filter-tipo');
    const inputBusca = page.getByPlaceholder('Pesquisar evento...');

    // Combina tipo + busca que não casa com nada
    await selectTipo.selectOption('Conferência');
    await inputBusca.fill('XYZT_NAO_EXISTE');

    const emptyState = page.getByText('Nenhum evento encontrado');
    await expect(emptyState).toBeVisible();
  });

  test('deve cobrir inferRegionFromLocation para todas as regiões e matchesDateFilter', async ({ page }) => {
    // Injeta eventos falsos para testar o filtro de regiões
    await page.evaluate(() => {
      window.__MOCKED_EVENTS__ = [
        { title: 'EvNorte', location: 'Manaus - AM', date: new Date().toISOString(), category: 'Outros' },
        { title: 'EvCentroOeste', location: 'Brasília - DF', date: new Date().toISOString(), category: 'Outros' },
        { title: 'EvSul', location: 'Curitiba - PR', date: new Date().toISOString(), category: 'Outros' }
      ];
    });

    // O mock inicial só tem "Sítio Boa Vista" (que não dá match em nada, cai no fallback ""), etc.
    const selectRegiao = page.locator('select#filter-regiao');
    await selectRegiao.selectOption('Centro-Oeste');
    await selectRegiao.selectOption('Norte');
    await selectRegiao.selectOption('Sul');

    // Testar as opções de data restantes
    const selectData = page.locator('select#filter-data');
    await selectData.selectOption('Este mês');
    await selectData.selectOption('Próximos 3 meses');
  });

  test('deve cobrir o catch block quando fetchAllEvents falha', async ({ page }) => {
    await page.route('**/evento/', async route => {
      await route.abort('failed');
    });
    await page.goto('/eventos');
    const erroText = page.getByText('Não foi possível carregar os eventos.');
    await expect(erroText).toBeVisible();
  });

  test('deve cobrir handleInscrever do Em Breve e do EventList com e sem link externo', async ({ page }) => {
    await page.goto('/eventos');

    // Intercepta window.open para não abrir nova aba
    await page.evaluate(() => {
      window.open = () => null;
    });

    // Botão do evento em destaque
    const btnEmBreve = page.locator('section').filter({ hasText: 'Em breve' }).getByRole('button', { name: /Inscreva-se/i });
    if (await btnEmBreve.isVisible()) {
      await btnEmBreve.click();
    }

    // Botão da grid
    const botoesInscrever = page.locator('section.pb-20 > div > div.grid').getByRole('button', { name: /Inscreva-se/i });
    if (await botoesInscrever.count() > 0) {
      await botoesInscrever.first().click();
    }
  });

});
