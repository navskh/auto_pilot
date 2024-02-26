const { testURL } = require('../service/setting');
const {
  accessUrl,
  dndFromTo,
  dndDifferentElement,
} = require('../service/use-puppet');

describe('에디터 테스트 모든 스타일 잘 들어가는지 확인 (기본)', () => {
  test('0-1. 볼드 잘 들어가는지 확인 ', async () => {
    const { page, browser } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';

    const dragText = await setStyle(page, targetSelector, '.b_menu_bold1');

    const styledText = await getStyledText(
      page,
      targetSelector,
      'span.font_bold',
    );
    expect(dragText).toBe(styledText);
    await browser.close();
  });
  test('0-2. 이탤릭 잘 들어가는지 확인 ', async () => {
    const { page, browser } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';

    const dragText = await setStyle(page, targetSelector, '.b_menu_italic1');

    const styledText = await getStyledText(page, targetSelector, 'span.italic');
    expect(dragText).toBe(styledText);
    await browser.close();
  });
  test('0-3. 밑줄 잘 들어가는지 확인 ', async () => {
    const { page, browser } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';

    const dragText = await setStyle(page, targetSelector, '.b_menu_underline1');

    const styledText = await getStyledText(
      page,
      targetSelector,
      'span.underline',
    );
    expect(dragText).toBe(styledText);
    await browser.close();
  });
  test('0-4. 색상(청) 잘 들어가는지 확인 ', async () => {
    const { page, browser } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    const dragText = await dndFromTo(page, targetSelector, 50, 260);

    await page.waitForSelector('.b_menu_color1');
    await page.click('.b_menu_color1');

    await page.waitForSelector('.b_menu_layer.colors .chip1');
    await page.click('.b_menu_layer.colors .chip1');

    const styledText = await getStyledText(
      page,
      targetSelector,
      'span.primary',
    );

    expect(dragText).toBe(styledText);
  });
  test('0-5. 색상(적) 잘 들어가는지 확인 ', async () => {
    const { page, browser } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    const dragText = await dndFromTo(page, targetSelector, 50, 260);

    await page.waitForSelector('.b_menu_color1');
    await page.click('.b_menu_color1');

    await page.waitForSelector('.b_menu_layer.colors .chip2');
    await page.click('.b_menu_layer.colors .chip2');

    const styledText = await getStyledText(
      page,
      targetSelector,
      'span.warning',
    );

    expect(dragText).toBe(styledText);
    await browser.close();
  });
  test('0-6. 색상(검) 잘 들어가는지 확인 ', async () => {
    const { page, browser } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    const dragText = await dndFromTo(page, targetSelector, 50, 260);

    await page.waitForSelector('.b_menu_color1');
    await page.click('.b_menu_color1');

    await page.waitForSelector('.b_menu_layer.colors .chip3');
    await page.click('.b_menu_layer.colors .chip3');

    const styledText = await getStyledText(page, targetSelector, 'span.black');

    expect(dragText).toBe(styledText);
    await browser.close();
  });
  test('0-7. 색상(진회) 잘 들어가는지 확인 ', async () => {
    const { page, browser } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    const dragText = await dndFromTo(page, targetSelector, 50, 260);

    await page.waitForSelector('.b_menu_color1');
    await page.click('.b_menu_color1');

    await page.waitForSelector('.b_menu_layer.colors .chip4');
    await page.click('.b_menu_layer.colors .chip4');

    const styledText = await getStyledText(page, targetSelector, 'span.gray');

    expect(dragText).toBe(styledText);
    await browser.close();
  });
  test('0-8. 색상(연회) 잘 들어가는지 확인 ', async () => {
    const { page, browser } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    const dragText = await dndFromTo(page, targetSelector, 50, 260);

    await page.waitForSelector('.b_menu_color1');
    await page.click('.b_menu_color1');

    await page.waitForSelector('.b_menu_layer.colors .chip5');
    await page.click('.b_menu_layer.colors .chip5');

    const styledText = await getStyledText(
      page,
      targetSelector,
      'span.dim_gray',
    );

    expect(dragText).toBe(styledText);
    await browser.close();
  });
  test('0-9. 리스트 바뀌는지 확인 ', async () => {
    const { page, browser } = await accessUrl(testURL);
    const dragSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    const dropSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(3)';

    await page.waitForSelector(dragSelector);
    await page.waitForSelector(dropSelector);

    await dndDifferentElement(page, dragSelector, dropSelector);

    await page.waitForSelector('.b_menu_list1');
    await page.click('.b_menu_list1');

    await page.waitForSelector('.b_menu_layer .b_menu_hyphen1');
    await page.click('.b_menu_layer .b_menu_hyphen1');

    const listStyle = await page.evaluate(selector => {
      const element = document.querySelector(selector).parentElement;
      return element.className;
    }, dropSelector);

    expect(listStyle).toContainString('list_dash1');
  });
  test('0-10. 링크 적용되는지 확인 ', async () => {
    const { page, browser } = await accessUrl(testURL);
    const targetSelector =
      '.list_schedule_flex.col3 > div:nth-child(2) > div.note > ul > li:nth-child(1)';
    const dragText = await dndFromTo(page, targetSelector, 50, 260);

    await page.waitForSelector('.b_menu_link1');
    await page.click('.b_menu_link1');

    await page.waitForSelector('.b_menu_layer.form1 #bubbleLink');
    await page.click('.b_menu_layer.form1 #bubbleLink');

    await page.keyboard.type('https://www.naver.com');
    await page.keyboard.press('Enter');

    const styledText = await getStyledText(page, targetSelector, 'a');

    expect(dragText).toBe(styledText);
    await browser.close();
  });
});

async function setStyle(page, targetSelector, btnSelector) {
  await page.waitForSelector(targetSelector);
  const dragText = await dndFromTo(page, targetSelector, 50, 260);
  await page.waitForSelector(btnSelector);
  await page.click(btnSelector);
  //dragText 가 실제 style 처리가 잘 되는지 확인할 것
  // style 처리 된 텍스트를 가져옴
  return dragText;
}

async function getStyledText(page, targetSelector, styledSelector) {
  const styledText = await page.evaluate(
    (selector, styledSelector) => {
      const element = document.querySelector(selector).parentElement;
      const boldTextList = element.querySelectorAll(styledSelector);
      let boldText = '';
      boldTextList.forEach(text => {
        boldText += text.innerHTML;
      });

      return boldText.trim().replace(/\n/g, '');
    },
    targetSelector,
    styledSelector,
  );

  return styledText;
}
