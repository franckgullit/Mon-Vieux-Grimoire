const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeImage = async (req, res, next) => {
    if (!req.file)
        return next();

    const originalImagePath = req.file.path;
    const optimizedImageName = `optimized_${path.basename(
        req.file.filename,
        path.extname(req.file.filename)
    )}.webp`;
    const optimizedImagePath = path.join('images', optimizedImageName);

    try {
        sharp.cache(false);

        await sharp(originalImagePath)
            .webp({ quality: 80 })
            .resize(400)
            .toFile(optimizedImagePath);

        req.file.filename = optimizedImageName;

        fs.unlink(originalImagePath, (error) => {
            if (error) {
                console.error('Error deleting Originale Image:', error);
                return next(error);
            }
            next();
        });
    } catch (error) {
        next(error);
    }
};

module.exports = optimizeImage;
