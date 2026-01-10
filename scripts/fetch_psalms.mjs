
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

try {
  const data = fs.readFileSync(inputFile, 'utf8');
  const lines = data.split(/\r?\n/);
  const psalms = [];
  let idCounter = 1;
  let currentPsalmLines = [];

  const processPsalm = () => {
    if (currentPsalmLines.length > 0) {
      const firstLine = currentPsalmLines[0];
      const match = firstLine.match(/^19:(\d{3}):(\d{3})\s(.+)/);
      if (match) {
        const psalmNum = parseInt(match[1], 10);
        const verseNum = parseInt(match[2], 10);

        let text = currentPsalmLines.map(line => {
          return line.replace(/^19:\d{3}:\d{3}\s/, '').trim();
        }).join(' ');

        if (text) {
          psalms.push({
            id: idCounter++,
            text: text,
            author: `Psalm ${psalmNum}:${verseNum}`,
            category: 'psalm',
            backgroundGradient: backgroundGradients[(idCounter - 2) % backgroundGradients.length],
          });
        }
      }
    }
  };

  for (const line of lines) {
    if (line.includes('*** END OF THE PROJECT GUTENBERG EBOOK')) {
      break;
    }
    if (line.match(/^19:\d{3}:\d{3}\s/) && currentPsalmLines.length > 0) {
      processPsalm();
      currentPsalmLines = [line];
    } else if (line.trim() !== '') {
      currentPsalmLines.push(line);
    }
  }

  // Process the last psalm
  processPsalm();

  fs.writeFileSync(outputFile, JSON.stringify(psalms, null, 2));
  console.log(`Successfully created ${outputFile} with ${psalms.length} entries.`);
} catch (error) {
  console.error('Error processing data:', error);
}
