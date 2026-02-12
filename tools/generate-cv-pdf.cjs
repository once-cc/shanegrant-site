/**
 * generate-cv-pdf.js
 * ─────────────────────────────────────────────
 * Renders the tactical-themed CV HTML template
 * to a pixel-perfect A4 PDF using Puppeteer.
 *
 * Usage:  node tools/generate-cv-pdf.js
 * Output: public/shanegrant-cv.pdf
 *         assets/shanegrant-cv.pdf (copy)
 * ─────────────────────────────────────────────
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateCV() {
    const templatePath = path.resolve(__dirname, 'cv-template.html');
    const outputPublic = path.resolve(__dirname, '..', 'public', 'shanegrant-cv.pdf');
    const outputAssets = path.resolve(__dirname, '..', 'assets', 'shanegrant-cv.pdf');

    console.log('────────────────────────────────────────');
    console.log('  TACTICAL CV PDF GENERATOR');
    console.log('────────────────────────────────────────');
    console.log(`  Template: ${templatePath}`);
    console.log(`  Output:   ${outputPublic}`);
    console.log('');

    // Verify template exists
    if (!fs.existsSync(templatePath)) {
        console.error('  ✗ Template not found!');
        process.exit(1);
    }

    console.log('  → Launching headless browser...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Load the HTML template
    const fileUrl = `file://${templatePath}`;
    console.log('  → Loading template...');
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for Google Fonts to load
    console.log('  → Waiting for fonts to load...');
    await page.evaluateHandle('document.fonts.ready');

    // Extra wait for Material Icons
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate PDF
    console.log('  → Generating PDF...');
    await page.pdf({
        path: outputPublic,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    // Ensure assets directory exists
    const assetsDir = path.dirname(outputAssets);
    if (!fs.existsSync(assetsDir)) {
        fs.mkdirSync(assetsDir, { recursive: true });
    }

    // Also copy to assets/
    fs.copyFileSync(outputPublic, outputAssets);

    const stat = fs.statSync(outputPublic);
    const sizeKB = (stat.size / 1024).toFixed(1);

    console.log('');
    console.log(`  ✓ PDF generated successfully!`);
    console.log(`  ✓ Size: ${sizeKB} KB`);
    console.log(`  ✓ Saved to: public/shanegrant-cv.pdf`);
    console.log(`  ✓ Copied to: assets/shanegrant-cv.pdf`);
    console.log('────────────────────────────────────────');

    await browser.close();
}

generateCV().catch(err => {
    console.error('  ✗ PDF generation failed:', err.message);
    process.exit(1);
});
