import Papa from 'papaparse';

export interface ProductTitle {
  title: string;
  characterCount: number;
  specialCharacters: 'Compliant' | 'Non-compliant';
  repeatedWords: 'Compliant' | 'Non-compliant';
  details: string;
}

const SPECIAL_CHARACTERS = ['!', '$', '?', '_', '{', '}', '^', '¬', '¦'];
const ALLOWED_REPEATING_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'nor', 'so', 'yet', 'to',
  'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'as', 'into',
  'like', 'through', 'after', 'over', 'between', 'out', 'against',
  'during', 'without', 'before', 'under', 'around', 'among'
]);

export const processTitle = (title: string): ProductTitle => {
  const characterCount = title.length;
  const foundSpecialChars = SPECIAL_CHARACTERS.filter(char => title.includes(char));
  
  // Word repetition check
  const words = title.toLowerCase().split(/\s+/);
  const wordCount = new Map<string, number>();
  
  words.forEach(word => {
    if (!ALLOWED_REPEATING_WORDS.has(word)) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  });

  const repeatedWords = Array.from(wordCount.entries())
    .filter(([_, count]) => count > 2)
    .map(([word, count]) => `${word} (${count} times)`);

  let details = [];
  if (characterCount > 200) {
    details.push(`Exceeds character limit (${characterCount}/200)`);
  }
  if (foundSpecialChars.length > 0) {
    details.push(`Contains special characters: ${foundSpecialChars.join(', ')}`);
  }
  if (repeatedWords.length > 0) {
    details.push(`Repeated words: ${repeatedWords.join(', ')}`);
  }

  return {
    title,
    characterCount,
    specialCharacters: foundSpecialChars.length === 0 ? 'Compliant' : 'Non-compliant',
    repeatedWords: repeatedWords.length === 0 ? 'Compliant' : 'Non-compliant',
    details: details.join('; ') || 'Compliant'
  };
};

export const processCSV = async (file: File): Promise<ProductTitle[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const titles = results.data
          .slice(1) // Skip header row
          .map((row: any) => row[0]) // Get first column
          .filter(Boolean) // Remove empty titles
          .map(processTitle);
        resolve(titles);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const exportToCSV = (data: ProductTitle[]) => {
  const csv = Papa.unparse({
    fields: ['Product Title', 'Character Count', 'Special Characters', 'Same Word More Than Twice', 'Details'],
    data: data.map(item => [
      item.title,
      item.characterCount,
      item.specialCharacters,
      item.repeatedWords,
      item.details
    ])
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'product_titles_analysis.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};