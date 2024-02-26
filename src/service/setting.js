const setting = {
  headless: true,
  args: [
    '--window-size=1920,1080',
    '--disable-notifications',
    '--disable-features=site-per-process',
    '--disable-web-security',
  ],
  slowMo: false,
};
const viewPort = { width: 1900, height: 1000 };

const testURL =
  process.env.PATH_ENV === 'local'
    ? 'http://localhost:3000/A?univServiceId=999801&test=true'
    : 'http://tedi.jinhakapply.com/A?univServiceId=999999&test=true';

module.exports = { setting, viewPort, testURL };
