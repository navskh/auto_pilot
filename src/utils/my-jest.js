const { Puppeteer, Page } = require('puppeteer');
const {
  errLog,
  failLog,
  passLog,
  descriptionLog,
  skipLog,
} = require('./log.js');
const chalk = require('chalk');

global.totalSuites = 0;
global.totalTests = 0;
global.passedTests = 0;
global.failedTests = 0;
global.skippedTests = 0;

global.tests = [];
global.onlys = [];
global.ready = null;
global.after = null;

function asyncDescriptionLog(message) {
  return new Promise((resolve, reject) => {
    descriptionLog(message);
    resolve();
  });
}

// describe 함수 정의
global.describe = async (description, tests) => {
  totalSuites++;
  await asyncDescriptionLog(description);
  await tests();
};

global.beforeAll = async (description, readyFunc) => {
  const wrappedReady = async () => {
    try {
      await readyFunc();
    } catch (error) {
      errLog(error);
    }
  };

  ready = wrappedReady;
};

global.afterAll = async (description, afterFunc) => {
  const wrappedAfter = async () => {
    try {
      await afterFunc();
    } catch (error) {
      errLog(error);
    }
  };

  after = wrappedAfter;
};

// test 함수 정의
global.test = async (description, testFunction) => {
  const wrappedTest = async () => {
    try {
      await testFunction();
      passedTests++;
      passLog(`✔️ 성공: ${description}`);
    } catch (error) {
      failedTests++;
      failLog(`❌ 실패: ${description}`);
      errLog(error);
    } finally {
      totalTests++;
    }
  };
  tests.push(wrappedTest);
};

test.only = (description, testFunction) => {
  const wrappedTest = async () => {
    try {
      await testFunction();
      passedTests++;
      passLog(`✔️ 성공: ${description}`);
    } catch (error) {
      failedTests++;
      failLog(`❌ 실패: ${description}`);
      errLog(error);
    } finally {
      totalTests++;
    }
  };
  onlys.push(wrappedTest);
};

// .skip 메소드 추가
test.skip = function (description, testFunction) {
  skippedTests++;
  skipLog(`⏭️ 건너뜀: ${description}`);
};

let currentTestPromise = Promise.resolve();

global.runAllTest = async () => {
  const testToRun =
    onlys.length > 0 ? [ready, ...onlys, after] : [ready, ...tests, after];
  await Promise.all(
    testToRun.map(test => {
      return (currentTestPromise = currentTestPromise.then(test));
    }),
  );
};

global.testResultPrint = async () => {
  console.log(
    chalk.blueBright('--------------------------------') +
      chalk.bgBlueBright.bold(`:: 테스트 결과 출력 ::`) +
      chalk.blueBright('--------------------------------'),
  );
  console.log(
    chalk.bgCyanBright.bold(' Total Test Suites ') +
      chalk.cyanBright(' : ' + global.totalSuites),
  );
  console.log(
    chalk.bgCyanBright.bold(' Total Test ') +
      chalk.cyanBright(' : ' + global.totalTests) +
      '\n',
  );
  console.log(
    chalk.bgGreenBright.bold(' PASS ') +
      chalk.greenBright(' : ' + global.passedTests),
  );
  console.log(
    chalk.bgYellowBright.bold(' SKIP ') +
      chalk.yellowBright(' : ' + global.skippedTests),
  );
  console.log(
    chalk.bgRedBright.bold(' FAIL ') +
      chalk.redBright(' : ' + global.failedTests),
  );
  console.log(
    chalk.blueBright('--------------------------------') +
      chalk.bgBlueBright.bold(`:: 테스트 결과 출력 ::`) +
      chalk.blueBright('--------------------------------'),
  );
};

global.expect = value => {
  return {
    toBe: expected => {
      if (value !== expected) {
        throw new Error(
          `예상 값 ${expected}이(가) 실제 값 ${value}와(과) 다릅니다.`,
        );
      }
    },
    toEqual: expected => {
      if (JSON.stringify(value) !== JSON.stringify(expected)) {
        throw new Error(`예상 값 ${expected}, 실제 값 ${value}`);
      }
    },
    toBeTruthy: () => {
      if (!value) {
        throw new Error(`예상 값은 "truthy", 실제 값 ${value}`);
      }
    },
    toBeFalsy: () => {
      if (value) {
        throw new Error(`예상 값은 "falsy", 실제 값 ${value}`);
      }
    },
    toContain: element => {
      if (!value.includes(element)) {
        throw new Error(
          `배열 ${value}에 요소 ${element}가 포함되어 있지 않습니다.`,
        );
      }
    },
    toContainString: expectedSubstring => {
      if (!value.includes(expectedSubstring)) {
        throw new Error(
          `"${value}"에는 "${expectedSubstring}" 문자열이 포함되어 있지 않습니다.`,
        );
      }
    },
    toBeNull: () => {
      if (value !== null) {
        throw new Error(`예상 값은 null이지만, 실제 값은 ${value}입니다.`);
      }
    },
    not: {
      toBeNull: () => {
        if (value === null) {
          throw new Error(`예상 값은 null이 아니지만, 실제 값은 null입니다.`);
        }
      },
      // 다른 not 매처 함수들...
    },
    // 필요에 따라 더 많은 matcher 함수를 추가할 수 있습니다.
  };
};

/**
 *
 * @param {Page} page
 */
global.expectPage = page => {
  return {
    toContainElement: async selector => {
      const element = await page.$(selector);
      if (!element) {
        throw new Error(
          `선택자 ${selector}에 해당하는 엘리먼트가 페이지에 존재하지 않습니다.`,
        );
      }
    },
    toHaveHost: async expectedHost => {
      const currentUrl = new URL(page.url());
      const actualHost = currentUrl.host;
      console.log(actualHost);

      if (actualHost !== expectedHost) {
        throw new Error(
          `현재 호스트(${actualHost})가 기대하는 호스트(${expectedHost})와 다릅니다.`,
        );
      }
    },
    toHavePath: async expectedPath => {
      const currentUrl = new URL(page.url());
      const actualPath = currentUrl.pathname;

      if (actualPath !== expectedPath) {
        throw new Error(
          `현재 경로(${actualPath})가 기대하는 경로(${expectedPath})와 다릅니다.`,
        );
      }
    },

    // 추가적인 매치 함수들을 여기에 구현할 수 있습니다.
  };
};
