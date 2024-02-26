import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 현재 파일의 절대 경로를 얻음
const __filename = fileURLToPath(import.meta.url);

// __filename에서 디렉토리 경로를 얻음
const __dirname = path.dirname(__filename);

// 이제 __dirname을 사용하여 tests 디렉토리의 절대 경로를 구할 수 있음

// tests 폴더 내의 모든 .test.js 파일을 가져오는 함수
function getTestFiles(dir) {
  let files = [];
  console.log('dir:', dir);

  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      files = [...files, ...getTestFiles(filePath)];
    } else if (file.endsWith('.test.js')) {
      files.push(filePath);
    }
  });

  return files;
}

// tests 폴더에서 .test.js 파일을 가져와 실행
async function runTests() {
  const dir = process.env.NODE_ENV ?? 'tests';
  const testDir = path.join(__dirname, dir);
  const testFiles = getTestFiles(testDir);

  for (const file of testFiles) {
    console.log(`실행 중: ${file}`);
    await import(path.resolve(file));
    await runAllTest();
    tests = [];
    onlys = [];
  }
}

export default { runTests };
