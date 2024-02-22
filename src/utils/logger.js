const { createLogger, transports, format } = require('winston');

// console.log(univServiceID);

const currentDate = getCurrentDateTime();
console.log(currentDate, global.serviceName, global.univServiceID);
const logger = createLogger({
  transports: [
    new transports.File({
      filename: `logs/${currentDate}.log`,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:SS ||' }),
        // format.colorize({ all: true }),
        format.printf(
          info => `${info.timestamp} 【${info.level}】 : ${info.message}`,
        ),
      ),
    }),
    new transports.File({
      filename: `error/${currentDate}_error.log`,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:SS ||' }),
        format.printf(
          error => `${error.timestamp} 【${error.level}】 : ${error.message}`,
        ),
      ),
      level: 'error',
    }),
  ],
});

// 현재 날짜와 시간을 가져오는 함수
function getCurrentDateTime() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hours = now.getHours();
  var minutes = now.getMinutes();

  // 날짜와 시간이 한 자리 숫자일 경우 앞에 0을 추가하여 두 자리로 만듭니다.
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  // 날짜와 시간을 문자열로 조합하여 반환합니다.
  return year + '-' + month + '-' + day + '_' + hours + '_' + minutes;
}

module.exports = logger;
