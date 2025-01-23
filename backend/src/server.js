"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const PORT = 4000;
const prisma = new client_1.PrismaClient();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Root route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});
// Get all tasks
app.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield prisma.task.findMany();
    res.json(tasks);
}));
// Add a new task
app.post('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, color } = req.body;
    const task = yield prisma.task.create({
        data: { title, color, completed: false },
    });
    res.json(task);
}));
// Update a task
app.put('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, color, completed } = req.body;
    const task = yield prisma.task.update({
        where: { id: Number(id) },
        data: { title, color, completed },
    });
    res.json(task);
}));
// Delete a task
app.delete('/tasks/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.task.delete({
        where: { id: Number(id) },
    });
    res.sendStatus(204);
}));
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
