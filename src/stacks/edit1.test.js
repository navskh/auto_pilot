const {
  accessUrl,
  dndSameElement,
  dndFromTo,
} = require('../service/use-puppet');
const { wait } = require('../utils/my-puppet');

const testURL = 'http://tedi.jinhakapply.com/A?univServiceId=999999&test=true';

describe('에디터 테스트 1차', () => {
  let page;
  let status;
  let browser;
  test('1. 드래그 드랍이 되는지 확인', async () => {
    const { status: s, browser: b, page: p } = await accessUrl(testURL);
    page = p;
    status = s;
    browser = b;

    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';

    const dragText = await dndSameElement(page, targetSelector, 100);
    expect(dragText).not.toBeNull();
  });
  test('2. 하나의 엘리먼트에서 볼드 처리 되는지 확인', async () => {
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(2)';
    await page.waitForSelector(targetSelector);

    const dragText = await dndSameElement(page, targetSelector, 200);
    await page.waitForSelector('.b_menu_bold1');
    await page.click('.b_menu_bold1');

    //dragText 가 실제 bold 처리가 잘 되는지 확인할 것
    // bold 처리 된 텍스트를 가져옴
    const boldText = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const boldText = element.querySelector('span.font_bold');

      return boldText.innerHTML;
    }, targetSelector);

    expect(dragText).toEqual(boldText);
  });
  test('3. 이미 스타일 매겨져 있는 곳에 다시 스타일 적용 시 toggle 되는지 확인', async () => {
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(2)';
    await page.waitForSelector(targetSelector);
    // 일단 한번 클릭해두고
    await page.click(targetSelector);

    await dndSameElement(page, targetSelector, 200);
    await page.waitForSelector('.b_menu_bold1');
    await page.click('.b_menu_bold1');

    //dragText 가 실제 bold 처리가 잘 되는지 확인할 것
    //bold 처리 된 텍스트를 가져옴
    const boldText = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const boldText = element.querySelector('span.font_bold');

      return boldText ? boldText.innerHTML : null;
    }, targetSelector);

    expect(boldText).toBeNull();
  });
  test('4. 스타일 이미 있는 곳 중간 ~ 스타일 없는 곳까지 적용 시 중첩 되는지', async () => {
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(2)';
    await page.waitForSelector(targetSelector);
    // 일단 한번 클릭해두고
    await page.click(targetSelector);

    await dndSameElement(page, targetSelector, 200);
    await page.waitForSelector('.b_menu_bold1');
    await page.click('.b_menu_bold1');

    await wait(500);
    const dragText = await dndFromTo(page, targetSelector, 100, 300);
    await page.waitForSelector('.b_menu_italic1');
    await page.click('.b_menu_italic1');

    //dragText 가 실제 bold 처리가 잘 되는지 확인할 것
    //bold 처리 된 텍스트를 가져옴
    const italicText = await page.evaluate(selector => {
      const element = document.querySelector(selector);
      const italicList = element.querySelectorAll('span.italic');
      let italicText = '';
      italicList.forEach(text => {
        italicText += text.innerHTML;
      });
      return italicText;
    }, targetSelector);

    expect(dragText).toBe(italicText);
  });

  afterAll('종료', async () => {
    await browser.close();
  });
});
