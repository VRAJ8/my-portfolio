import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Missing skill icons (now using PNGs with transparent backgrounds)
const skillIcons = {
  'tailwind.png': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tailwindcss.png',
  'framer.png': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/framer.png',
  'inertia.png': 'https://raw.githubusercontent.com/innocenzi/inertia-logo/main/logo.png',
  'laravel.png': 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/laravel.png'
};

// Project images with placeholder images
const projectImages = {
  'decentlib.jpg': 'https://images.pexels.com/photos/7680208/pexels-photo-7680208.jpeg',
  'orion.jpg': 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg',
  'beastmode.jpg': 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'
};

const downloadFile = (url, filename, directory) => {
  return new Promise((resolve, reject) => {
    const dir = path.join('public', directory);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(path.join(dir, filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filename);
      reject(err);
    });
  });
};

const downloadAllFiles = async () => {
  // Download skill icons
  for (const [filename, url] of Object.entries(skillIcons)) {
    try {
      await downloadFile(url, filename, 'icons');
      console.log(`Downloaded skill icon: ${filename}`);
    } catch (error) {
      console.error(`Error downloading skill icon ${filename}:`, error);
    }
  }

  // Download project images
  for (const [filename, url] of Object.entries(projectImages)) {
    try {
      await downloadFile(url, filename, 'images');
      console.log(`Downloaded project image: ${filename}`);
    } catch (error) {
      console.error(`Error downloading project image ${filename}:`, error);
    }
  }
};

downloadAllFiles(); 