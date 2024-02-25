const { default: puppeteer } = require('puppeteer');
const { setting, viewPort } = require('./setting');

async function accessUrl(url) {
  // Puppeteer 브라우저 인스턴스 생성
  const browser = await puppeteer.launch(setting);

  // 새 페이지 열기
  const page = await browser.newPage();
  await page.setViewport(viewPort);

  // 주어진 URL로 이동
  const response = await page.goto(url);

  return { status: response.ok(), browser, page };
}

async function dndDifferentElement(
  page,
  selectorDrag,
  selectorDrop,
  xOffset,
  yOffset,
) {
  await page.waitForSelector(selectorDrag);
  await page.waitForSelector(selectorDrop);
  // 드래그할 요소의 위치를 가져옵니다.
  const rectDrag = await page.evaluate(selector => {
    const element = document.querySelector(selector);
    const { top, left, width, height } = element.getBoundingClientRect();
    return { top, left, width, height };
  }, selectorDrag);

  // 드롭할 요소의 위치를 가져옵니다.
  const rectDrop = await page.evaluate(selector => {
    const element = document.querySelector(selector);
    const { top, left, width, height } = element.getBoundingClientRect();
    return { top, left, width, height };
  }, selectorDrop);

  // 드래그 시작 위치로 이동
  const xDragPoint = xOffset
    ? rectDrag.left + rectDrag.width / 2 / 2 + xOffset
    : rectDrag.left + rectDrag.width / 2 / 2;
  const yDragPoint = rectDrag.top + rectDrag.height / 2;
  const xDropPoint = rectDrop.left + rectDrop.width / 2 / 2;
  const yDropPoint = rectDrop.top + rectDrop.height / 2;

  await page.mouse.move(xDragPoint, yDragPoint);

  // 마우스를 누릅니다 (드래그 시작)
  await page.mouse.down();

  // 드롭 위치로 이동
  await page.mouse.move(xDropPoint, yDropPoint);

  // 마우스를 놓습니다 (드롭)
  await page.mouse.up();

  // 드래그 된 text를 가져옵니다.
  const dragText = await page.evaluate(() => {
    const selection = window.getSelection();
    return selection.toString().trim().replace(/\n/g, '');
  });

  return dragText;
}

async function dndSameElement(page, selector, xOffset) {
  await page.waitForSelector(selector);
  // 드래그할 요소의 위치를 가져옵니다.
  const rect = await page.evaluate(selector => {
    const element = document.querySelector(selector);
    const { top, left, width, height } = element.getBoundingClientRect();
    return { top, left, width, height };
  }, selector);

  // 드래그 시작 위치로 이동
  const xDragPoint = rect.left;
  const yDragPoint = rect.top + rect.height / 2;

  // 마우스를 누릅니다 (드래그 시작)
  await page.mouse.move(xDragPoint, yDragPoint);
  await page.mouse.down();

  // 드롭 위치로 이동
  await page.mouse.move(xDragPoint + xOffset, yDragPoint);

  // 마우스를 놓습니다 (드롭)
  await page.mouse.up();

  // 드래그 된 text를 가져옵니다.
  const dragText = await page.evaluate(() => {
    const selection = window.getSelection();
    return selection.toString();
  });

  return dragText;
}

async function dndFromTo(page, selector, startOffset, endOffset) {
  await page.waitForSelector(selector);
  // 드래그할 요소의 위치를 가져옵니다.
  const rect = await page.evaluate(selector => {
    const element = document.querySelector(selector);
    const { top, left, width, height } = element.getBoundingClientRect();
    return { top, left, width, height };
  }, selector);

  // 드래그 시작 위치로 이동
  const xDragPoint = rect.left;
  const yDragPoint = rect.top + rect.height / 2;

  // 마우스를 누릅니다 (드래그 시작)
  await page.mouse.move(xDragPoint + startOffset, yDragPoint);
  await page.mouse.down();

  // 드롭 위치로 이동
  await page.mouse.move(xDragPoint + endOffset, yDragPoint);

  // 마우스를 놓습니다 (드롭)
  await page.mouse.up();

  // 드래그 된 text를 가져옵니다.
  const dragText = await page.evaluate(() => {
    const selection = window.getSelection();
    return selection.toString();
  });

  return dragText;
}

module.exports = { accessUrl, dndDifferentElement, dndSameElement, dndFromTo };
