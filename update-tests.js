import fs from 'fs';
import path from 'path';

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.spec.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const helperPath = path.join(process.cwd(), 'tests', 'helpers', 'testWithCoverage.js');
      let relativePath = path.relative(path.dirname(fullPath), helperPath).replace(/\\/g, '/');
      if (!relativePath.startsWith('.')) relativePath = './' + relativePath;

      if (content.includes('@playwright/test')) {
         content = content.replace(/from\s+['"]@playwright\/test['"]/g, `from '${relativePath}'`);
         fs.writeFileSync(fullPath, content);
      }
    }
  }
}
walk('./tests');
console.log('Test files updated to use coverage helper!');
