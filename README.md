# Gift Card + Audio (Railway Deploy)

A romantic gift-card web app with customizable message and **local MP3 playback**.
Ready to deploy on Railway.

## Project Structure
```
railway-gift-card/
├─ server.js
├─ package.json
└─ public/
   ├─ index.html
   └─ media/
      └─ anugerah-terindah.mp3   (put your file here)
```

## How to Use (Local)
1. Put your MP3 at `public/media/anugerah-terindah.mp3`.
2. Install & run:
   ```bash
   npm install
   npm start
   ```
3. Open http://localhost:3000

## Deploy to Railway
1. Create a new project on Railway.
2. Connect your GitHub repo or use "Deploy from GitHub Template" / "Upload".
3. Ensure **Start Command** is `npm start` (package.json already set).
4. Add your MP3 to `public/media/anugerah-terindah.mp3` in the repo before deploy.
5. Visit your Railway URL.

## Notes
- The app will try to use a custom URL from **Settings → URL Musik**.
- If left empty, it plays the bundled file at `/media/anugerah-terindah.mp3`.
- Streaming is optimized (range requests, caching).

## Troubleshooting
- If audio doesn't play on mobile, you might need a **user gesture** first (tap "Musik").
- Make sure the file name and path are exact.
- Large MP3s should still stream fine because Express supports range requests.
