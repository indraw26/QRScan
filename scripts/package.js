import { createWriteStream, existsSync } from 'fs';
import { readdir, stat } from 'fs/promises';
import { join, relative } from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distPath = join(__dirname, '..', 'dist');
const outputPath = join(__dirname, '..', 'qr-scanner-firefox.zip');

async function packageExtension() {
  // Check if dist folder exists
  if (!existsSync(distPath)) {
    console.error('❌ Error: dist folder not found. Run "npm run build" first.');
    process.exit(1);
  }

  console.log('📦 Packaging extension for Firefox...');

  // Create a file to stream archive data to
  const output = createWriteStream(outputPath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Maximum compression
  });

  // Listen for archive events
  output.on('close', () => {
    const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
    console.log(`✅ Package created successfully!`);
    console.log(`📁 File: qr-scanner-firefox.zip`);
    console.log(`📊 Size: ${sizeInMB} MB (${archive.pointer()} bytes)`);
    console.log(`\n🚀 Ready to upload to Firefox Add-ons store!`);
  });

  archive.on('error', (err) => {
    console.error('❌ Error creating package:', err);
    process.exit(1);
  });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn('⚠️  Warning:', err);
    } else {
      throw err;
    }
  });

  // Pipe archive data to the file
  archive.pipe(output);

  // Add all files from dist directory at the root level (not in a 'dist' folder)
  // This ensures manifest.json is at the root of the zip as Firefox requires
  archive.glob('**/*', {
    cwd: distPath,
    dot: true
  });

  // Finalize the archive
  await archive.finalize();
}

packageExtension().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
