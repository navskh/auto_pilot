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

module.exports = { removeAndCombine, findLongestCommonSubstring };
