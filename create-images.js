const fs = require('fs');
const path = require('path');

// Create the directory if it doesn't exist
const imgDir = path.join(__dirname, 'quartz/public/static/img');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// Create a simple black hollow circle SVG for the icon
const circle = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="256" cy="256" r="240" stroke="black" stroke-width="30" fill="none"/>
</svg>
`;

// Save the SVG as icon.svg
fs.writeFileSync(path.join(__dirname, 'quartz/public/static/icon.svg'), circle);
// Also save the icon as a PNG
fs.writeFileSync(path.join(__dirname, 'quartz/public/static/icon.png'), 'Black hollow circle icon');

// Create placeholder files for welcome.png and post.png
const welcomePlaceholder = 'This is a placeholder for welcome.png';
const postPlaceholder = 'This is a placeholder for post.png';

fs.writeFileSync(path.join(imgDir, 'welcome.png'), welcomePlaceholder);
fs.writeFileSync(path.join(imgDir, 'post.png'), postPlaceholder);

console.log('Image files created successfully in ' + imgDir);

// Also create a favicon.ico
fs.writeFileSync(path.join(__dirname, 'quartz/public/favicon.ico'), 'Black hollow circle favicon');

console.log('All files created successfully!'); 