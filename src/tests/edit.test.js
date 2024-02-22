const {
  accessUrl,
  dndSameElement,
  dndDifferentElement,
} = require('../service/puppet');

describe('에디터 테스트 ', () => {
  let page;
  let status;
  let browser;
  // beforeAll('드래그 & 드랍 시작', async () => {
  //   const {
  //     page: p,
  //     status: s,
  //     browser: b,
  //   } = await accessUrl('http://tedi.jinhakapply.com/');
  //   page = p;
  //   status = s;
  //   browser = b;
  // });
  // test('드래그 & 드랍 테스트 ', async () => {
  //   await page.waitForSelector(
  //     '#container > div > div.core > div > div:nth-child(1) > section > div.list_schedule_flex.col3 > div:nth-child(1) > div.note > ul',
  //   );
  //   await dragAndDrop(
  //     page,
  //     '#container > div > div.core > div > div:nth-child(1) > section > div.list_schedule_flex.col3 > div:nth-child(1) > div.note > ul > li:nth-child(2)',
  //     '#container > div > div.core > div > div:nth-child(1) > section > div.list_schedule_flex.col3 > div:nth-child(1) > div.note > ul > li:nth-child(3)',
  //   );
  // });
  test('볼드 테스트 ', async () => {
    const { page } = await accessUrl('http://tedi.jinhakapply.com/');
    await page.waitForSelector(
      '#container > div > div.core > div > div:nth-child(1) > section > div.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(3)',
    );

    await dndDifferentElement(
      page,
      '#container > div > div.core > div > div:nth-child(1) > section > div.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)',
      '#container > div > div.core > div > div:nth-child(1) > section > div.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(3)',
    );
    // await page.waitForSelector('.b_menu_bold1');
    // await page.click('.b_menu_bold1');
  });
});
