import express, { type Request, type Response } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
}

const app = express();
app.use(express.json());

// In-memory database
let users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// GET all users
app.get('/api/users', (req: Request, res: Response) => {
  res.json({ count: users.length, users });
});

// GET user by ID
app.get('/api/users/:id', (req: Request, res: Response) => {
  const id = req.params.id ? parseInt(req.params.id as string) : NaN;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST - Create new user
app.post('/api/users', (req: Request, res: Response) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  const newUser: User = {
    id: Math.max(...users.map(u => u.id), 0) + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Update user
app.put('/api/users/:id', (req: Request, res: Response) => {
  const id = req.params.id ? parseInt(req.params.id as string) : NaN;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  
  res.json(user);
});

// DELETE user
app.delete('/api/users/:id', (req: Request, res: Response) => {
  const id = req.params.id ? parseInt(req.params.id as string) : NaN;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deleted = users.splice(index, 1);
  res.json({ message: 'User deleted', user: deleted[0] });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Advanced API running on http://localhost:${PORT}`);
  console.log('📝 Endpoints:');
  console.log('  GET /api/users');
  console.log('  GET /api/users/:id');
  console.log('  POST /api/users');
  console.log('  PUT /api/users/:id');
  console.log('  DELETE /api/users/:id');
});