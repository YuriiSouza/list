import express from 'express';
import { Consults } from '../database/consults';
const router = express.Router();
const taskConsults = new Consults()


// Controladores
router.get('/', async (req, res) => {
    try {
        const tasks = await taskConsults.getAllTasks();

        res.render('index', { tasks });

    } catch(error) {
        console.error('Erro ao coletar dados das tarefas:', error);
        
        res.status(500).send('Erro ao coletar dados das tarefas');
    }
});

router.post('/task', async (req, res) => {
    try {
        const newTask = req.body;
        await this.taskConsults.insertTask(newTask);
        res.redirect('/');
    } catch(error) {
        console.error('Erro ao criar nova tarefa:', error);
        res.status(500).send('Erro ao criar nova tarefa');
    }
});

router.delete('/task/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await this.taskConsults.deleteTask(id);
        res.status(200).send(`Task ${id} Deletada`);
    } catch(error) {
        console.error(`Erro ao deletar a task ${id}`, error);
        res.status(500).send(`Erro ao deletar a task ${id}`);
    }
});

router.put('/task/:id', async (req, res) =>  {
    const taskId = req.params.id;
    const updatedData = req.body;
  
    try {
        const existingTask = this.taskConsults.taskExists(taskId);
  
        if (!existingTask) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }
  
        await this.taskConsults.updateTask(taskId, updatedData);
  
        res.json({ message: 'Tarefa atualizada com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar a tarefa:', error);
        res.status(500).json({ error: 'Erro ao atualizar a tarefa.' });
    }
});

router.put('/check/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
        const existingTask = this.taskConsults.taskExists(taskId);
  
        if (!existingTask) {
            return res.status(404).json({ error: 'Tarefa não encontrada.' });
        }
  
        await this.taskConsults.checkTask(taskId);
  
        res.status(200).send('ok');
    } catch(error) {
        res.status(500).send('Não foi possível marcar a tarefa como feita');
    }
});

export default router;
