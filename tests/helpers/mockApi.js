export const apiMockEvents = [
  { evento_id: 1, nome: "IDB TEEN CAMP", descricao: "Acampamento de jovens com muita diversão...", data_inicio: "2027-07-15T18:00", data_fim: "2027-07-18T12:00", local_latitude: -15.7934, local_longitude: -47.8822, nome_local: "Acampamento Central", formulario_link: "http://forms.google.com/xyz", link_galeria: "http://drive.google.com/xyz" },
  { evento_id: 2, nome: "Conferência de Liderança", descricao: "Treinamento para líderes...", data_inicio: "2027-08-20T19:00", data_fim: "2027-08-22T21:00", local_latitude: -15.80, local_longitude: -47.90, nome_local: "Sede Principal" },
  { evento_id: 3, nome: "IMERSÃO 2027", descricao: "Maior evento do ano", data_inicio: "2027-12-05T08:00", data_fim: "2027-12-05T20:00", local_latitude: -15.82, local_longitude: -47.92, nome_local: "Centro de Convenções", link_galeria: "12345" },
  { evento_id: 4, nome: "Retiro Espiritual", descricao: "Tempo de busca e consagração...", data_inicio: "2027-09-10T18:00", data_fim: "2027-09-12T12:00", local_latitude: -15.83, local_longitude: -47.93, nome_local: "Sítio de Retiros" },
  { evento_id: 5, nome: "Evento na Região Nordeste", descricao: "Evento especial na região nordeste...", data_inicio: "2027-10-15T18:00", data_fim: "2027-10-18T12:00", local_latitude: -15.84, local_longitude: -47.94, nome_local: "Igreja Local" },
  { evento_id: 6, nome: "Evento No Passado", descricao: "Evento que já aconteceu...", data_inicio: "2025-11-20T19:00", data_fim: "2025-11-22T21:00", local_latitude: -15.85, local_longitude: -47.95, nome_local: "Salão Principal" },
  { evento_id: 7, nome: "Evento Teste 7", descricao: "Evento para completar grid", data_inicio: "2027-11-25T19:00", data_fim: "2027-11-26T21:00", local_latitude: -15.85, local_longitude: -47.95, nome_local: "Salão Secundário" }
];

export const apiMockVolunteers = [
  { voluntario_id: 1, evento_id: 1, nome: "Ana Beatriz Silva", email: "ana@gmail.com", status: "pendente", resposta_id: "resp1", link_resposta: "http://forms.google.com/resp1" },
  { voluntario_id: 2, evento_id: 1, nome: "Lucas Oliveira", email: "lucas@gmail.com", status: "aprovado", resposta_id: "resp2", link_resposta: "http://forms.google.com/resp2" }
];

export const apiMockProducts = [
  { produto_id: 1, nome: "Camiseta Igreja", descricao: "Descrição", link_produto: "http://hotmart.com", link_imagem: "img1.png" },
  { produto_id: 2, nome: "Caneca", descricao: "Descrição", link_imagem: "img2.png" }
];

const apiMockSpeakers = [
  { id: 1, nome: "Palestrante A", papel: "Pastor" },
  { id: 2, nome: "Palestrante B", papel: "Líder" },
  { id: 3, nome: "Palestrante C", papel: "Líder" },
  { id: 4, nome: "Palestrante D", papel: "Líder" }
];

