# PDF CV Generation

This directory contains PDF versions of the CVs from the text files. In a real implementation, we would:

1. Install the required dependency:

   ```
   pnpm add pdf-lib
   ```

2. Use the `generate-pdf-cvs.js` script in the parent directory to generate PDFs from all text CVs.

3. The PDFs would be created with professional formatting including:
   - Proper headings and subheadings
   - Bullet points for achievements and skills
   - Multiple pages for longer CVs
   - Consistent fonts and spacing

The PDF versions would be used to test PDF parsing and extraction capabilities, which are important for the CV matching service.
