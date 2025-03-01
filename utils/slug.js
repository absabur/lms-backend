const { transliterate } = require('transliteration');

exports.makeSlug = (name, author) => {
    const combined = `${name.trim()} by ${author.trim()}`;
    const transliterated = transliterate(combined); // Converts বাংলা to bangla
    let slug = transliterated.replace(/[^\w\s-]/g, ''); // Remove special characters
    slug = slug.replace(/\s+/g, '-'); // Spaces to dashes
    slug = slug.replace(/-+/g, '-'); // Remove duplicate dashes
    return slug.toLowerCase();
}
