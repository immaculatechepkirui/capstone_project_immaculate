import express, { type Request, type Response } from 'express';

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// GET endpoint - Hello World
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World! 🚀 Welcome to Express.js with TypeScript');
});

// GET endpoint with route parameter
app.get('/greet/:name', (req: Request, res: Response) => {
  const name = req.params.name;
  res.json({ message: `Hello, ${name}! Welcome to TypeScript backend.` });
});

// POST endpoint - Echo request body
app.post('/echo', (req: Request, res: Response) => {
  const { message } = req.body;
  res.json({ received: message, timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});