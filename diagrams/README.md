# How to Render Mermaid Diagrams

## Quick Start

All diagrams in this directory are in Mermaid format. Here are the easiest ways to view them:

### 1. GitHub/GitLab (Easiest)
Simply push this directory to GitHub or GitLab - they render Mermaid automatically!

### 2. VS Code (Recommended for Local)
1. Install "Markdown Preview Mermaid Support" extension
2. Open any .md file
3. Press `Ctrl+Shift+V` (or `Cmd+Shift+V` on Mac) to preview

### 3. Online Editor
1. Go to https://mermaid.live
2. Copy the Mermaid code from any diagram
3. Paste and view/export

### 4. Export to Images

Install Mermaid CLI:
```bash
npm install -g @mermaid-js/mermaid-cli
```

Convert diagrams:
```bash
# PNG format
mmdc -i 01-class-diagram.md -o class-diagram.png

# SVG format (vector, scalable)
mmdc -i 01-class-diagram.md -o class-diagram.svg

# PDF format
mmdc -i 01-class-diagram.md -o class-diagram.pdf
```

## For Project Reports

To include in Word/PDF reports:
1. Export diagrams as PNG or SVG using method 4 above
2. Insert images into your document
3. Add captions from the diagram descriptions

## Troubleshooting

**Diagram not rendering?**
- Ensure you're using a Mermaid-compatible viewer
- Check that the code block starts with ```mermaid
- Try copying to mermaid.live to validate syntax

**Need higher resolution?**
- Use SVG format (vector graphics, infinite zoom)
- Or use mmdc with `--scale` option: `mmdc -i file.md -o file.png --scale 2`
