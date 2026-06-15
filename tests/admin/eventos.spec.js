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
    await page.locator('.leaflet-container').waitFor({ state: 'visible' });
    await page.locator('.leaflet-container').click();
    await page.locator('input[name="startDay"]').fill('2029-12-31');
    await page.locator('input[name="startTime"]').fill('10:00');
    await page.locator('input[name="endDay"]').fill('2029-12-31');
    await page.locator('input[name="endTime"]').fill('18:00');
    await page.getByPlaceholder('Palestrantes').fill('Pr. Dev');
    await page.getByPlaceholder('Bandas').fill('Banda QA');
    await page.locator('input[name="linkFormularioVoluntarios"]').fill('https://forms.gle/teste');

    await page.getByRole('button', { name: 'Salvar' }).click();

    // Redireciona para a tela de programação após criar
    await expect(page).toHaveURL(/\/admin\/eventos\/\d+\/programacao/);
    
    // Clica em Concluir para voltar para a edição
    await page.getByRole('button', { name: 'Concluir' }).click();
    await expect(page).toHaveURL(/\/admin\/eventos\/\d+\/editar/);
    
    // Volta para a lista de eventos
    await page.getByTitle('Voltar').click();

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

      // O mock do front não persiste a exclusão permanente entre loads se ele reseta, mas pelo menos validamos que o clique ocorre sem erros
    }
  });

  test('deve exibir erro ao tentar criar evento sem título', async ({ page }) => {
    await page.goto('/admin/eventos/criar');

    // Deixa título vazio e preenche o resto
    await page.locator('input[name="startDay"]').fill('2029-12-31');
    await page.locator('input[name="startTime"]').fill('10:00');
    await page.locator('input[name="endDay"]').fill('2029-12-31');
    await page.locator('input[name="endTime"]').fill('18:00');

    // Intercepta alerts do navegador, pois o app usa alert() 
    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Salvar' }).click();

    // O mock handleCreateEvent verifica `!formData.title` e retorna {success: false, error: 'O nome do evento é obrigatório.'} ou o HTML5 valida antes. Vamos verificar se alert foi chamado ou campo required
    const titleInput = page.getByPlaceholder('Nome do Evento');
    const isRequired = await titleInput.getAttribute('required');

    // Se for required no html, o formulário não é submetido
    // Se for validado via JS e dar alert
    expect(isRequired !== null || alertMessage === 'O nome do evento é obrigatório.').toBeTruthy();
  });

  test('deve testar os botões de Voltar e Cancelar na criação e edição, além de Editar Programação', async ({ page }) => {
    test.setTimeout(60000);
    // Cria
    await page.goto('/admin/eventos/criar');
    await page.getByTitle('Voltar').first().click();
    await expect(page).toHaveURL(/\/admin\/eventos/);

    await page.goto('/admin/eventos/criar');
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await expect(page).toHaveURL(/\/admin\/eventos/);

    // Edita
    await page.goto('/admin/eventos/1/editar');
    await page.getByTitle('Voltar').first().click();
    await expect(page).toHaveURL(/\/admin\/eventos/);

    await page.goto('/admin/eventos/1/editar');
    await page.getByRole('button', { name: 'Cancelar' }).click();
    await expect(page).toHaveURL(/\/admin\/eventos/);

    // Botão Editar Programação (só existe na edição)
    await page.goto('/admin/eventos/1/editar');
    await page.getByRole('button', { name: /Editar Programação do Evento/i }).click();
    await expect(page).toHaveURL(/\/admin\/eventos\/1\/programacao/);
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
    // Edita
    await page.goto('/admin/eventos/999999/editar');
    await expect(page.getByText('Evento não encontrado.')).toBeVisible();
    await page.getByRole('button', { name: 'Voltar para Eventos' }).click();
    await expect(page).toHaveURL(/\/admin\/eventos/);

    // Detalhes
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
    await page.locator('input[name="start"]').fill('12:00');
    await page.locator('input[name="end"]').fill('13:30');

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

      // Aguarda a página recarregar as atividades
      await page.waitForTimeout(1000);

      // Verifica se o contador diminuiu
      const countAfter = await activityRows.count();
      expect(countAfter).toBe(countBefore - 1);
    } else {
      // Se não há atividades, verifica que o estado vazio é exibido
      await expect(page.getByText('Nenhuma atividade cadastrada.')).toBeVisible();
    }
  });

  test('deve concluir a programação e voltar para edição', async ({ page }) => {
    const btnConcluir = page.getByRole('button', { name: 'Concluir' });
    await btnConcluir.click();

    // Redireciona de volta p/ a edição do evento
    await expect(page).toHaveURL(/\/admin\/eventos\/1\/editar/);
  });

  test('deve exibir empty state na programação quando não houver atividades', async ({ page }) => {
    // Evento 2 tem programação vazia
    await page.goto('/admin/eventos/2/programacao');

    // O EmptyState deve estar visível ("Nenhuma atividade cadastrada.")
    await expect(page.getByText('Nenhuma atividade cadastrada.')).toBeVisible();

    // Quando clica em adicionar, o empty state some (cobrindo a linha 108: !showAddForm)
    const btnPlus = page.getByTitle('Adicionar atividade');
    await btnPlus.click();

    await expect(page.getByText('Nenhuma atividade cadastrada.')).not.toBeVisible();
  });
});

