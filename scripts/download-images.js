import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Missing skill icons
const skillIcons = {
  'tailwind.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg',
  'framer.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/framer/framer-original.svg',
  'inertia.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/inertia/inertia-original.svg',
  'laravel.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-plain.svg'
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