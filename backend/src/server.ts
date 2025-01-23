import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = 4000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

// Add a new task
app.post('/tasks', async (req, res) => {
  const { title, color } = req.body;
  const task = await prisma.task.create({
    data: { title, color, completed: false },
  });
  res.json(task);
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, color, completed },
  });
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({
    where: { id: Number(id) },
  });
  res.sendStatus(204);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
