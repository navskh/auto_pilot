const { accessUrl, dndDifferentElement } = require('../service/use-puppet');
const { getParentHTML } = require('../utils/my-puppet');
const testURL = 'http://tedi.jinhakapply.com/A?univServiceId=999999&test=true';
describe('에디터 테스트 4차', () => {
  test.skip('11. 다른 엘리먼트를 넘어서 볼드 테스트 ', async () => {
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

  test('12. 다른 리스트 간에 스타일 매겨져 있는 부분들을 드래그 해서 충돌내면 반영되는지 확인', async () => {
    const { page } = await accessUrl(testURL);
    const dragTargetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    const dragTargetSelector2 =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(2)';
    const dropTargetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(3)';
    await page.waitForSelector(dragTargetSelector);
    await page.waitForSelector(dropTargetSelector);

    await dndDifferentElement(page, dragTargetSelector, dropTargetSelector);

    await page.waitForSelector('.b_menu_bold1');
    await page.click('.b_menu_bold1');

    await getParentHTML(page, dropTargetSelector);
    const dragText2 = await dndDifferentElement(
      page,
      dragTargetSelector2,
      dropTargetSelector,
      100,
    );
    await page.waitForSelector('.b_menu_bold1');
    await page.click('.b_menu_bold1');

    console.log('dragText2,', dragText2);

    //dragText 가 실제 bold 처리가 잘 되는지 확인할 것
    // bold 처리 된 텍스트를 가져옴
    const parentElement = await getParentHTML(page, dropTargetSelector);

    const expectedText = `<li>전형료 10,000원 결<span class="font_bold">제(인터넷 접수료 별도)</span></li>
    <li><span class="font_bold">전형료 10,000원 결제(인터넷 접수료 </span>별도)</li>
    <li>전형료 10,000원 결제(인터넷 접수료 별도)</li>`;

    expect(parentElement).toBe(expectedText);
  });
  test.skip(
    '13. 스타일 매겨져 있는 곳에 그대로 다른 스타일 매길 시 제대로 들어가는 지 확인',
  );
  test.skip('14. 링크를 매겼을 때 잘 매겨지는 지 확인');
});
