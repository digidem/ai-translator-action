const fs = require('fs');
const path = require('path');
const { translate } = require('continuous_translation/translation');

// Merge smaller paragraphs
function mergeParagraphs(paragraphs, maxLength) {
  let merged = [];
  let currentParagraph = '';

  for (let paragraph of paragraphs) {
    if (currentParagraph.length + paragraph.length + 1 <= maxLength) {
      currentParagraph += paragraph + '\n';
    } else {
      merged.push(currentParagraph.trim());
      currentParagraph = paragraph + '\n';
    }
  }

  if (currentParagraph.trim()) {
    merged.push(currentParagraph.trim());
  }

  return merged;
}

// Translate files
function translateFiles(config) {
  return processFiles(config, translate);
}

// Process files and translate
function processFiles(config, translateFunc) {
  const sourceLanguage = config.SOURCE_LANGUAGE;
  const targetLanguage = config.TARGET_LANGUAGE;
  const apiKey = config.API_KEY;
  const additionalPrompt = config.ADDITIONAL_PROMPT;

  // Traverse files
  const files = fs.readdirSync('.');
  for (let file of files) {
    if (!file.match(config.FILE_PATHS_FILTER)) {
      continue;
    }
    if (!config.FILE_TYPES.split(',').some(type => file.endsWith(type))) {
      continue;
    }
    const filePath = path.join('.', file);
    console.log(`Processing file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');

    const filePrompt = getPromptBasedOnFileType(filePath) + additionalPrompt;

    // Split text into paragraphs and track line break count
    const paragraphs = content.split('\n');

    // Merge smaller paragraphs
    const mergedParagraphs = mergeParagraphs(paragraphs, 2048);

    let translated = '';
    for (let mergedParagraph of mergedParagraphs) {
      const translatedMergedParagraph = translateFunc(
        mergedParagraph,
        sourceLanguage,
        targetLanguage,
        apiKey,
        filePrompt
      );
      // Append translated merged paragraph
      translated += translatedMergedParagraph;
    }

    console.log('Translation completed.');

    // Save translated file
    const translatedFilePath = path.join('.', file);
    console.log(`Saving translated file: ${translatedFilePath}`);
    fs.writeFileSync(translatedFilePath, translated);
    console.log('File saved.');
  }
}

// Helper function to get prompt based on file type
function getPromptBasedOnFileType(filePath) {
  // Implement your logic here
}

module.exports = {
  translateFiles,
};
