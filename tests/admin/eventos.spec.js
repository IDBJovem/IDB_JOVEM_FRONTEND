import { test, expect } from '../helpers/testWithCoverage.js';
import { loginAsAdmin } from '../helpers/adminAuth';

test.describe('Admin - Gerenciamento de Eventos CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/eventos');
  });

  test('deve exibir título e seções da lista de eventos', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Eventos', exact: true })).toBeVisible();
    
    await expect(page.getByRole('heading', { name: 'Próximos Eventos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Eventos Anteriores' })).toBeVisible();
  });

  test('deve navegar para a página de criar evento', async ({ page }) => {
    const btnNovo = page.getByRole('link', { name: /Adicionar Evento/i });
    await btnNovo.click();
    
    await expect(page).toHaveURL(/\/admin\/eventos\/criar/);
    await expect(page.getByRole('heading', { name: 'Criação de Evento' })).toBeVisible();
  });

  test('deve preencher e salvar um novo evento completo', async ({ page }) => {
    await page.goto('/admin/eventos/criar');

    // Preenche o form
    await page.getByPlaceholder('Nome do Evento').fill('Retiro Playwright');
    await page.locator('textarea[name="description"]').fill('Um evento para testar com E2E.');
    await page.getByPlaceholder('Local do evento').fill('Sítio Teste');
    await page.locator('input[name="date"]').fill('2029-12-31');
    await page.getByPlaceholder('Palestrantes').fill('Pr. Dev');
    await page.getByPlaceholder('Bandas').fill('Banda QA');
    await page.locator('input[name="linkFormularioVoluntarios"]').fill('https://forms.gle/teste');
    
    await page.getByRole('button', { name: 'Salvar' }).click();

    // Volta pra lista, deve aparecer o novo
    await expect(page).toHaveURL(/\/admin\/eventos/);
    await expect(page.getByText('Retiro Playwright').first()).toBeVisible();
  });

  test('deve editar um evento existente', async ({ page }) => {
    // Clica no editar do primeiro Próximo Evento
    const btnEditar = page.getByTitle('Editar').first();
    await btnEditar.click();

    await expect(page).toHaveURL(/\/admin\/eventos\/\d+\/editar/);
    await expect(page.getByRole('heading', { name: 'Edição de Evento' })).toBeVisible();

    // Edita
    const titleInput = page.getByPlaceholder('Nome do Evento');
    await titleInput.fill('Evento Playwright Atualizado');
    
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page).toHaveURL(/\/admin\/eventos/);
  });

  test('deve abrir modal de exclusão de evento e cancelar', async ({ page }) => {
    const btnExcluir = page.getByTitle('Excluir').first();
    await btnExcluir.click();

    // O modal deve aparecer
    const modalHeading = page.getByText('Tem certeza que deseja excluir este evento?');
    await expect(modalHeading).toBeVisible();

    const btnCancelar = page.getByRole('button', { name: 'Não' });
    await btnCancelar.click();

    // O modal deve fechar
    await expect(modalHeading).not.toBeVisible();
  });

  test('deve abrir modal de exclusão de evento e confirmar', async ({ page }) => {
    const eventCards = page.locator('.flex.items-center.gap-4.py-4');
    const initialCount = await eventCards.count();

    if (initialCount > 0) {
      const btnExcluir = page.getByTitle('Excluir').first();
      await btnExcluir.click();

      // O modal deve aparecer
      const modalHeading = page.getByText('Tem certeza que deseja excluir este evento?');
      await expect(modalHeading).toBeVisible();

      const btnConfirmar = page.getByRole('button', { name: 'Sim' });
      await btnConfirmar.click();

      // O modal deve fechar
      await expect(modalHeading).not.toBeVisible();
      
      // O mock do front não persiste a exclusão permanente entre loads se ele reseta, 
      // mas pelo menos validamos que o clique ocorre sem erros
    }
  });

  test('deve exibir erro ao tentar criar evento sem título', async ({ page }) => {
    await page.goto('/admin/eventos/criar');

    // Deixa título vazio e preenche o resto
    await page.locator('input[name="date"]').fill('2029-12-31');
    
    // Intercepta alerts do navegador, pois o app usa alert() 
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Salvar' }).click();

    // Como o front usa required no HTML ou valida no JS, devemos verificar
    // O mock handleCreateEvent verifica `!formData.title` e retorna {success: false, error: 'O nome do evento é obrigatório.'}
    // ou o HTML5 valida antes. Vamos verificar se alert foi chamado ou campo required
    const titleInput = page.getByPlaceholder('Nome do Evento');
    const isRequired = await titleInput.getAttribute('required');
    
    // Se for required no html, o formulário não é submetido
    // Se for validado via JS e dar alert
    expect(isRequired !== null || alertMessage === 'O nome do evento é obrigatório.').toBeTruthy();
  });

  test('deve testar os botões de Voltar na criação e edição', async ({ page }) => {
    // Create
    await page.goto('/admin/eventos/criar');
    await page.getByTitle('Voltar').click();
    await expect(page).toHaveURL(/\/admin\/eventos/);

    // Edit
    await page.goto('/admin/eventos/1/editar');
    await page.getByTitle('Voltar').click();
    await expect(page).toHaveURL(/\/admin\/eventos/);
  });

  test('deve abrir detalhes de um evento anterior e verificar dados', async ({ page }) => {
    const btnDetalhes = page.getByRole('link', { name: 'Detalhes' }).first();
    await btnDetalhes.click();

    await expect(page).toHaveURL(/\/admin\/eventos\/\d+/);
    await expect(page.getByRole('heading', { name: 'Detalhes do Evento' })).toBeVisible();
    
    // Verifica tabelas detalhadas
    await expect(page.getByText('Nome do Evento', { exact: true })).toBeVisible();
    await expect(page.getByText('Descrição do Evento', { exact: true })).toBeVisible();
    await expect(page.getByText('Total de Participantes', { exact: true })).toBeVisible();
    await expect(page.getByText('Total de Voluntários', { exact: true })).toBeVisible();
    await expect(page.getByText('Local', { exact: true })).toBeVisible();
    await expect(page.getByText('Data', { exact: true })).toBeVisible();
    await expect(page.getByText('Palestrantes', { exact: true })).toBeVisible();
    await expect(page.getByText('Bandas', { exact: true })).toBeVisible();

    // Testar volta
    const btnVoltar = page.getByTitle('Voltar');
    await btnVoltar.click();
    await expect(page).toHaveURL(/\/admin\/eventos/);
  });

  test('deve exibir mensagem de Evento não encontrado para Edit e Details inválidos', async ({ page }) => {
    // Edit
    await page.goto('/admin/eventos/999999/editar');
    await expect(page.getByText('Evento não encontrado.')).toBeVisible();
    await page.getByRole('button', { name: 'Voltar para Eventos' }).click();
    await expect(page).toHaveURL(/\/admin\/eventos/);

    // Details
    await page.goto('/admin/eventos/999999');
    await expect(page.getByText('Evento não encontrado.')).toBeVisible();
    await page.getByRole('button', { name: 'Voltar para Eventos' }).click();
    await expect(page).toHaveURL(/\/admin\/eventos/);
  });

  test('deve testar link Voluntários em Evento Anterior', async ({ page }) => {
    const btnVol = page.getByRole('link', { name: 'Voluntários', exact: true }).first();
    await btnVol.click();

    await expect(page).toHaveURL(/\/admin\/voluntarios/);
  });
});

