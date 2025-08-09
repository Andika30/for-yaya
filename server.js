import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Basic hardening
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // allow <audio> cross-origin
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(compression());
app.use(morgan('tiny'));

// Static serving with caching
const oneYear = 31536000;
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath);
    if (['.mp3', '.ogg', '.wav'].includes(ext)) {
      res.setHeader('Cache-Control', `public, max-age=${oneYear}, immutable`);
      res.setHeader('Accept-Ranges', 'bytes'); // enable range requests for streaming
    } else if (['.js','.css','.png','.jpg','.jpeg','.gif','.svg','.woff','.woff2'].includes(ext)) {
      res.setHeader('Cache-Control', `public, max-age=${oneYear}, immutable`);
    } else {
      res.setHeader('Cache-Control', 'no-store');
    }
  }
}));

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