let apiMockActivities = [
  { atividade_id: 1, evento_id: 1, nome: "Abertura", horario_inicio: "2026-07-10T17:00:00", horario_termino: "2026-07-10T18:00:00" },
  { atividade_id: 2, evento_id: 1, nome: "Louvor", horario_inicio: "2026-07-10T18:00:00", horario_termino: "2026-07-10T19:00:00" },
  { atividade_id: 3, evento_id: 1, nome: "Ministração", horario_inicio: "2026-07-10T19:00:00", horario_termino: "2026-07-10T20:30:00" },
  { atividade_id: 4, evento_id: 1, nome: "Encerramento", horario_inicio: "2026-07-10T20:30:00", horario_termino: "2026-07-10T21:00:00" },
  { atividade_id: 5, evento_id: 3, nome: "Atividade 1", horario_inicio: "2025-12-05T08:00:00", horario_termino: "2025-12-05T09:00:00" },
  { atividade_id: 6, evento_id: 3, nome: "Atividade 2", horario_inicio: "2025-12-05T09:00:00", horario_termino: "2025-12-05T10:00:00" },
  { atividade_id: 7, evento_id: 3, nome: "Atividade 3", horario_inicio: "2025-12-05T10:00:00", horario_termino: "2025-12-05T11:00:00" },
  { atividade_id: 8, evento_id: 3, nome: "Atividade 4", horario_inicio: "2025-12-05T11:00:00", horario_termino: "2025-12-05T12:00:00" },
  { atividade_id: 9, evento_id: 3, nome: "Atividade 5", horario_inicio: "2025-12-05T12:00:00", horario_termino: "2025-12-05T13:00:00" },
  { atividade_id: 10, evento_id: 3, nome: "Atividade 6", horario_inicio: "2025-12-05T13:00:00", horario_termino: "2025-12-05T14:00:00" },
  { atividade_id: 11, evento_id: 3, nome: "Atividade 7", horario_inicio: "2025-12-05T14:00:00", horario_termino: "2025-12-05T15:00:00" },
  { atividade_id: 12, evento_id: 3, nome: "Atividade 8", horario_inicio: "2025-12-05T15:00:00", horario_termino: "2025-12-05T16:00:00" }
];

// Auto-increment for new events/activities created during tests
let nextEventId = 100;
let nextActivityId = 100;

