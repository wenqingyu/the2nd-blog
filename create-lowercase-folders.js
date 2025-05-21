#!/usr/bin/env node

/**
 * This script creates lowercase versions of all folders in the public directory
 * to make the site URLs case-insensitive. This is a workaround for the issue
 * where the folder pages are generated with capitalized names (e.g., Research)
 * but the sidebar links point to lowercase URLs (e.g., research).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PUBLIC_DIR = path.join(__dirname, 'public');
const FOLDERS_TO_DUPLICATE = [
  { original: 'Research', lowercase: 'research' },
  { original: '2nd-Opinion', lowercase: '2nd-opinion' }
];

// Ensure the public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  console.error(`Error: Public directory ${PUBLIC_DIR} does not exist.`);
  process.exit(1);
}

// Function to create a lowercase version of a folder
function createLowercaseFolder(originalFolderName, lowercaseFolderName) {
  const originalPath = path.join(PUBLIC_DIR, originalFolderName);
  const lowercasePath = path.join(PUBLIC_DIR, lowercaseFolderName);
  
  // Check if the original folder exists
  if (!fs.existsSync(originalPath)) {
    console.warn(`Warning: Original folder ${originalPath} does not exist.`);
    return;
  }
  
  // Create the lowercase folder if it doesn't exist
  if (!fs.existsSync(lowercasePath)) {
    fs.mkdirSync(lowercasePath, { recursive: true });
    console.log(`Created lowercase folder: ${lowercasePath}`);
  }
  
  // Copy all files from the original folder to the lowercase folder
  try {
    // Using cp command since it's more efficient for copying directories
    execSync(`cp -r "${originalPath}"/* "${lowercasePath}"/`, { stdio: 'inherit' });
    console.log(`Copied contents from ${originalPath} to ${lowercasePath}`);
  } catch (error) {
    console.error(`Error copying files: ${error.message}`);
  }
}

// Process each folder
FOLDERS_TO_DUPLICATE.forEach(({ original, lowercase }) => {
  createLowercaseFolder(original, lowercase);
});

console.log('Lowercase folders creation completed.'); 