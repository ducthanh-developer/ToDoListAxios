function TaskService() {};
TaskService.prototype.getTaskApi = function(){
  return axios({
    url: 'https://60ebf371e9647b0017cddf6e.mockapi.io/tasks',
    method: 'GET',
  })
}

TaskService.prototype.addTaskApi = function(task){
  return axios({
    url: 'https://60ebf371e9647b0017cddf6e.mockapi.io/tasks',
    method: 'POST',
    data: task
  })
}

TaskService.prototype.deleteTaskApi = function(id){
  return axios({
    url: `https://60ebf371e9647b0017cddf6e.mockapi.io/tasks/${id}`,
    method: 'DELETE'
  })
}

TaskService.prototype.getTaskByIdApi = function(id){
  return axios({
    url: `https://60ebf371e9647b0017cddf6e.mockapi.io/tasks/${id}`,
    method: 'GET'
  })
}

TaskService.prototype.updateTaskApi = function(id, task){
  return axios({
    url: `https://60ebf371e9647b0017cddf6e.mockapi.io/tasks/${id}`,
    method: 'PUT',
    data: task
  })
}