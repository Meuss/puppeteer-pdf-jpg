const puppeteer = require('puppeteer');

async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://twitter.com/Meuss_n1', {
    waitUntil: 'networkidle0',
  });
  // only works for screenshots, not pdfs
  await page.setViewport({ width: 768, height: 1024 });
  // make sure everything is loaded
  await timeout(5000);
  // create a pdf
  await page.pdf({
    path: 'pdf-example.pdf',
    displayHeaderFooter: true,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '50px',
      right: '40px',
      bottom: '40px',
      left: '50px',
    },
  });
  // create a screenshot
  await page.screenshot({
    path: 'image-example.jpg',
    type: 'jpeg',
    quality: 100,
    fullpage: true,
  });

  await browser.close();
})();
