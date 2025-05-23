import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const icons = {
  'react.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg',
  'nextjs.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg',
  'typescript.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
  'tailwind.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg',
  'framer.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/framer/framer-original.svg',
  'threejs.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg',
  'inertia.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/inertia/inertia-original.svg',
  'nodejs.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg',
  'express.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg',
  'mongodb.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg',
  'laravel.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-plain.svg',
  'php.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg',
  'python.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg',
  'java.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg',
  'firebase.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg',
  'figma.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg',
  'adobexd.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/adobexd/adobexd-plain.svg',
  'photoshop.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-plain.svg',
  'illustrator.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/illustrator/illustrator-plain.svg',
  'git.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
  'docker.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
  'aws.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original.svg',
  'vscode.svg': 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg'
};

const downloadIcon = (url, filename) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join('public', 'icons', filename));
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

const downloadAllIcons = async () => {
  const iconsDir = path.join('public', 'icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  for (const [filename, url] of Object.entries(icons)) {
    try {
      await downloadIcon(url, filename);
      console.log(`Downloaded ${filename}`);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error);
    }
  }
};

downloadAllIcons(); 