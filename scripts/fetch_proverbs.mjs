import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function fetchProverbs() {
  const allProverbs = [];
  let idCounter = 1;

  for (let chapter = 1; chapter <= 31; chapter++) {
    const url = `https://www.biblegateway.com/passage/?search=Proverbs%20${chapter}&version=KJV`;
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      $('.text.Proverbs-' + chapter).each((i, elem) => {
          const verseNumber = $(elem).find('.versenum').text().trim();
          // Remove the verse number from the main text
          $(elem).find('.versenum').remove();
          let text = $(elem).text().trim();

          // remove the footnote
          text = text.replace(/\[\w\]/g, '').trim();

          if (text) {
              allProverbs.push({
                  id: `proverbs-${idCounter++}`,
                  text: text,
                  author: 'Proverbs',
                  category: 'Proverbs',
              });
          }
      });
      console.log(`Successfully fetched and parsed Proverbs chapter ${chapter}`);
    } catch (error) {
      console.error(`Error fetching or parsing Proverbs chapter ${chapter}:`, error);
    }
  }

  const content = `import { Quote } from './types';

export const proverbs: Quote[] = ${JSON.stringify(allProverbs, null, 2)};
`;

  fs.writeFileSync('src/data/proverbs-en.ts', content, 'utf8');
  console.log('Successfully wrote proverbs to src/data/proverbs-en.ts');
}

fetchProverbs();
