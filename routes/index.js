// const Task = require('../services/tasks');
var express = require('express');
var router = express.Router();

const { Model } = require('objection');
const Knex = require('knex');

const db = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: 'taskList.db'
  }
});

Model.knex(db);

// Tabela das tarefas a fazer
class Task extends Model {
    static get tableName() {
        return 'tasks';
    }
}

async function createTasksTable() {
  if (await db.schema.hasTable('tasks')) {
    return ;
  } else {
    await db.schema.createTable('tasks', table => {
      table.increments('id').primary();
      table.string('name');
      table.boolean('status');
    });
    console.log('Tabela Tasks criada com sucesso');
  }
}


async function insertTask(task) {
  var name = task['name'];
  await Task.query().insert({ name });
}

async function deleteTask(id) {
  await Task.query().delete().where('id', id);
}

async function getAllTasks() {
  await createTasksTable();
  return await Task.query();
}

async function updateTask(taskId, updatedData) {
  await Task.query().findById(taskId).patch(updatedData);
}

async function checkTask(taskId) {
  await Task.query().findById(taskId).patch({ status: true});
}


// Controladores

router.get('/', async (req, res, next) => {
  try {
    await createTasksTable();
    var tasks = await getAllTasks();
    res.render('index', { tasks });
  } catch(error) {
    console.error('Erro ao coletar dados das tarefas:', error);
    res.status(500).send('Erro ao coletar dados das tarefas');
    tasks = []
    res.render('index', { tasks });
  }
});



router.post('/task', async (req, res, next) => {
  try {
    var newTask = req.body;
    await insertTask(newTask);
    res.redirect('/');
  } catch(error) {
    console.error('Erro ao criar nova tarefa:', error);
    res.status(500).send('Erro ao criar nova ');
  }
});


router.delete('/task/:id', async (req, res, next) => {
  try {
    id = req.params.id
    await deleteTask(id);
    res.status(200).send(`task ${id} Deletada`)
  } catch(error) {
    console.error(`erro ao deletar a task ${id}`);
    res.status(500).send(`erro ao deletar a task ${id}`);
  }
})

router.put('/task/:id', async (req, res, next) => {
  const taskId = req.params.id;
  const updatedData = req.body;

  try {
    const existingTask = await Task.query().findById(taskId);

    if (!existingTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    await updateTask(taskId, updatedData);

    res.json({ message: 'Tarefa atualizada com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar a tarefa:', error);
    res.status(500).json({ error: 'Erro ao atualizar a tarefa.' });
  }
});

router.put('/check/:id', async (req, res, next) => {
  const taskId = req.params.id;

  try {
    const existingTask = await Task.query().findById(taskId);

    if (!existingTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada.' });
    }

    await checkTask(taskId);

    res.status(200).send('ok');
  } catch(error) {
    res.status(500).send('nao foi possivel marcar a tarefa como feita');
  };
})

module.exports = router;