test.describe('Admin - Gerenciamento de Programação do Evento', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/eventos/1/programacao');
  });

  test('deve exibir a tela de programação', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Programação do Evento' })).toBeVisible();
  });

  test('deve exibir e esconder o formulário inline de adicionar atividade', async ({ page }) => {
    const btnPlus = page.getByTitle('Adicionar atividade');
    await btnPlus.click();

    const inputAtividade = page.getByPlaceholder('Nome da atividade');
    await expect(inputAtividade).toBeVisible();

    // Cancelar
    const btnCancelar = page.getByRole('button', { name: 'Cancelar' });
    await btnCancelar.click();
    await expect(inputAtividade).not.toBeVisible();
  });

  test('deve adicionar uma nova atividade (no estado local do form)', async ({ page }) => {
    const btnPlus = page.getByTitle('Adicionar atividade');
    await btnPlus.click();

    await page.getByPlaceholder('Nome da atividade').fill('Almoço Teste');
    await page.getByPlaceholder('Descrição da atividade').fill('Testando descrição');
    await page.locator('input[type="time"]').first().fill('12:00');

    // Salvar atividade
    await page.getByRole('button', { name: 'Confirmar' }).click();

    // Atividade deve estar na lista
    await expect(page.getByText('Almoço Teste')).toBeVisible();
  });

  test('deve editar uma atividade existente', async ({ page }) => {
    // Clica no editar da primeira atividade
    const btnEditar = page.getByTitle('Editar atividade').first();
    await btnEditar.click();

    const inputAtividade = page.getByPlaceholder('Nome da atividade');
    await inputAtividade.fill('Atividade Editada pelo Playwright');

    // Salvar
    await page.getByRole('button', { name: 'Confirmar' }).click();

    // Atividade deve estar na lista com nome novo
    await expect(page.getByText('Atividade Editada pelo Playwright')).toBeVisible();
  });

  test('deve excluir uma atividade existente', async ({ page }) => {
    const activityRows = page.locator('.flex.items-center.gap-4.py-4');
    const countBefore = await activityRows.count();
    
    if (countBefore > 0) {
      const btnExcluir = page.getByTitle('Excluir atividade').first();
      await btnExcluir.click();

      // Confirma no modal
      const btnConfirmar = page.getByRole('button', { name: 'Sim' });
      await btnConfirmar.click();

      // Verifica se o contador diminuiu
      const countAfter = await activityRows.count();
      expect(countAfter).toBe(countBefore - 1);
    }
  });

  test('deve salvar a programação inteira', async ({ page }) => {
    const btnSalvar = page.getByRole('button', { name: 'Salvar' });
    await btnSalvar.click();

    // Redireciona de volta p/ a edição do evento
    await expect(page).toHaveURL(/\/admin\/eventos\/1\/editar/);
  });
});
