
import fs from 'fs';
import path from 'path';

const inputFile = path.resolve(process.cwd(), 'scripts/psalms.txt');
const outputFile = path.resolve(process.cwd(), 'src/data/psalms-en.json');

const backgroundGradients = [
  "from-blue-400 via-purple-500 to-pink-500",
  "from-green-400 via-teal-500 to-cyan-500",
  "from-yellow-400 via-orange-500 to-red-500",
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-sky-400 via-blue-500 to-indigo-600",
  "from-rose-400 via-pink-500 to-purple-600",
  "from-emerald-400 via-green-500 to-lime-600",
  "from-amber-500 via-orange-500 to-red-500",
];

const verseRegex = /^19:(\d{3}):(\d{3}) (.*)$/;

try {
  const data = fs.readFileSync(inputFile, 'utf8');
  const lines = data.split(/\r?\n/);

  const psalms = [];
  let idCounter = 1;
  let currentVerseLines = [];
  let currentPsalmNum = null;
  let currentVerseNum = null;
  let isParsing = false;

  const flushVerse = () => {
    if (currentVerseLines.length > 0 && currentPsalmNum !== null && currentVerseNum !== null) {
      const text = currentVerseLines.join(' ').trim().replace(/\s+/g, ' ');
      psalms.push({
        id: idCounter++,
        text: text,
        author: `Psalm ${currentPsalmNum}:${currentVerseNum}`,
        category: 'psalm',
        backgroundGradient: backgroundGradients[(idCounter - 2) % backgroundGradients.length],
      });
    }
    currentVerseLines = [];
  };

  for (const line of lines) {
    if (line.includes('*** START OF THE PROJECT GUTENBERG EBOOK')) {
      isParsing = true;
      continue;
    }
    if (line.includes('*** END OF THE PROJECT GUTENBERG EBOOK')) {
      isParsing = false;
      break;
    }

    if (!isParsing || !line.trim()) continue;

    const match = line.match(verseRegex);

    if (match) {
      flushVerse(); // Save the previous verse's content
      currentPsalmNum = parseInt(match[1], 10);
      currentVerseNum = parseInt(match[2], 10);
      currentVerseLines.push(match[3].trim());
    } else if (currentVerseLines.length > 0) {
      // This is a continuation of the current verse
      const trimmedLine = line.trim();
      if (trimmedLine) {
        currentVerseLines.push(trimmedLine);
      }
    }
  }

  flushVerse(); // Save the last verse

  fs.writeFileSync(outputFile, JSON.stringify(psalms, null, 2));
  console.log(`Successfully created ${outputFile} with ${psalms.length} entries.`);
} catch (error) {
  console.error('Error processing data:', error);
}
