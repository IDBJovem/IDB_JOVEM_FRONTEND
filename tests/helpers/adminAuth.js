export async function loginAsAdmin(page) {
  await page.addInitScript(() => {
    window.localStorage.setItem('idb_auth', JSON.stringify({
      usuario: 'idbjovem',
      role: 'admin'
    }));
  });
}
