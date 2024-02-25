function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function extractInnerHTML(page, selector) {
  return await page.evaluate(selector => {
    const element = document.querySelector(selector);
    return element.innerHTML;
  }, selector);
}

async function extractByClass(page, selector, cssSelector) {
  return await page.evaluate(
    (selector, cssSelector) => {
      const element = document.querySelector(selector);
      const styledList = element.querySelectorAll(cssSelector);
      let styledText = '';
      styledList.forEach(styled => {
        styledText += styled.innerHTML;
      });
      return styledText;
    },
    selector,
    cssSelector,
  );
}

async function getParentHTML(page, selector) {
  return page.evaluate(selector => {
    const element = document.querySelector(selector).parentElement;
    return element.innerHTML;
  }, selector);
}

module.exports = { wait, extractInnerHTML, extractByClass, getParentHTML };
