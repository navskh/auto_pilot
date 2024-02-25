function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function extractInnerHTML(page, selector) {
  return page.evaluate(selector => {
    const element = document.querySelector(selector);
    return element.innerHTML;
  }, selector);
}

module.exports = { wait, extractInnerHTML };
