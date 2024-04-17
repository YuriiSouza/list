async function createTask() {
  const taskNameInput = document.getElementById('taskName');
  if (taskNameInput) {
    const taskName = taskNameInput.value.trim();

    if (taskName) {
      const newTask = {
        name: taskName
      };

      await fetch('/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
        .then(response => {
          if (response.ok) {
            window.location.reload();
          } else {
            throw new Error('Erro ao criar nova tarefa no servidor');
          }
        })
        .catch(error => {
          console.error('Erro ao criar nova tarefa:', error.message);
        });
    }
  }
};
  
async function checkTask(id) {
    await fetch(`/check/${id}`, {
      method: 'PUT'
    })
      .then(response => {
        if (response.ok) {
          window.location.reload();
        } else {
          throw new Error('Erro ao marcar como feita');
        }
      })
      .catch(error => {
        console.error('Erro ao marcar como feita:', error.message);
    });
}
  
async function editTask(id) {
  const taskNameInput = document.getElementById('nameTask');
  if (taskNameInput) {
    const nameTask = taskNameInput.value.trim();

      if (nameTask) {
        const newTask = {
          name: nameTask,
          status: false
        };

        await fetch(`/task/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTask)
        })
          .then(response => {
            if(response.ok) {
              window.location.reload();
            } else {
              throw new Error('Erro ao atualizar task no servidor');
            }
            })
            .catch(error => {
              console.error(error.message)
            });
        }
  }
};

async function deleteTask(id) {
    await fetch(`/task/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if(response.ok) {
          window.location.reload();
        } else {
          throw new Error('Erro ao apagar tarefa no servidor');
        }
      })
      .catch(error => {
        console.error('Erro ao apagar tarefa:', error.message);
      });
}