// log.js
// 로그를 좀더 형형색색으로 찍어,
// fail, error, pass 를 구분하여 로그를 찍어준다.

const chalk = require('chalk');
const logger = require('./logger');

/**
 * 단순 로그 찍기
 */
function simpleLog(type, message) {
  logger.info(message);
  console.log(
    chalk.bgCyanBright.bold(` ${type} LOG :`) +
      ' ' +
      chalk.underline.cyanBright(message) +
      '\n',
  );
}

/**
 * skipLog
 */
function skipLog(message) {
  logger.info(message);
  console.log(
    chalk.bgWhite.bold(' SKIP :') + ' ' + chalk.underline.gray(message) + '\n',
  );
}

/**
 * 테스트 설명 로그
 * @param {string} message
 */
function descriptionLog(message) {
  logger.info(message);

  console.log(
    chalk.blackBright('====================================================='),
  );
  console.log(
    chalk.bgYellowBright.bold(' TEST :') +
      ' ' +
      chalk.underline.yellowBright(message) +
      '\n',
  );
}

/**
 * 테스트 실패 시 로그
 * @param {error} e
 */
function errLog(e) {
  logger.error(e.message);

  console.log(chalk.magentaBright(e.stack));
}

/**
 * 테스트 FAIL 시 로그
 * @param {string} message
 */
function failLog(message) {
  logger.error(message);
  console.log(
    chalk.bgRedBright.bold(' FAIL :') +
      ' ' +
      chalk.underline.red(message) +
      '\n',
  );
}

function warningLog(message) {
  logger.info(message);
  console.log(
    chalk.bgWhiteBright.bold(' WARN :') +
      ' ' +
      chalk.underline.whiteBright(message) +
      '\n',
  );
}

/**
 * 테스트 성공 로그
 * @param {string} message
 */
function passLog(message) {
  logger.info(message);
  console.log(
    chalk.bgGreenBright.bold(' PASS :') +
      ' ' +
      chalk.underline.greenBright(message) +
      '\n',
  );
}

function startTestLog(testName) {
  logger.info(testName);
  console.log(
    chalk.blueBright('\n--------------------------------') +
      chalk.bgBlueBright.bold(`:: START ${testName} TEST ::`) +
      chalk.blueBright('--------------------------------\n'),
  );
}

function endTestLog(testName) {
  logger.info(testName);
  console.log(
    chalk.blueBright('\n--------------------------------') +
      chalk.bgBlueBright.bold(`:: END ${testName} TEST ::`) +
      chalk.blueBright('--------------------------------\n'),
  );
}

module.exports = {
  errLog,
  passLog,
  failLog,
  skipLog,
  descriptionLog,
  startTestLog,
  endTestLog,
  simpleLog,
  warningLog,
};
