function combine(str1, str2) {
  let minLength = Math.min(str1.length, str2.length);
  let commonIndex = 0;

  // 공통된 부분 찾기
  for (let i = 0; i < minLength; i++) {
    if (str1[i] !== str2[i]) {
      commonIndex = i;
      break;
    }
    if (i === minLength - 1) {
      commonIndex = minLength;
    }
  }

  // 공통된 부분을 제외한 나머지 부분 합치기
  return str1.substring(commonIndex) + str2.substring(commonIndex);
}

function findLongestCommonSubstring(str1, str2) {
  let longestCommon = '';
  let currentCommon = '';

  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      if (str1[i + j] === str2[j]) {
        currentCommon += str2[j];
      } else {
        if (currentCommon.length > longestCommon.length) {
          longestCommon = currentCommon;
        }
        currentCommon = '';
      }
    }
    if (currentCommon.length > longestCommon.length) {
      longestCommon = currentCommon;
    }
    currentCommon = '';
  }
  return longestCommon;
}

function removeAndCombine(str1, str2) {
  const commonSubstring = findLongestCommonSubstring(str1, str2);
  return str1.replace(commonSubstring, '') + str2;
}

module.exports = removeAndCombine;