export async function setupApiMocks(context) {
  await context.route('**/protocol/openid-connect/token', async (route) => {
    const method = route.request().method();
    // CORS preflight
    if (method === 'OPTIONS') {
      return route.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
    }
    const postData = route.request().postData() || '';
    if (postData.includes('username=usuario_errado')) {
       return route.fulfill({ status: 401, json: { error_description: 'Invalid user credentials' }});
    }
    
    const fakePayload = {
        exp: Math.floor(Date.now() / 1000) + 3600,
        realm_access: { roles: ['admin'] },
        preferred_username: 'idbjovem'
    };
    const base64Payload = btoa(JSON.stringify(fakePayload));
    const fakeToken = `header.${base64Payload}.signature`;
    return route.fulfill({ status: 200, json: { access_token: fakeToken }});
  });

  // Track created events per-context so POST /evento/ returns useful IDs
  const createdEvents = [];
  const createdActivities = [];

  return context.route('**/*', async (route) => {
    const request = route.request();
    const method = request.method();
    const url = request.url();
    const resourceType = request.resourceType();

    // Only intercept XHR/Fetch requests
    if (resourceType !== 'fetch' && resourceType !== 'xhr') {
        return route.continue();
    }

    // Check if it's an API request we care about
    const apiEndpoints = ['/evento', '/voluntarios', '/produto', '/formulario', '/lider', '/palestrante', '/banda-palestrante', '/mapa', '/admin'];
    const isApiRequest = apiEndpoints.some(ep => url.includes(ep));
    
    if (!isApiRequest) {
        return route.continue();
    }

    // CORS preflight
    if (method === 'OPTIONS') {
      return route.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
    }

    // ──────────────────────────────────────────────────────────────
    // MAPA (geocoding)
    // ──────────────────────────────────────────────────────────────
    if (url.includes('/mapa/endereco')) {
      return route.fulfill({ status: 200, json: { endereco: 'Endereço Mockado, Brasília - DF' } });
    }

    // ──────────────────────────────────────────────────────────────
    // ADMIN
    // ──────────────────────────────────────────────────────────────
    if (url.includes('/admin')) {
      if (method === 'GET') return route.fulfill({ status: 200, json: [] });
      return route.fulfill({ status: 200, json: {} });
    }

    // ──────────────────────────────────────────────────────────────
    // EVENTO - atividade por ID (PUT/DELETE /evento/atividade/{id})
    // Must come BEFORE the /evento/{id} matcher
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/evento\/atividade\/\d+/)) {
       const match = url.match(/\/evento\/atividade\/(\d+)/);
       const actIdStr = match ? match[1] : '0';
       
       if (method === 'PUT') {
         const body = typeof request.postData() === 'string' ? JSON.parse(request.postData() || '{}') : {};
         
         // Update in the mock list
         const index = apiMockActivities.findIndex(a => a.atividade_id == actIdStr);
         if (index >= 0) {
            apiMockActivities[index] = { ...apiMockActivities[index], ...body, nome: body.nome || apiMockActivities[index].nome };
         } else {
            const indexCreated = createdActivities.findIndex(a => a.atividade_id == actIdStr);
            if (indexCreated >= 0) {
               createdActivities[indexCreated] = { ...createdActivities[indexCreated], ...body, nome: body.nome || createdActivities[indexCreated].nome };
            }
         }
         
         return route.fulfill({ status: 200, json: { atividade_id: Number(actIdStr), evento_id: 1, nome: body.nome || 'Atividade Atualizada', horario_inicio: body.horario_inicio || '2026-07-10T10:00:00', horario_termino: body.horario_termino || '2026-07-10T11:00:00' } });
       }
       if (method === 'DELETE') {
         apiMockActivities = apiMockActivities.filter(a => a.atividade_id != actIdStr);
         // Also remove from createdActivities
         const index = createdActivities.findIndex(a => a.atividade_id == actIdStr);
         if (index >= 0) createdActivities.splice(index, 1);
         return route.fulfill({ status: 200, json: { success: true } });
       }
       return route.fulfill({ status: 200, json: {} });
    }

    // ──────────────────────────────────────────────────────────────
    // EVENTO - atividades de um evento (GET/POST /evento/{id}/atividade)
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/evento\/\d+\/atividade/)) {
       const match = url.match(/\/evento\/(\d+)\/atividade/);
       const eventIdStr = match ? match[1] : '0';
       if (method === 'GET') {
          const allActs = [...apiMockActivities, ...createdActivities];
          return route.fulfill({ status: 200, json: allActs.filter(a => a.evento_id == eventIdStr) });
       }
       if (method === 'POST') {
         const id = nextActivityId++;
         const body = typeof request.postData() === 'string' ? JSON.parse(request.postData() || '{}') : {};
         const newAct = { atividade_id: id, evento_id: Number(eventIdStr), nome: body.nome || 'Nova Atividade', horario_inicio: body.horario_inicio || '2026-07-10T12:00:00', horario_termino: body.horario_termino || '2026-07-10T13:00:00' };
         createdActivities.push(newAct);
         return route.fulfill({ status: 201, json: newAct });
       }
       return route.fulfill({ status: 200, json: {} });
    }
    
    // ──────────────────────────────────────────────────────────────
    // EVENTO - galeria (GET /evento/{id}/galeria)
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/evento\/\d+\/galeria/)) {
       const match = url.match(/\/evento\/(\d+)\/galeria/);
       if (match) {
           const idStr = match[1];
           if (idStr === '1' || idStr === '3') {
               return route.fulfill({ status: 200, json: [{ id: 1, nome: 'foto', url_visualizacao: 'foto.jpg' }] });
           }
       }
       return route.fulfill({ status: 200, json: [] });
    }

    // ──────────────────────────────────────────────────────────────
    // EVENTO - participantes (GET /evento/{id}/participantes)
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/evento\/\d+\/participantes/)) {
       return route.fulfill({ status: 200, json: apiMockSpeakers });
    }

    // ──────────────────────────────────────────────────────────────
    // EVENTO - buscar (GET /evento/buscar?termo=...)
    // ──────────────────────────────────────────────────────────────
    if (url.includes('/evento/buscar')) {
        const urlObj = new URL(url);
        const q = urlObj.searchParams.get('termo') || '';
        const allEvts = [...apiMockEvents, ...createdEvents];
        const filtered = allEvts.filter(e => e.nome.toLowerCase().includes(q.toLowerCase()));
        return route.fulfill({ status: 200, json: filtered });
    }

    // ──────────────────────────────────────────────────────────────
    // EVENTO - single (GET/PUT/DELETE /evento/{id})
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/evento\/(\d+)(\?.*)?$/)) {
       const match = url.match(/\/evento\/(\d+)/);
       if (match) {
           const idStr = match[1];
           const allEvts = [...apiMockEvents, ...createdEvents];
           const ev = allEvts.find(e => e.evento_id == idStr);
           if (!ev) {
               return route.fulfill({ status: 404, json: { detail: 'Evento não encontrado' } });
           }
           if (method === 'GET') return route.fulfill({ status: 200, json: ev });
           if (method === 'PUT') return route.fulfill({ status: 200, json: ev });
           if (method === 'DELETE') return route.fulfill({ status: 200, json: { success: true } });
       }
    }

    // ──────────────────────────────────────────────────────────────
    // EVENTO - list/create (GET/POST /evento/)
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/evento\/?\??[^/]*$/)) {
       if (method === 'GET') return route.fulfill({ status: 200, json: [...apiMockEvents, ...createdEvents] });
       if (method === 'POST') {
         const id = nextEventId++;
         const body = typeof request.postData() === 'string' ? JSON.parse(request.postData() || '{}') : {};
         const newEvent = {
           evento_id: id,
           nome: body.nome || 'Novo Evento',
           descricao: body.descricao || '',
           data_inicio: body.data_inicio || '2029-12-31T10:00:00',
           data_fim: body.data_fim || '2029-12-31T18:00:00',
           local_latitude: body.local_latitude || -15.79,
           local_longitude: body.local_longitude || -47.88,
           nome_local: 'Local Mockado',
           formulario_link: body.formulario_link || null,
           link_galeria: body.link_galeria || null,
           link_imagem: body.link_imagem || null,
         };
         createdEvents.push(newEvent);
         return route.fulfill({ status: 201, json: newEvent });
       }
    }

    // ──────────────────────────────────────────────────────────────
    // VOLUNTÁRIOS - contagem por evento (GET /voluntarios/evento/{id}/contagem)
    // Must come BEFORE /voluntarios/evento/{id}
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/voluntarios\/evento\/\d+\/contagem/)) {
       const match = url.match(/\/voluntarios\/evento\/(\d+)\/contagem/);
       const eventIdStr = match ? match[1] : '0';
       const count = apiMockVolunteers.filter(v => v.evento_id == eventIdStr).length;
       return route.fulfill({ status: 200, json: count });
    }

    // ──────────────────────────────────────────────────────────────
    // VOLUNTÁRIOS - status update (PATCH /voluntarios/{vol_id}/evento/{evt_id}/status)
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/voluntarios\/\d+\/evento\/\d+\/status/)) {
       const volMatch = url.match(/\/voluntarios\/(\d+)\/evento\/(\d+)\/status/);
       const volIdStr = volMatch ? volMatch[1] : '0';
       const urlObj = new URL(url);
       const novoStatus = urlObj.searchParams.get('novo_status') || 'aprovado';
       // Persist the status change in the mock data
       const volIdx = apiMockVolunteers.findIndex(v => v.voluntario_id == volIdStr);
       if (volIdx >= 0) apiMockVolunteers[volIdx].status = novoStatus;
       return route.fulfill({ status: 200, json: { voluntario_id: Number(volIdStr), evento_id: 1, status: novoStatus, resposta_id: 'resp1' } });
    }

    // ──────────────────────────────────────────────────────────────
    // VOLUNTÁRIOS - por evento (GET /voluntarios/evento/{id})
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/voluntarios\/evento\/\d+/)) {
       const match = url.match(/\/voluntarios\/evento\/(\d+)/);
       const eventIdStr = match ? match[1] : '0';
       const filtered = apiMockVolunteers.filter(v => v.evento_id == eventIdStr);
       return route.fulfill({ status: 200, json: filtered });
    }

    // ──────────────────────────────────────────────────────────────
    // VOLUNTÁRIOS - single (GET /voluntarios/{id})
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/voluntarios\/\d+(\?.*)?$/)) {
       const match = url.match(/\/voluntarios\/(\d+)/);
       const idStr = match ? match[1] : '0';
       const vol = apiMockVolunteers.find(v => v.voluntario_id == idStr);
       if (!vol) return route.fulfill({ status: 404, json: { detail: 'Voluntário não encontrado' } });
       return route.fulfill({ status: 200, json: vol });
    }

    // ──────────────────────────────────────────────────────────────
    // VOLUNTÁRIOS - list (GET /voluntarios/)
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/voluntarios\/?\??[^/]*$/)) {
       if (method === 'GET') return route.fulfill({ status: 200, json: apiMockVolunteers });
       if (method === 'POST') return route.fulfill({ status: 201, json: apiMockVolunteers[0] });
       if (method === 'DELETE') return route.fulfill({ status: 200, json: { success: true } });
    }

    // ──────────────────────────────────────────────────────────────
    // FORMULÁRIO - inscrições por evento (GET /formulario/eventos/{id}/inscricoes)
    // ──────────────────────────────────────────────────────────────
    if (url.includes('/formulario/eventos/')) {
       const match = url.match(/\/formulario\/eventos\/(\d+)\/inscricoes/);
       const eventIdStr = match ? match[1] : '0';
       const filtered = apiMockVolunteers.filter(v => v.evento_id == eventIdStr);
       return route.fulfill({ status: 200, json: filtered });
    }

    // ──────────────────────────────────────────────────────────────
    // PRODUTO - single (GET/PUT/DELETE /produto/{id})
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/produto\/\d+(\?.*)?$/)) {
       const match = url.match(/\/produto\/(\d+)/);
       const idStr = match ? match[1] : '0';
       const prod = apiMockProducts.find(p => p.produto_id == idStr);
       if (!prod) {
         return route.fulfill({ status: 404, json: { detail: 'Produto não encontrado' } });
       }
       if (method === 'GET') return route.fulfill({ status: 200, json: prod });
       if (method === 'PUT') return route.fulfill({ status: 200, json: prod });
       if (method === 'DELETE') return route.fulfill({ status: 200, json: { success: true } });
    }

    // ──────────────────────────────────────────────────────────────
    // PRODUTO - list/create (GET/POST /produto/)
    // ──────────────────────────────────────────────────────────────
    if (url.match(/\/produto\/?\??[^/]*$/)) {
       if (method === 'GET') return route.fulfill({ status: 200, json: apiMockProducts });
       if (method === 'POST') return route.fulfill({ status: 201, json: { ...apiMockProducts[0], produto_id: 99 } });
    }

    // ──────────────────────────────────────────────────────────────
    // LIDER
    // ──────────────────────────────────────────────────────────────
    if (url.includes('/lider')) {
       if (method === 'GET') return route.fulfill({ status: 200, json: [] });
       return route.fulfill({ status: 200, json: {} });
    }

    // ──────────────────────────────────────────────────────────────
    // BANDA-PALESTRANTE / PALESTRANTE
    // ──────────────────────────────────────────────────────────────
    if (url.includes('/banda-palestrante') || url.includes('/palestrante')) {
       if (method === 'GET') return route.fulfill({ status: 200, json: apiMockSpeakers });
       if (method === 'DELETE') return route.fulfill({ status: 200, json: { success: true } });
       return route.fulfill({ status: 201, json: apiMockSpeakers[0] });
    }
    
    // Default fallback
    return route.fulfill({ status: 200, json: {} });
  });
}
