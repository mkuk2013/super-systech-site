const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'data', 'content.json');

try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const content = JSON.parse(raw);
    console.log('JSON Parse Success');
    console.log('Layout exists:', !!content.layout);
    console.log('Homepage exists:', !!content.homepage);
} catch (err) {
    console.error('JSON Parse Failed:', err);
}
