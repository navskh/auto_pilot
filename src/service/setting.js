const setting = {
  headless: false,
  args: [
    '--window-size=1920,1080',
    '--disable-notifications',
    '--disable-features=site-per-process',
    '--disable-web-security',
  ],
  slowMo: false,
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
};
const viewPort = { width: 1900, height: 1000 };

const testURL =
  process.env.PATH_ENV === 'local'
    ? 'http://localhost:3000/A?univServiceId=999801&test=true'
    : 'http://tedi.jinhakapply.com/A?univServiceId=999999&test=true';

const araURL = 'https://ara.apply.kr';

module.exports = { setting, viewPort, testURL, araURL };
