import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import { fileURLToPath } from 'url';

// __dirname equivalent in ESM
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.PDF_DEBUG === 'true') {
    const PDF_FILE = path.join(__dirname, 'test', 'data', '05-versions-space.pdf');

    // Check if the file exists
    if (!fs.existsSync(PDF_FILE)) {
        console.error(`❌ File not found: ${PDF_FILE}`);
        process.exit(1);
    }

    const dataBuffer = fs.readFileSync(PDF_FILE);

    pdf(dataBuffer)
        .then((data) => {
            fs.writeFileSync(`${PDF_FILE}.txt`, data.text, { encoding: 'utf8' });
            console.log('✅ PDF parsed and saved to .txt file.');
        })
        .catch((err) => {
            console.error('❌ PDF parsing failed:', err);
        });
}