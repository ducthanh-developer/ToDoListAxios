var taskService = new TaskService();
var validator = new Validator();
var isLoading = true;
var getEle = function (id) {
  return document.getElementById(id);
};

var getTasks = function () {
  taskService
    .getTaskApi()
    .then(function (res) {
      renderTable(res.data);
      setLocalStorage(res.data);
      isLoading = false;
      checkLoading();
    })
    .catch(function (err) {
      console.log(err);
    });
};

checkLoading();
getTasks();

var renderTable = function (taskService) {
  var todo = "";
  var completed = "";
  taskService.forEach((task) => {
    if (task.status == "todo") {
      todo += `<li>
        <span>${task.textTask}</span>
        <div class="buttons">
          <button class="remove" onclick="deleteToDo(${task.id})">
            <i class="fa fa-trash-alt"></i>
          </button>
          <button class="complete" onclick="changeStatus(${task.id})">
            <i class="far fa-check-circle"></i>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </li>`;
    } else {
      completed += `<li>
        <span>${task.textTask}</span>
        <div class="buttons">
          <button class="remove" onclick="deleteToDo(${task.id})">
            <i class="fa fa-trash-alt"></i>
          </button>
          <button class="complete" onclick="changeStatus(${task.id})">
            <i class="far fa-check-circle"></i>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </li>`;
    }
  });
  getEle("todo").innerHTML = todo;
  getEle("completed").innerHTML = completed;
};

getLocalStorage();

function deleteToDo(id) {
  isLoading = true;
  checkLoading();
  taskService
    .deleteTaskApi(id)
    .then(function (res) {
      getTasks();
      renderTable(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function changeStatus(id) {
  isLoading = true;
  checkLoading();
  var status = "";
  taskService
    .getTaskByIdApi(id)
    .then(function (res) {
      status = res.data.status == "todo" ? "completed" : "todo";
      var task = new Task(res.data.textTask, status);
      taskService
        .updateTaskApi(id, task)
        .then(function (res) {
          getTasks();
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
}

getEle("addItem").addEventListener("click", function () {
  var textTask = getEle("newTask").value;
  var task = new Task(textTask, "todo");
  var listTask = getLocalStorage();
  var isValid = true;
  isValid &= validator.checkEmpty(textTask, "notiInput", "Task name is not empty") &&
  validator.checkSame(textTask, listTask, "notiInput", "Task name is not same");
  if(!isValid) return;
  isLoading = true;
  checkLoading();
  taskService
    .addTaskApi(task)
    .then(function (res) {
      getTasks();
    })
    .catch(function (err) {
      console.log(err);
    });
  getEle("newTask").value = "";
});

function checkLoading() {
  var content = `<div class="loader">Loading...</div>`;
  if (isLoading) {
    getEle("notiInput").style.display = "block";
    getEle("notiInput").innerHTML = content;
  } else {
    getEle("notiInput").style.display = "none";
    getEle("notiInput").innerHTML = "";
  }
}

function getLocalStorage() {
  if (localStorage.getItem("listTask")) {
    return JSON.parse(localStorage.getItem("listTask"));
  }
}

function setLocalStorage(listTask) {
  localStorage.setItem("listTask", JSON.stringify(listTask));
}
