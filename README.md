# PTE Memories Hub — Next.js

A community platform for verified PTE exam memories.

## Stack
- **Next.js 14** — App Router
- **CSS Modules** — scoped, component-level styles
- **Google Sheets** — waitlist via Apps Script

## Getting Started

### 1. Set up Google Sheets (required for waitlist)
See `GOOGLE_SHEETS_SETUP.md` for full instructions.

### 2. Add your script URL
```bash
# .env.local
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

### 3. Install & run
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project Structure
```
src/
  app/
    layout.jsx          # Root layout + Nav
    page.jsx            # Home / landing
    page.module.css
    memories/
      page.jsx          # Browse memories with filter
      page.module.css
    how-it-works/
      page.jsx          # Process, FAQ, section breakdown
      page.module.css
    about/
      page.jsx          # Story, values, roadmap
      page.module.css
  components/
    Nav.jsx             # Fixed navbar with active links
    Nav.module.css
    MemoryCard.jsx      # Timeline card with expandable sections
    MemoryCard.module.css
    WaitlistForm.jsx    # Email form → Google Sheets
    WaitlistForm.module.css
  lib/
    memories.js         # All sample memory data (single source of truth)
  styles/
    globals.css         # CSS variables + resets
```

## Deploying to Netlify
1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Build command: `npm run build`
4. Publish dir: `.next`
5. Add env var: `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
