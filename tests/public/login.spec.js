import { test, expect } from '../helpers/testWithCoverage.js';
import { mockKeycloakLogin } from '../helpers/adminAuth';
import { setupApiMock } from '../helpers/apiMock';

test.describe('Página de Login', () => {

  test.beforeEach(async ({ page }) => {
    await mockKeycloakLogin(page);
    await setupApiMock(page);
    await page.goto('/login');
  });

  test('deve carregar a página e exibir o título "Faça o seu login"', async ({ page }) => {
    const titulo = page.getByRole('heading', { name: 'Faça o seu login' });
    await expect(titulo).toBeVisible();
  });

  test('deve exibir os labels "Seu usuário:" e "Sua senha:"', async ({ page }) => {
    await expect(page.getByText('Seu usuário:')).toBeVisible();
    await expect(page.getByText('Sua senha:')).toBeVisible();
  });

  test('deve exibir os campos de usuário e senha com placeholders corretos', async ({ page }) => {
    const campoUsuario = page.getByPlaceholder('Digite seu usuário');
    const campoSenha = page.getByPlaceholder('Digite sua senha');
    await expect(campoUsuario).toBeVisible();
    await expect(campoSenha).toBeVisible();
  });

  test('deve exibir o botão de login', async ({ page }) => {
    const botaoLogin = page.getByRole('button', { name: 'Login' });
    await expect(botaoLogin).toBeVisible();
  });

  test('deve ter campo de senha com type "password" por padrão', async ({ page }) => {
    const inputSenha = page.locator('input[name="senha"]');
    await expect(inputSenha).toHaveAttribute('type', 'password');
  });

  test('deve permitir preencher os campos de usuário e senha', async ({ page }) => {
    const campoUsuario = page.getByPlaceholder('Digite seu usuário');
    const campoSenha = page.getByPlaceholder('Digite sua senha');

    await campoUsuario.fill('meu_usuario');
    await campoSenha.fill('minha_senha_secreta');

    await expect(campoUsuario).toHaveValue('meu_usuario');
    await expect(campoSenha).toHaveValue('minha_senha_secreta');
  });

  test('deve alternar a visibilidade da senha ao clicar no ícone do olho', async ({ page }) => {
    const inputSenha = page.locator('input[name="senha"]');

    await expect(inputSenha).toHaveAttribute('type', 'password');

    // Clica para mostrar
    await page.getByLabel('Mostrar senha').click();
    await expect(inputSenha).toHaveAttribute('type', 'text');

    // Clica para ocultar novamente
    await page.getByLabel('Ocultar senha').click();
    await expect(inputSenha).toHaveAttribute('type', 'password');
  });

  test('deve exibir mensagem de erro ao logar com credenciais inválidas', async ({ page }) => {
    await page.getByPlaceholder('Digite seu usuário').fill('usuario_errado');
    await page.getByPlaceholder('Digite sua senha').fill('senha_errada');
    await page.getByRole('button', { name: 'Login' }).click();

    // Verifica se a mensagem de erro aparece
    await expect(page.getByText('Usuário ou senha inválidos')).toBeVisible();
  });

  test('deve fazer login com credenciais válidas e redirecionar para /admin', async ({ page }) => {
    await page.getByPlaceholder('Digite seu usuário').fill('idbjovem');
    await page.getByPlaceholder('Digite sua senha').fill('idbjovem');
    await page.getByRole('button', { name: 'Login' }).click();

    // Deve redirecionar para o painel admin
    await expect(page).toHaveURL(/\/admin/);
  });

  test('deve ter o header visível (MainLayoutNoFooter)', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('não deve ter footer na página de login', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toHaveCount(0);
  });
});

test.describe('AuthContext – branches de cobertura', () => {
  test('login com token indecodificável retorna erro (decodeToken catch L33, userFromToken null L79)', async ({ page }) => {
    await setupApiMock(page);

    // Mock Keycloak para retornar um token JWT completamente inválido (não-decodificável)
    await page.route('**/protocol/openid-connect/token', (route) => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'not-a-valid-jwt',
          token_type: 'Bearer',
          expires_in: 3600,
        }),
      });
    });

    await page.goto('/login');

    await page.getByPlaceholder('Digite seu usuário').fill('anyuser');
    await page.getByPlaceholder('Digite sua senha').fill('anypass');
    await page.getByRole('button', { name: 'Login' }).click();

    // Deve exibir mensagem de erro porque userFromToken retorna null (L79)
    await expect(page.getByText('Não foi possível validar a sessão.')).toBeVisible();
  });

  test('login com token de usuário sem permissão admin retorna erro (L81-82)', async ({ page }) => {
    await setupApiMock(page);

    // Cria um JWT válido mas sem roles de admin
    const base64url = (obj) =>
      Buffer.from(JSON.stringify(obj))
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    const header = base64url({ alg: 'HS256', typ: 'JWT' });
    const payload = base64url({
      name: 'Usuário Comum',
      preferred_username: 'comum',
      email: 'comum@example.com',
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      realm_access: { roles: ['user'] },  // sem admin nem superadmin
    });
    const nonAdminToken = `${header}.${payload}.signature`;

    await page.route('**/protocol/openid-connect/token', (route) => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: nonAdminToken,
          token_type: 'Bearer',
          expires_in: 3600,
        }),
      });
    });

    await page.goto('/login');

    await page.getByPlaceholder('Digite seu usuário').fill('comum');
    await page.getByPlaceholder('Digite sua senha').fill('comum');
    await page.getByRole('button', { name: 'Login' }).click();

    // Deve exibir mensagem de erro de permissão (L82)
    await expect(page.getByText('Usuário sem permissão de administrador.')).toBeVisible();
  });

  test('login com Keycloak retornando erro genérico sem error_description (L93)', async ({ page }) => {
    await setupApiMock(page);

    // Mock Keycloak para retornar erro sem error_description
    await page.route('**/protocol/openid-connect/token', (route) => {
      return route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'server_error' }),
      });
    });

    await page.goto('/login');

    await page.getByPlaceholder('Digite seu usuário').fill('anyuser');
    await page.getByPlaceholder('Digite sua senha').fill('anypass');
    await page.getByRole('button', { name: 'Login' }).click();

    // Deve exibir a mensagem fallback (L93)
    await expect(page.getByText('Erro ao fazer login. Tente novamente.')).toBeVisible();
  });

  test('login com token expirado: userFromToken retorna null (L41)', async ({ page }) => {
    await setupApiMock(page);

    // JWT com exp no passado
    const base64url = (obj) =>
      Buffer.from(JSON.stringify(obj))
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    const header = base64url({ alg: 'HS256', typ: 'JWT' });
    const payload = base64url({
      name: 'Expirado',
      preferred_username: 'expirado',
      email: 'exp@example.com',
      exp: Math.floor(Date.now() / 1000) - 3600, // expirado
      realm_access: { roles: ['admin'] },
    });
    const expiredToken = `${header}.${payload}.signature`;

    await page.route('**/protocol/openid-connect/token', (route) => {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: expiredToken,
          token_type: 'Bearer',
          expires_in: 3600,
        }),
      });
    });

    await page.goto('/login');

    await page.getByPlaceholder('Digite seu usuário').fill('expirado');
    await page.getByPlaceholder('Digite sua senha').fill('expirado');
    await page.getByRole('button', { name: 'Login' }).click();

    // Token expirado → userFromToken retorna null → L79
    await expect(page.getByText('Não foi possível validar a sessão.')).toBeVisible();
  });
});

