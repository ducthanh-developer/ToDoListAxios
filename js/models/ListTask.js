function ListTask() {
  this.arr = [];
}
ListTask.prototype.addTask = function (task) {
  this.arr.push(task);
};

ListTask.prototype.deleteTask = function (index) {
    this.arr.splice(index, 1);
};
