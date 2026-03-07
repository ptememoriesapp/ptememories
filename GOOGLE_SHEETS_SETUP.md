# Google Sheets Waitlist Setup Guide
## Takes ~5 minutes. Do this before running the Next.js project.

---

## Step 1 — Create the Google Sheet

1. Go to https://sheets.google.com
2. Create a new spreadsheet
3. Name it: **PTE Memories Hub — Waitlist**
4. In Row 1, add these headers exactly:
   - A1: `Timestamp`
   - B1: `Email`
   - C1: `Source` (which page they signed up from)
   - D1: `Country` (optional, from browser)

---

## Step 2 — Open Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete all the default code in the editor
3. Paste the script below (copy everything between the lines)

---

## Script to paste ↓↓↓

```javascript
const SHEET_NAME = "Sheet1";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    const email = data.email || "";
    const source = data.source || "unknown";
    const country = data.country || "";

    // Basic email validation
    if (!email || !email.includes("@")) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Invalid email" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Check for duplicate email
    const existingData = sheet.getDataRange().getValues();
    for (let i = 1; i < existingData.length; i++) {
      if (existingData[i][1] === email) {
        return ContentService
          .createTextOutput(JSON.stringify({ success: true, duplicate: true, message: "Already on the list!" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Append new row
    sheet.appendRow([
      new Date().toISOString(),
      email,
      source,
      country
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Added to waitlist!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "PTE Memories Hub Waitlist API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon next to "Type" → select **Web app**
3. Fill in:
   - Description: `PTE Waitlist API`
   - Execute as: **Me**
   - Who has access: **Anyone** ← important, must be this
4. Click **Deploy**
5. Click **Authorize access** → choose your Google account → Allow
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/XXXXXXXXXXXXXXXXX/exec`

---

## Step 4 — Add URL to your Next.js project

Open the file `.env.local` in your Next.js project root and paste:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID_HERE/exec
```

Replace `YOUR_ID_HERE` with your actual script ID.

---

## Step 5 — Test it works

Visit your script URL in the browser — you should see:
```json
{ "status": "PTE Memories Hub Waitlist API is running" }
```

If you see that, you're good to go! ✅

---

## ⚠️ Important notes

- Every time you edit the script, you must create a **New Deployment** (not update existing)
  to get the latest version. Re-deploying to the same version won't pick up code changes.
- The "Anyone" access setting is required for the Next.js API route to reach it.
- Emails are stored with timestamp, source page, and country.
- Duplicate emails are silently accepted (returns success) so user sees confirmation without confusion.

---

## What the spreadsheet will look like:

| Timestamp                | Email              | Source   | Country |
|--------------------------|--------------------|----------|---------|
| 2026-03-06T10:23:11.000Z | rahul@gmail.com    | hero     | IN      |
| 2026-03-06T11:05:44.000Z | priya@outlook.com  | memories | AU      |
| 2026-03-06T11:47:02.000Z | arjun@yahoo.com    | cta      | GB      |