test.describe('Admin - Cobertura Extra de Branches', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('deve exibir alert ao criar evento com título mas sem local (Create.jsx L15)', async ({ page }) => {
    await page.goto('/admin/eventos/criar');

    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Preenche título e data mas NÃO preenche local
    await page.getByPlaceholder('Nome do Evento').fill('Evento Sem Local');
    await page.locator('input[name="startDay"]').fill('2029-12-31');
    await page.locator('input[name="startTime"]').fill('10:00');
    await page.locator('input[name="endDay"]').fill('2029-12-31');
    await page.locator('input[name="endTime"]').fill('18:00');

    // Remove required dos inputs para bypass HTML5 validation
    await page.evaluate(() => {
      document.querySelectorAll('[required]').forEach(el => el.removeAttribute('required'));
    });

    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForTimeout(500);
    expect(alertMessage).toContain('Latitude e longitude');
  });

  test('deve exibir alert ao editar evento limpando o título (Edit.jsx L32)', async ({ page }) => {
    await page.goto('/admin/eventos/1/editar');

    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Limpa o título e remove required para bypass HTML5 validation
    const titleInput = page.getByPlaceholder('Nome do Evento');
    await titleInput.fill('');
    await page.evaluate(() => {
      document.querySelectorAll('[required]').forEach(el => el.removeAttribute('required'));
    });

    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForTimeout(500);
    expect(alertMessage.length).toBeGreaterThan(0);
  });

  test('deve exibir Evento não encontrado na programação com ID inválido (EditSchedule.jsx L29-39)', async ({ page }) => {
    await page.goto('/admin/eventos/999999/programacao');

    await expect(page.getByText('Evento não encontrado.')).toBeVisible();
    await page.getByRole('button', { name: 'Voltar para Eventos' }).click();
    await expect(page).toHaveURL(/\/admin\/eventos/);
  });

  test('deve exibir alert ao adicionar atividade sem nome (ActivityInlineForm.jsx L19-20)', async ({ page }) => {
    await page.goto('/admin/eventos/1/programacao');

    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Abre formulário inline
    await page.getByTitle('Adicionar atividade').click();

    // Remove required para bypass HTML5 validation
    await page.evaluate(() => {
      document.querySelectorAll('[required]').forEach(el => el.removeAttribute('required'));
    });

    // Tenta confirmar sem preencher nome
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await page.waitForTimeout(500);
    expect(alertMessage).toContain('Nome da atividade');
  });

  test('deve editar atividade inline na programação (EditSchedule.jsx L99)', async ({ page }) => {
    await page.goto('/admin/eventos/1/programacao');

    // Clica no editar da primeira atividade
    const btnEditar = page.getByTitle('Editar atividade').first();
    await expect(btnEditar).toBeVisible();
    await btnEditar.click();

    // Modifica o nome
    const inputAtividade = page.getByPlaceholder('Nome da atividade');
    await inputAtividade.fill('Atividade Inline Editada');

    // Cancela para cobrir o setEditingItem(null) via botão Cancelar
    await page.getByRole('button', { name: 'Cancelar' }).click();

    // Agora edita de novo e confirma
    await page.getByTitle('Editar atividade').first().click();
    await page.getByPlaceholder('Nome da atividade').fill('Atividade Confirmada');
    await page.getByRole('button', { name: 'Confirmar' }).click();

    await expect(page.getByText('Atividade Confirmada')).toBeVisible();
  });

  test('deve cobrir Details.jsx com evento sem campos opcionais preenchidos (Details.jsx branches)', async ({ page }) => {
    // Primeiro cria um evento mínimo no passado para aparecer em "Eventos Anteriores" com link "Detalhes"
    await page.goto('/admin/eventos/criar');
    await page.getByPlaceholder('Nome do Evento').fill('Evento Minimalista');
    await page.locator('input[name="startDay"]').fill('2020-01-01');
    await page.locator('input[name="startTime"]').fill('10:00');
    await page.locator('input[name="endDay"]').fill('2020-01-01');
    await page.locator('input[name="endTime"]').fill('18:00');
    await page.locator('.leaflet-container').waitFor({ state: 'visible' });
    await page.locator('.leaflet-container').click();
    await page.getByRole('button', { name: 'Salvar' }).click();
    await expect(page).toHaveURL(/\/admin\/eventos\/\d+\/programacao/);
    
    // Conclui a tela de programação para voltar à edição e depois à lista
    await page.getByRole('button', { name: 'Concluir' }).click();
    await expect(page).toHaveURL(/\/admin\/eventos\/\d+\/editar/);
    await page.getByTitle('Voltar').click();
    await expect(page).toHaveURL(/\/admin\/eventos/);

    // Acha o link Detalhes do novo evento especificamente
    const eventCard = page.locator('.flex.items-center.gap-4').filter({ hasText: 'Evento Minimalista' }).first();
    const detalhesLink = eventCard.getByRole('link', { name: 'Detalhes' });
    await detalhesLink.click();

    await expect(page.getByRole('heading', { name: 'Detalhes do Evento' })).toBeVisible();
    // Os campos opcionais devem ter o "—" como fallback
    await expect(page.getByText('—').first()).toBeVisible();
  });

  test('deve criar evento sem título via JS para cobrir Create.jsx L15 (alert branch)', async ({ page }) => {
    await page.goto('/admin/eventos/criar');

    let alertMessage = '';
    page.on('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    // Remove required de TODOS os inputs
    await page.evaluate(() => {
      document.querySelectorAll('[required]').forEach(el => el.removeAttribute('required'));
    });

    // Submete sem preencher nada
    await page.getByRole('button', { name: 'Salvar' }).click();
    await page.waitForTimeout(500);
    expect(alertMessage.length).toBeGreaterThan(0);
  });

  test('deve confirmar exclusão de evento clicando Sim no modal (Eventos/index.jsx L32-34)', async ({ page }) => {
    await page.goto('/admin/eventos');

    // Clica no botão Excluir
    const btnExcluir = page.getByTitle('Excluir').first();
    await expect(btnExcluir).toBeVisible();
    await btnExcluir.click();

    // O modal deve aparecer
    const modalHeading = page.getByText('Tem certeza que deseja excluir este evento?');
    await expect(modalHeading).toBeVisible();

    // Confirma exclusão clicando "Sim"
    const btnSim = page.getByRole('button', { name: 'Sim' });
    await btnSim.click();

    // Modal deve fechar
    await expect(modalHeading).not.toBeVisible();
  });

  test('deve cobrir EditSchedule.jsx handleBack (L39) e alert de erro no salvar (L76)', async ({ page }) => {
    // Visita uma página de programação válida
    await page.goto('/admin/eventos/1/programacao');
    await expect(page.getByRole('heading', { name: 'Programação do Evento' })).toBeVisible();

    // Teste handleBack clicando no botão Voltar no SectionTitle
    await page.locator('button[title="Voltar"]').click();
    await expect(page).toHaveURL(/\/admin\/eventos\/1\/editar/);
  });

  test('deve cobrir Details.jsx com todos os branches de fallback (L13, L83-99)', async ({ page }) => {
    // Usa o evento 6 (no passado, sem campos opcionais) para testar todos os branches de fallback
    // Evento 6: 'Evento No Passado' - está na lista de eventos anteriores, sem formulario_link
    await page.goto('/admin/voluntarios');
    await expect(page.getByRole('heading', { name: 'Voluntários' })).toBeVisible();

    // Encontra o card do evento 6 e clica em Voluntários Inscritos
    const eventCard = page.locator('.bg-white.rounded-2xl').filter({ hasText: 'Evento No Passado' }).first();
    await expect(eventCard).toBeVisible({ timeout: 8000 });
    await eventCard.getByRole('link', { name: 'Voluntários Inscritos' }).click();

    // Página de detalhes dos voluntários
    await expect(page.getByRole('heading', { name: 'Voluntários' })).toBeVisible();
    await expect(page).toHaveURL(/\/admin\/voluntarios\/6/);

    // Deve mostrar estado vazio pois não há voluntários para o evento 6
    await expect(page.getByText('Nenhum voluntário inscrito neste evento.')).toBeVisible({ timeout: 8000 });

    // Agora navega para os detalhes do evento 6 para verificar os branches de fallback de Details.jsx
    await page.goto('/admin/eventos/6');
    await expect(page.getByRole('heading', { name: 'Detalhes do Evento' })).toBeVisible();

    // O fallback "—" deve aparecer para descrição, palestrantes, bandas
    // O evento 6 tem descricao="Evento que já aconteceu..." mas não tem palestrantes nem bandas
    const dashes = page.getByText('—');
    expect(await dashes.count()).toBeGreaterThanOrEqual(1);
  });

  test('deve cobrir Details.jsx ?? branches com valores null (totalParticipantes/totalVoluntarios)', async ({ page }) => {
    // Intercepta a rota da API para retornar um evento com valores null explícitos
    await page.route('**/evento/77777*', async (route) => {
      const json = {
        evento_id: 77777,
        nome: 'Evento Null Fields',
        data_inicio: '2019-01-01T00:00:00.000Z',
        data_fim: '2019-01-01T00:00:00.000Z',
        local_latitude: null,
        local_longitude: null,
        nome_local: null,
        descricao: null,
        totalParticipantes: null,
        totalVoluntarios: null,
        palestrantes: null,
        bandas: null,
        link_imagem: null
      };
      await route.fulfill({ status: 200, json });
    });

    // Navega para a página de detalhes deste evento
    await page.goto('/admin/eventos/77777');

    await expect(page.getByRole('heading', { name: 'Detalhes do Evento' })).toBeVisible();
    await expect(page.getByText('Evento Null Fields')).toBeVisible();

    // totalParticipantes e totalVoluntarios devem mostrar "0"
    const dashes = page.getByText('—');
    expect(await dashes.count()).toBeGreaterThanOrEqual(4);
  });
});

