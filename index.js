import express from 'express';
import { markdownToBlocks } from '@tryfabric/martian';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/convert', async (req, res) => {
  try {
    const markdown = req.body.markdown;
    if (!markdown) {
      return res.status(400).json({ error: 'Markdown content is required' });
    }
    const blocks = await markdownToBlocks(markdown);
    res.json({ blocks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to convert markdown', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
