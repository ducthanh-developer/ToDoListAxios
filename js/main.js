var dstask = new ListTask();
var validator = new Validator();
var getEle = function (id) {
  return document.getElementById(id);
};
var renderDSTask = function (dstask) {
  var todo = "";
  var completed = "";
  dstask.forEach((task, index) => {
    if (task.status == "todo") {
      todo += `<li>
        <span>${task.name}</span>
        <div class="buttons">
          <button class="remove" onclick="deleteToDo(${index})">
            <i class="fa fa-trash-alt"></i>
          </button>
          <button class="complete" onclick="changeStatus(${index})">
            <i class="far fa-check-circle"></i>
            <i class="fas fa-check-circle"></i>
          </button>
        </div>
      </li>`;
    } else {
      completed += `<li>
        <span>${task.name}</span>
        <div class="buttons">
          <button class="remove" onclick="deleteToDo(${index})">
            <i class="fa fa-trash-alt"></i>
          </button>
          <button class="complete" onclick="changeStatus(${index})">
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

function deleteToDo(index) {
  dstask.deleteTask(index);
  alert("Delete Success!");
  renderDSTask(dstask.arr);
  setLocalStorage();
}

function changeStatus(index) {
  if (dstask.arr[index].status == "todo") {
    dstask.arr[index].status = "completed";
  } else {
    dstask.arr[index].status = "completed";
  }
  alert("Change status success!");
  renderDSTask(dstask.arr);
}

getEle("addItem").addEventListener("click", function () {
  var nameTask = getEle("newTask").value;
  var isValid = true;
  isValid &=
    validator.checkEmpty(nameTask, "notiInput", "Task name cannot be empty!") &&
    validator.checkSame(
      nameTask,
      dstask.arr,
      "notiInput",
      "Task name cannot be same!"
    );
  console.log(isValid);
  if (!isValid) return;
  var task = new Task(nameTask, "todo");
  dstask.addTask(task);
  setLocalStorage();
  alert("add success!");
  getEle("newTask").value = "";
  renderDSTask(dstask.arr);
});

function getLocalStorage() {
  if (localStorage.getItem("DSTask")) {
    dstask.arr = JSON.parse(localStorage.getItem("DSTask"));
    renderDSTask(dstask.arr);
  }
}

function setLocalStorage() {
  localStorage.setItem("DSTask", JSON.stringify(dstask.arr));
}
