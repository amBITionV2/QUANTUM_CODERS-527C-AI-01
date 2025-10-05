import QRCode from "qrcode";
import puppeteer from "puppeteer";

export async function makeQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, { errorCorrectionLevel: "M", margin: 1, width: 300 });
}

export async function renderPdfFromHtml(html: string): Promise<Buffer> {
  // Launch Chromium via Puppeteer. In many environments, default Chromium works.
  const browser = await puppeteer.launch({ headless: "new" });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "24mm", bottom: "24mm", left: "16mm", right: "16mm" },
    });
    await page.close();
    return pdfBuffer;
  } finally {
    await browser.close();
  }
}
