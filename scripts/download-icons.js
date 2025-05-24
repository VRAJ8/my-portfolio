import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const icons = [
  {
    name: 'tailwind',
    url: 'https://www.svgrepo.com/show/374118/tailwind.svg'
  },
  {
    name: 'framer',
    url: 'https://www.svgrepo.com/show/327408/logo-framer.svg'
  },
  {
    name: 'laravel',
    url: 'https://www.svgrepo.com/show/376332/laravel.svg'
  },
  {
    name: 'inertia',
    url: 'https://www.svgrepo.com/show/327408/logo-framer.svg'
  }
];

const downloadIcon = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const filePath = path.join('public', 'icons', filename);
      const fileStream = fs.createWriteStream(filePath);
      
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const downloadAllIcons = async () => {
  const iconsDir = path.join('public', 'icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  for (const icon of icons) {
    try {
      await downloadIcon(icon.url, `${icon.name}.svg`);
    } catch (error) {
      console.error(`Error downloading ${icon.name}:`, error.message);
    }
  }
};

downloadAllIcons(); 