# Google Sheets Setup

Use this when you want to update website data without editing `index.html`.

## 1. Create the Sheet

Create one Google Sheet with one tab. The tab can have any name.

Use these exact column headers in row 1:

```text
section,title,label,value,description,image,alt,icon,link,button,date,location,before,after,outcome,role,linkedin,instagram,rating,size,open,active
```

You can import `google-sheet-template.csv` into Google Sheets to start faster.

## 2. Publish the Sheet

In Google Sheets:

1. Go to `File` > `Share` > `Publish to web`.
2. Select the tab that contains the website data.
3. Choose `Comma-separated values (.csv)`.
4. Click `Publish`.
5. Copy the published CSV URL.

## 3. Connect the Website

Open `script.js` and paste the published CSV URL here:

```js
const SHEET_CONFIG = {
  csvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTseVEgZuYRd1bJhobpyT4qNKnPmYEJmGNedJcyG0DUcAadadi4OxN6sVayItM3PQ52eTFZlfA2blah/pub?gid=2037789487&single=true&output=csv",
};
```

After this, the website will load data from Google Sheets. If the sheet cannot load, it will keep using the built-in fallback data.

## Supported Sections

Use the `section` column to decide where each row appears:

- `dashboard_summary`: transparency cards such as Donation Received, Spent, Remaining.
- `dashboard_programs`: progress bars in the dashboard. Put percentage numbers in `value`.
- `impact_stats`: animated impact cards. Use `title` and `value`.
- `initiatives`: program cards. Use `title`, `description`, `image`, `alt`, `icon`, `link`.
- `activity_feed`: live activity timeline. Use `date` and `description`.
- `gallery`: gallery images. Use `title`, `image`, `alt`, and optional `size` as `wide` or `tall`.
- `stories`: success stories. Use `before`, `after`, and `outcome`.
- `team`: team cards. Use `title`, `role`, `image`, `alt`, `linkedin`, `instagram`.
- `testimonials`: testimonial cards. Use `title`, `description`, `rating`.
- `events`: upcoming events. Use `date`, `title`, `location`, `link`.
- `faqs`: FAQ accordion. Use `title`, `description`, and optional `open` as `yes`.

Set `active` to `no` for any row you want to hide temporarily.
