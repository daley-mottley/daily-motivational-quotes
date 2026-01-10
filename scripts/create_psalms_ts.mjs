
import fs from 'fs';
import path from 'path';

const jsonPath = path.resolve(process.cwd(), 'src/data/psalms-en.json');
const tsPath = path.resolve(process.cwd(), 'src/data/psalms-en.ts');

const psalms = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const fileContent = `
import { Quote } from '../data/quotes';

export const data: Quote[] = ${JSON.stringify(psalms, null, 2)};
`.trim();

fs.writeFileSync(tsPath, fileContent);
console.log(`Successfully created ${tsPath}`);
