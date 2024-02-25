const { accessUrl, dndFromTo } = require('../service/use-puppet');
const { extractInnerHTML } = require('../utils/my-puppet');

const testURL = 'http://tedi.jinhakapply.com/A?univServiceId=999801&test=true';

describe('에디터 테스트 3차', () => {
  test('8. 스타일 기적용 되어있는 엘리먼트 안을 드래그 하여, 동일 스타일 토글 시킬 때', async () => {
    const { page } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    await page.waitForSelector(targetSelector);
    const dragText = await dndFromTo(page, targetSelector, 70, 150);
    await page.waitForSelector('.b_menu_bold1');
    await page.click('.b_menu_bold1');
    const boldTextOrigin = extractInnerHTML(page, targetSelector);

    // 클릭 한번으로 selection 초기화
    await page.click(targetSelector);

    const dragTextAfterToggle = await dndFromTo(page, targetSelector, 90, 120);
    await page.waitForSelector('.b_menu_bold1');
    await page.click('.b_menu_bold1');
  });
  test.skip(
    '9. 스타일 기적용 되어 있는 태그를 앞뒤로 감싸서 스타일 적용 시켰을 때 연장되는지',
  );
  test.skip(
    '10. 다른 스타일 적용되어있는 엘리먼트를 드래그해서 둘 중 하나를 토글 시키는 경우',
  );
});
