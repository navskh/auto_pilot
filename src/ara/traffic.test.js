const { default: puppeteer } = require('puppeteer');
const { accessUrl } = require('../service/use-puppet');
const { setting, viewPort } = require('../service/setting');
const {
  sampleApplyDataArray,
  sampleApplyDataArray2,
} = require('../utils/mock');

describe('최초 테스트', () => {
  let browser = null;

  test('선착순 테스트', async () => {
    // Puppeteer 브라우저 인스턴스 생성
    const url = 'https://apply.kr/service/O0SGTM';
    const agreeSelector =
      '#agree_15 > div.form_cell_cont > div > div.cell_check1 > label';

    const rankedSelector =
      '#rankedSelect_17 > div.form_cell_cont > div > div:nth-child(1) > label';

    const submitBtnSelector = 'button[type="submit"]';

    // 테스트 데이터는 20개만 사용
    const sampleData = sampleApplyDataArray.concat(sampleApplyDataArray2);

    // 여러 페이지를 동시에 처리
    const browserPromise = sampleData.map(async (data, index) => {
      const browser = await puppeteer.launch(setting);

      const page = await browser.newPage();
      await page.setViewport(viewPort);
      await page.goto(url);

      // applyName과 email 입력
      await page.waitForSelector('input[name="applyName"]');
      await page.type('input[name="applyName"]', data.applyName);
      await page.waitForSelector('input[name="email"]');
      await page.type('input[name="email"]', data.email);

      // 약관 동의 및 순위 선택
      await page.waitForSelector(agreeSelector);
      await page.click(agreeSelector);
      await page.waitForSelector(rankedSelector);
      await page.click(rankedSelector);

      // 신청하기 버튼 클릭

      await page.waitForSelector(submitBtnSelector);
      await page.click(submitBtnSelector);
      await page.waitForTimeout(1000);
      await browser.close();
    });

    // 모든 페이지 작업 완료될 때까지 기다림
    await Promise.all(browserPromise);

    // 테스트가 완료된 후 브라우저 종료
  });
});
