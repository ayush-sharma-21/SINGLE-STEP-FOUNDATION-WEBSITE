# Google Sheets Setup

Use this when you want to update website data without editing `index.html`.

## 1. Create the Sheet

Create one Google Sheet with one tab. The tab can have any name.

Use these exact column headers in row 1:

```text
section,program,title,label,value,description,image,alt,icon,link,button,date,location,before,after,outcome,role,linkedin,instagram,rating,size,open,active,media_type,thumbnail
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
- `program_media`: images/videos for the program detail page. Use `program`, `title`, `description`, `image`, `alt`, `media_type`, and optional `thumbnail`.
- `activity_feed`: live activity timeline. Use `date` and `description`.
- `gallery`: gallery images/videos. Use `title`, `image`, `alt`, and optional `size` as `wide` or `tall`.
- `stories`: success stories. Use `before`, `after`, and `outcome`.
- `team`: team cards. Use `title`, `role`, `image`, `alt`, `linkedin`, `instagram`.
- `testimonials`: testimonial cards. Use `title`, `description`, `rating`.
- `events`: upcoming events. Use `date`, `title`, `location`, `link`, and optional `image`.
- `faqs`: FAQ accordion. Use `title`, `description`, and optional `open` as `yes`.
- `contact`: contact details. Use `label` as `address`, `phone`, `email`, or `hours`, and put the text in `value`.

Set `active` to `no` for any row you want to hide temporarily.

## Media Links

The `image` column accepts:

- Normal image URLs ending in `.jpg`, `.png`, `.webp`, etc.
- Google Drive public image links.
- YouTube links.
- Google Drive public video links.
- Direct video files such as `.mp4` or `.webm`.

For YouTube links, the website automatically creates a thumbnail and opens the video in the gallery popup.

For Google Drive videos, set `media_type` to `video`. Example:

```text
gallery,Food Drive Video,,,,https://drive.google.com/file/d/FILE_ID/view,Food drive video,,,,,,,,,,,,,,wide,yes,video,
```

For Google Drive images, leave `media_type` blank.

If you want to control the preview image for a video, put a public image URL in `thumbnail`.

## Program Detail Page

The website now has a program library page:

```text
program/index.html
```

When a visitor clicks a program card on the homepage, the site opens this page and shows the selected program in a closeable panel.

To connect media to a program, add rows like this:

```text
section,program,title,description,image,media_type
program_media,Blanket Distribution,Blanket Drive Photo,Winter drive update,blanket-distribution/photo-1.jpg,
program_media,Blanket Distribution,Drive Video,Volunteer update,https://youtu.be/VIDEO_ID,youtube
program_media,Blanket Distribution,Google Drive Video,Field video,https://drive.google.com/file/d/FILE_ID/view,video
```

For files stored inside the website, create folders like:

```text
program/blanket-distribution/photo-1.jpg
program/blanket-distribution/video-1.mp4
```

Then put the folder path in the sheet as:

```text
blanket-distribution/photo-1.jpg
blanket-distribution/video-1.mp4
```

Important: static websites cannot automatically scan a folder and list every file. Each image/video file still needs one `program_media` row in the sheet.

## How To Check If It Loaded

Open the website, then open the browser console and run:

```js
window.websiteData
```

You should see groups such as `initiatives`, `impact_stats`, `gallery`, `events`, and `faqs`.

If a section does not show:

- Check that the row has the correct `section` value.
- Check that `active` is not set to `no`.
- Check that the required fields for that section are filled.
- Refresh the website after publishing sheet changes.
