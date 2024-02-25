const { accessUrl } = require('../service/use-puppet');
const { wait } = require('../utils/my-puppet');

describe('폼 생성 테스트', () => {
  let page = null;
  let status = null;
  let browser = null;
  beforeAll('테스트 시작 전', async () => {
    const {
      status: s,
      browser: b,
      page: p,
    } = await accessUrl('http://localhost:3000');
    page = p;
    status = s;
    browser = b;
    // 버튼 클릭 해두면 없어지지 않음
    await page.click('.btn1');
    // 나올 때까지 3초정도는 기다려야 함.
    await wait(700);
  });
  test('"텍스트" 선택 시 최하단에 텍스트 컴포넌트가 추가된다.', async () => {
    const layer = await page.$('.side-panel.open');
    const textBtn = await layer.$('.layer-item-name');
    await textBtn.click();
    const elements = await page.$$('.form'); // 클래스 이름으로 모든 엘리먼트 선택
    const lastElement = elements[elements.length - 1]; // 마지막 엘리먼트 선택
    const textValue = await lastElement.evaluate(node => node.textContent);
    const nodeType = await lastElement.evaluate(node => node.nodeName);
    expect(textValue).toBe('텍스트 영역');
    expect(nodeType).toBe('DIV');
  });
  test('"제목(대)" 클릭 시 최하단에 대제목이 추가된다.', async () => {
    const layer = await page.$('.side-panel.open');
    const titleBtn = await layer.$(
      '#root > div > div.contents > div.side-panel.open > ul:nth-child(3) > li:nth-child(2)',
    );
    await titleBtn.click();
    const elements = await page.$$('.form'); // 클래스 이름으로 모든 엘리먼트 선택
    const lastElement = elements[elements.length - 1]; // 마지막 엘리먼트 선택
    const textValue = await lastElement.evaluate(node => node.textContent);
    const containsH1 = await lastElement.evaluate(element => {
      return element.querySelector('h1') !== null;
    });
    expect(textValue).toBe('대제목 영역');
    expect(containsH1).toBe(true);
  });
  test('"제목(소)" 클릭 시 최하단에 소제목이 추가된다.', async () => {
    const layer = await page.$('.side-panel.open');
    const titleBtn = await layer.$(
      '#root > div > div.contents > div.side-panel.open > ul:nth-child(3) > li:nth-child(3)',
    );
    await titleBtn.click();
    const elements = await page.$$('.form'); // 클래스 이름으로 모든 엘리먼트 선택
    const lastElement = elements[elements.length - 1]; // 마지막 엘리먼트 선택
    const textValue = await lastElement.evaluate(node => node.textContent);
    const containsH3 = await lastElement.evaluate(element => {
      return element.querySelector('h3') !== null;
    });
    expect(textValue).toBe('소제목 영역');
    expect(containsH3).toBe(true);
  });
  test('"표" 클릭 시 최하단에 표가 추가된다.', async () => {
    const layer = await page.$('.side-panel.open');
    const titleBtn = await layer.$(
      '#root > div > div.contents > div.side-panel.open > ul:nth-child(3) > li:nth-child(4)',
    );
    await titleBtn.click();
    const elements = await page.$$('.form'); // 클래스 이름으로 모든 엘리먼트 선택
    const lastElement = elements[elements.length - 1]; // 마지막 엘리먼트 선택
    const containTable = await lastElement.evaluate(element => {
      return element.querySelector('table') !== null;
    });
    expect(containTable).toBe(true);
  });
  test('"날짜" 클릭 시 최하단에 날짜가 추가된다.', async () => {
    const layer = await page.$('.side-panel.open');
    const titleBtn = await layer.$(
      '#root > div > div.contents > div.side-panel.open > ul:nth-child(3) > li:nth-child(5)',
    );
    await titleBtn.click();
    const elements = await page.$$('.form'); // 클래스 이름으로 모든 엘리먼트 선택
    const lastElement = elements[elements.length - 1]; // 마지막 엘리먼트 선택
    const containTable = await lastElement.evaluate(element => {
      return element.querySelector('table') !== null;
    });
    expect(containTable).toBe(true);
  });
});
