import fs from 'fs';

const proverbsData = JSON.parse(fs.readFileSync('Proverbs.json', 'utf8'));

const allProverbs = [];
let idCounter = 1;

proverbsData.chapters.forEach(chapter => {
  chapter.verses.forEach(verse => {
    allProverbs.push({
      id: `proverbs-${idCounter++}`,
      text: verse.text,
      author: `Proverbs ${chapter.chapter}:${verse.verse}`,
      category: 'Proverbs',
    });
  });
});

const content = `import { Quote } from './types';

export const data: Quote[] = ${JSON.stringify(allProverbs, null, 2)};
`;

fs.writeFileSync('src/data/proverbs-en.ts', content, 'utf8');
console.log('Successfully wrote proverbs to src/data/proverbs-en.ts');
