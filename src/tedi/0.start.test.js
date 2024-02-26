const { testURL } = require('../service/setting');
const { accessUrl } = require('../service/use-puppet');

describe('시작 테스트 ', () => {
  let page;
  let status;
  let browser;

  beforeAll('준비', async () => {
    const { page: p, status: s, browser: b } = await accessUrl(testURL);
    page = p;
    status = s;
    browser = b;
  });

  test('접근 테스트 ', async () => {
    expect(status).toBe(true);
  });
  test('렌더링 테스트 ', async () => {
    // header 잘 나오는지
    await expectPage(page).toContainElement('.tedi_header');

    // sidebar 왼쪽 잘 나오는지
    await expectPage(page).toContainElement(
      '#container > div > div:nth-child(1) > nav > ul > li > strong',
    );

    // wingbanner 잘 나오는지
    await expectPage(page).toContainElement(
      '#container > div > div:nth-child(3) > nav > button.btn2.st1',
    );
  });

  test('헤더의 동의 버튼 클릭 시 페이지 이동 되는지', async () => {
    await page.waitForSelector(
      '#top > header > div > div.page_switch_btns > button:nth-child(2)',
    );
    await page.click(
      '#top > header > div > div.page_switch_btns > button:nth-child(2)',
    );
    await expectPage(page).toHavePath('/T');
  });

  test('헤더의 유의사항 버튼 클릭 시 페이지 이동 되는지', async () => {
    await page.waitForSelector(
      '#top > header > div > div.page_switch_btns > button:nth-child(1)',
    );
    await page.click(
      '#top > header > div > div.page_switch_btns > button:nth-child(1)',
    );
    await expectPage(page).toHavePath('/A');
  });

  afterAll('종료', async () => {
    await browser.close();
  });
});
