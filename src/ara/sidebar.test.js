const { araURL } = require('../service/setting');
const { accessUrl } = require('../service/use-puppet');
const { wait } = require('../utils/my-puppet');

describe('폼 생성 테스트', () => {
  let page = null;
  let status = null;
  let browser = null;
  beforeAll('테스트 시작 전', async () => {
    const { status: s, browser: b, page: p } = await accessUrl(araURL);
    page = p;
    status = s;
    browser = b;
  });
  test('"이미지" 선택 시 최하단에 이미지 컴포넌트가 추가된다.', async () => {
    const sidebarAddButton = await page.$('div.add > a');
    await sidebarAddButton.click();
    await wait(700);

    const addSelectLayer = await page.$('div.add_select1');
    const thisItem = await addSelectLayer.$('div.add_select1 a.ic_img');
    await thisItem.click();

    // 맨 마지막 컴포넌트가 이미지 컴포넌트인지 가져온다.
    const formComponents = await page.$$('div.form_cell.agree1');
    const lastFormComponent = formComponents[formComponents.length - 1];
    const lastFormContents = await lastFormComponent.$(
      'div.form_cell_cont > div.cell_box.register_images',
    );
    const imagesMsg = await lastFormContents.$eval('p.images_msg', node =>
      node.textContent.trim(),
    );
    const explain = await lastFormContents.$eval('p.explain', node =>
      node.textContent.trim(),
    );

    expect(imagesMsg).toBe('파일을 선택하거나 드래그 앤 드랍 해 주세요.');
    expect(explain).toBe('최대 크기 : 10MB, 지원파일: JPG, JPEG, PNG');
  });
  test('"텍스트 박스" 선택 시 최하단에 텍스트 박스 컴포넌트가 추가된다.', async () => {
    const sidebarAddButton = await page.$('div.add > a');
    await sidebarAddButton.click();
    await wait(700);

    const addSelectLayer = await page.$('div.add_select1');
    const thisItem = await addSelectLayer.$('div.add_select1 a.ic_text');
    await thisItem.click();

    // 맨 마지막 컴포넌트가 텍스트박스 컴포넌트인지 가져온다.
    const formComponents = await page.$$('div.form_cell.agree1');
    const lastFormComponent = formComponents[formComponents.length - 1];
    const lastFormContents = await lastFormComponent.$(
      'div.form_cell_cont > div.ql-editor',
    );

    const textValue = await lastFormContents.evaluate(node =>
      node.textContent.trim(),
    );

    expect(textValue).toBe('텍스트를 입력해주세요');
  });
});
