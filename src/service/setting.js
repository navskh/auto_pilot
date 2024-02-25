const setting = {
  headless: false,
  args: [
    '--window-size=1920,1080',
    '--disable-notifications',
    '--disable-features=site-per-process',
    '--disable-web-security',
  ],
  slowMo: false,
};
const viewPort = { width: 1900, height: 1000 };

module.exports = { setting, viewPort };
