const fs = require("fs");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

// Function to create a PDF from a text CV
async function createPDF(cvTextPath, outputPath) {
  // Read the text content
  const cvText = fs.readFileSync(cvTextPath, "utf-8");

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([612, 792]); // US Letter size

  // Get the font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Set the font size and line height
  const fontSize = 10;
  const lineHeight = 14;

  // Split the text content into lines
  const lines = cvText.split("\n");

  // Start position
  let y = 750;

  // Draw each line
  for (const line of lines) {
    if (line.startsWith("#")) {
      // It's a heading - make it bold and larger
      const text = line.replace(/^#+\s*/, "");
      page.drawText(text, {
        x: 50,
        y,
        size: fontSize + 4,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight + 4;
    } else if (line.startsWith("##")) {
      // It's a subheading
      const text = line.replace(/^#+\s*/, "");
      page.drawText(text, {
        x: 50,
        y,
        size: fontSize + 2,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight + 2;
    } else if (line.startsWith("###")) {
      // It's a sub-subheading
      const text = line.replace(/^#+\s*/, "");
      page.drawText(text, {
        x: 50,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    } else if (line.trim() === "") {
      // Empty line - just add some space
      y -= lineHeight;
    } else if (line.startsWith("-")) {
      // It's a bullet point
      const text = line.replace(/^-\s*/, "• ");
      page.drawText(text, {
        x: 60,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    } else {
      // Regular text
      page.drawText(line, {
        x: 50,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight;
    }

    // If we've reached the bottom of the page, add a new page
    if (y < 50) {
      y = 750;
      page = pdfDoc.addPage([612, 792]);
    }
  }

  // Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save();

  // Write the PDF to a file
  fs.writeFileSync(outputPath, pdfBytes);
}

// Generate PDFs for all text CVs
async function generateAllPDFs() {
  // Get all text CVs
  const textCVs = fs
    .readdirSync("./test-data/cvs")
    .filter((file) => file.endsWith(".txt"));

  // Create PDFs directory if it doesn't exist
  if (!fs.existsSync("./test-data/cvs/pdf")) {
    fs.mkdirSync("./test-data/cvs/pdf");
  }

  // Generate a PDF for each text CV
  for (const textCV of textCVs) {
    const pdfName = textCV.replace(".txt", ".pdf");
    await createPDF(
      `./test-data/cvs/${textCV}`,
      `./test-data/cvs/pdf/${pdfName}`
    );
    console.log(`Generated PDF for ${textCV}`);
  }
}

// Run the function
generateAllPDFs().catch(console.error);
