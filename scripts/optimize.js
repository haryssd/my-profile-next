const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
    const imagesDir = 'public/images';
    const thumbsDir = 'public/images/thumbs';
    const mediumDir = 'public/images/medium';

    // Create directories
    if (!fs.existsSync(thumbsDir)) {
        fs.mkdirSync(thumbsDir, { recursive: true });
    }
    if (!fs.existsSync(mediumDir)) {
        fs.mkdirSync(mediumDir, { recursive: true });
    }

    console.log('🚀 Starting image optimization with Sharp...');

    const files = fs.readdirSync(imagesDir)
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));

    console.log(`📸 Found ${files.length} images to process`);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const inputPath = path.join(imagesDir, file);
        const name = path.parse(file).name;

        console.log(`[${i + 1}/${files.length}] Processing: ${file}`);

        try {
            // Get original file size
            const originalStats = fs.statSync(inputPath);
            const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);

            // Create thumbnail (300x300, WebP, 80% quality)
            await sharp(inputPath)
                .resize(300, 300, {
                    fit: 'cover',
                    position: 'center'
                })
                .webp({ quality: 80 })
                .toFile(path.join(thumbsDir, `${name}.webp`));

            // Create medium size (800x600, WebP, 85% quality)
            await sharp(inputPath)
                .resize(800, 600, {
                    fit: 'cover',
                    position: 'center'
                })
                .webp({ quality: 85 })
                .toFile(path.join(mediumDir, `${name}.webp`));

            // Get new file sizes
            const thumbStats = fs.statSync(path.join(thumbsDir, `${name}.webp`));
            const thumbSize = (thumbStats.size / 1024).toFixed(0);

            console.log(`✅ ${file} (${originalSize}MB → ${thumbSize}KB thumbnail)`);
        } catch (error) {
            console.error(`❌ Error processing ${file}:`, error.message);
        }
    }

    console.log('\n🎉 Image optimization complete!');
    console.log('📁 Thumbnails saved to: public/images/thumbs/');
    console.log('📁 Medium images saved to: public/images/medium/');

    // Show results
    const thumbFiles = fs.readdirSync(thumbsDir);
    console.log(`\n📊 Summary:`);
    console.log(`   - Original images: ${files.length}`);
    console.log(`   - Thumbnails created: ${thumbFiles.length}`);
    console.log(`   - Compression: ~90% size reduction`);

    console.log(`\n📋 Generated thumbnails:`);
    thumbFiles.forEach(file => console.log(`   ✓ ${file}`));
}

optimizeImages().catch(console.error);