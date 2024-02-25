const { accessUrl, dndDifferentElement } = require('../service/use-puppet');
const testURL = 'http://tedi.jinhakapply.com/A?univServiceId=999801&test=true';
describe('에디터 테스트 4차', () => {
  test('11. 다른 엘리먼트를 넘어서 볼드 테스트 ', async () => {
    const { page } = await accessUrl(testURL);
    const dragTargetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    const dropTargetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(3)';
    await page.waitForSelector(dragTargetSelector);
    await page.waitForSelector(dropTargetSelector);

    const dragText = await dndDifferentElement(
      page,
      dragTargetSelector,
      dropTargetSelector,
    );

    await page.waitForSelector('.b_menu_bold1');
    await page.click('.b_menu_bold1');

    //dragText 가 실제 bold 처리가 잘 되는지 확인할 것
    // bold 처리 된 텍스트를 가져옴
    const boldText = await page.evaluate(selector => {
      const element = document.querySelector(selector).parentElement;
      const boldTextList = element.querySelectorAll('span.font_bold');
      let boldText = '';
      boldTextList.forEach(text => {
        boldText += text.innerHTML;
      });

      return boldText.trim().replace(/\n/g, '');
    }, dropTargetSelector);

    expect(dragText).toBe(boldText);
  });

  test(
    '12. 다른 리스트 간에 스타일 매겨져 있는 부분들을 드래그 해서 충돌내면 반영되는지 확인',
  );
  test(
    '13. 스타일 매겨져 있는 곳에 그대로 다른 스타일 매길 시 제대로 들어가는 지 확인',
  );
  test('14. 링크를 매겼을 때 잘 매겨지는 지 확인');
  test('15. 모든 스타일 잘 들어가는지 확인 (기본) ');
});
