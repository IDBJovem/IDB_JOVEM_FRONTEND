export async function loginAsAdmin(page) {
  await page.addInitScript(() => {
    const fakePayload = {
      exp: Math.floor(Date.now() / 1000) + 3600,
      realm_access: { roles: ['admin'] },
      preferred_username: 'idbjovem'
    };
    const base64Payload = btoa(JSON.stringify(fakePayload));
    const fakeToken = `header.${base64Payload}.signature`;
    window.localStorage.setItem('idb_token', fakeToken);
  });
}
