require('./utils/my-jest');

// index.js
import('./run.mjs')
  .then(async module => {
    // module 사용
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'stack') {
      await module.default['runStacks']();
    } else {
      await module.default['runTests']();
    }
  })
  .then(() => {
    testResultPrint();
  })
  .catch(err => console.error(err));
