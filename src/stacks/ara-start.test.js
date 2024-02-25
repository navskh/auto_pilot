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
    } = await accessUrl('http://localhost:3000');
    page = p;
    status = s;
    browser = b;
  });
  test('접속 테스트', () => {
    expect(status).toBe(true);
  });
  test('최초에 렌더링 되면, Header, Sidebar, Contents가 보인다.', async () => {
    const header = await page.$('.header');
    const sidebar = await page.$('.sidebar');
    const contents = await page.$('.contents');
    expect(header).not.toBeNull();
    expect(sidebar).not.toBeNull();
    expect(contents).not.toBeNull();
  });
  test('버튼을 클릭하면, 레이어가 보인다.', async () => {
    await page.click('.btn1');
    const layer = await page.$('.side-panel.open');
    expect(layer).not.toBeNull();
  });
});
