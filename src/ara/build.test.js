const { accessUrl } = require('../service/use-puppet');
const { wait } = require('../utils/my-puppet');
const { builderTestCase, builderTest } = require('./builderType');

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
    const { index, containTag, text } = builderTestCase['텍스트'];
    const { textValue, contains } = await builderTest(page, index, containTag);
    expect(textValue).toBe(text);
    expect(contains).toBe(true);
  });
  test('"제목(대)" 클릭 시 최하단에 대제목이 추가된다.', async () => {
    const { index, containTag, text } = builderTestCase['제목(대)'];
    const { textValue, contains } = await builderTest(page, index, containTag);
    expect(textValue).toBe(text);
    expect(contains).toBe(true);
  });
  test('"제목(소)" 클릭 시 최하단에 소제목이 추가된다.', async () => {
    const { index, containTag, text } = builderTestCase['제목(소)'];
    const { textValue, contains } = await builderTest(page, index, containTag);
    expect(textValue).toBe(text);
    expect(contains).toBe(true);
  });
  test('"표" 클릭 시 최하단에 표가 추가된다.', async () => {
    const { index, containTag, text } = builderTestCase['표'];
    const { contains } = await builderTest(page, index, containTag);
    expect(contains).toBe(true);
  });
  test('"날짜" 클릭 시 최하단에 날짜가 추가된다.', async () => {
    const { index, containTag } = builderTestCase['날짜'];
    const { contains } = await builderTest(page, index, containTag);
    expect(contains).toBe(true);
  });
  test.skip("'이미지'를 선택하면 최하단에 이미지가 추가된다.", async () => {});
  test("'주관식항목' 을 선택하면 최하단에 주관식항목이 추가된다.", async () => {});
  test("'객관식항목' 을 선택하면 최하단에 객관식항목이 추가된다.");
  test("'이름' 을 선택하면 최하단에 이름이 추가된다.");
  test("'연락처' 를 선택하면 최하단에 연락처가 추가된다.");
  test("'이메일'를 선택하면 최하단에 이메일이 추가된다.");
  test("'생년월일'을 선택하면 최하단에 생년월일이 추가된다.");
  test("'출신고교'를 선택하면 최하단에 출신고교가 추가된다.");
  test("'성별'을 선택하면 최하단에 성별이 추가된다.");
  test("'주소'를 선택하면 최하단에 주소가 추가된다.");
  test("'버튼항목'을 선택하면 최하단에 체크박스항목이 추가된다.");
});
