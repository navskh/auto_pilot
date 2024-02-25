const { accessUrl, dndFromTo } = require('../service/use-puppet');
const { removeAndCombine } = require('../utils/combine');

const testURL = 'http://tedi.jinhakapply.com/A?univServiceId=999999&test=true';

describe('에디터 테스트 2차', () => {
  let page;
  let status;
  let browser;
  test('5-1. 삼중첩 스타일 Injection ', async () => {
    const { status: s, browser: b, page: p } = await accessUrl(testURL);
    page = p;
    status = s;
    browser = b;

    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    await page.waitForSelector(targetSelector, { timeout: 10000 });

    await dndFromTo(page, targetSelector, 100, 200);
    await page.waitForSelector('.b_menu_bold1', { timeout: 1000 });
    await page.click('.b_menu_bold1', { timeout: 10000 });
    await dndFromTo(page, targetSelector, 150, 250);
    await page.waitForSelector('.b_menu_italic1', { timeout: 1000 });
    await page.click('.b_menu_italic1', { timeout: 1000 });
    const dragText = await dndFromTo(page, targetSelector, 50, 260);
    await page.waitForSelector('.b_menu_underline1', { timeout: 1000 });
    await page.click('.b_menu_underline1', { timeout: 1000 });

    // bold, italic, underline 처리 된 텍스트를 가져옴
    const styledText = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const styledList = element.querySelectorAll('span.underline');
      let styledText = '';
      styledList.forEach(styled => {
        styledText += styled.innerHTML;
      });
      return styledText;
    }, targetSelector);

    expect(dragText).toEqual(styledText);
  });
  test('5-2. 삼중첩에 토글 적용 ', async () => {
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    await dndFromTo(page, targetSelector, 50, 260);
    await page.waitForSelector('.b_menu_underline1', { timeout: 1000 });
    await page.click('.b_menu_underline1', { timeout: 1000 });

    // bold, italic, underline 처리 된 텍스트를 가져옴
    const styledText = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const styledList = element.querySelectorAll('span.underline');
      if (styledList.length === 0) {
        return null;
      }
      let styledText = '';
      styledList.forEach(styled => {
        styledText += styled.innerHTML;
      });
      return styledText;
    }, targetSelector);

    expect(styledText).toBeNull();
  });
  test('6. 스타일 연장 테스트 ', async () => {
    const { page } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    await dndFromTo(page, targetSelector, 50, 150);
    await page.waitForSelector('.b_menu_underline1', { timeout: 1000 });
    await page.click('.b_menu_underline1', { timeout: 1000 });

    // bold, italic, underline 처리 된 텍스트를 가져옴
    const styledText = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const styledList = element.querySelectorAll('span.underline');
      let styledText = '';
      styledList.forEach(styled => {
        styledText += styled.innerHTML;
      });
      return styledText;
    }, targetSelector);

    const dragText2 = await dndFromTo(page, targetSelector, 100, 250);
    await page.waitForSelector('.b_menu_underline1', { timeout: 1000 });
    await page.click('.b_menu_underline1', { timeout: 1000 });

    // bold, italic, underline 처리 된 텍스트를 가져옴
    const styledText2 = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const styledList = element.querySelectorAll('span.underline');
      if (styledList.length === 0) {
        return null;
      }
      let styledText = '';
      styledList.forEach(styled => {
        styledText += styled.innerHTML;
      });
      return styledText;
    }, targetSelector);
    // styledText와 dragText2 에서 같이 포함된 부분을 빼줘야 함.
    const combineText = removeAndCombine(styledText, dragText2);
    expect(combineText).toEqual(styledText2);
  });

  afterAll('종료', async () => {
    await browser.close();
  });
});
