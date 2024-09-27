const { accessUrl } = require('../service/use-puppet');

describe('최초 테스트', () => {
  let page = null;
  let status = null;
  let browser = null;
  beforeAll('테스트 시작 전', async () => {
    const {
      status: s,
      browser: b,
      page: p,
    } = await accessUrl('https://ara.apply.kr');
    page = p;
    status = s;
    browser = b;
  });
  test('접속 테스트', () => {
    expect(status).toBe(true);
  });
  test('로그인 테스트', async () => {
    await page.click('input[name="email"]');
    await page.type('input[name="email"]', 'navskh@jinhakapply.com');
    await page.click('input[name="password"]');
    await page.type('input[name="password"]', 'gen281315!');
    await page.click('button[type="submit"]');
  });
  test('버튼을 클릭하면, 레이어가 보인다.', async () => {
    await page.click('.btn1');
    const layer = await page.$('.side-panel.open');
    expect(layer).not.toBeNull();
  });
});
