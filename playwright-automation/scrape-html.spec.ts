import { test } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = 'html-scrap';
const INDEX_PATH = 'policies/html_index.json';

const urls = JSON.parse(fs.readFileSync('policies/urls.json', 'utf-8'));
const createdFiles: string[] = [];

for (const { name, url } of urls) {
  test(`scrape ${name}`, async ({ page }) => {
    await page.goto(url, { waitUntil: 'networkidle' });

    const htmlContent = await page.content();

    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/T/, '_')
      .replace(/:/g, '-')
      .replace(/\..+/, '');

    const filename = `${name}_${timestamp}.html`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    fs.writeFileSync(outputPath, htmlContent, { encoding: 'utf-8' });

    createdFiles.push(filename);
    fs.writeFileSync(INDEX_PATH, JSON.stringify(createdFiles, null, 2));
  });
}
