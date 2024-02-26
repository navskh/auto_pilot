async function builderTest(page, index, containTag) {
  const layer = await page.$('.side-panel.open');
  const sidebarItem = await layer.$(
    `#root > div > div.contents > div.side-panel.open > ul:nth-child(3) > li:nth-child(${index})`,
  );
  await sidebarItem.click();
  const elements = await page.$$('.form'); // 클래스 이름으로 모든 엘리먼트 선택
  const lastElement = elements[elements.length - 1]; // 마지막 엘리먼트 선택

  const textValue = await lastElement.evaluate(node => node.textContent);
  const contains = await lastElement.evaluate((element, containTag) => {
    return element.querySelector(containTag) !== null;
  }, containTag);

  return { textValue, contains };
}

const builderTestCase = {
  텍스트: {
    index: 1,
    containTag: 'div',
    text: '텍스트 영역',
  },
  '제목(대)': {
    index: 2,
    containTag: 'h1',
    text: '대제목 영역',
  },
  '제목(소)': {
    index: 3,
    containTag: 'h3',
    text: '소제목 영역',
  },
  표: {
    index: 4,
    containTag: 'table',
  },
  날짜: {
    index: 5,
    containTag: '[type=date]',
  },
  이미지: {
    index: 6,
    containTag: 'img',
  },
  주관식항목: {
    index: 7,
    containTag: 'input',
  },
};

module.exports = { builderTest, builderTestCase };
