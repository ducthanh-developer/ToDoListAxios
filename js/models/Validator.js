function Validator() {
  this.checkEmpty = function (value, notiId, mess) {
    if (value === "") {
      getEle(notiId).style.display = "block";
      getEle(notiId).textContent = mess;
      return false;
    }
    getEle(notiId).style.display = "none";
    getEle(notiId).textContent = "";
    return true;
  };
  this.checkSame = function (taskName, listTask, notiId, mess) {
    var arr = listTask.filter(function (task) {
      return task.textTask == taskName;
    });
    if (arr.length > 0) {
      getEle(notiId).style.display = "block";
      getEle(notiId).textContent = mess;
      return false;
    }
    getEle(notiId).style.display = "none";
    getEle(notiId).textContent = "";
    console.log("true");
    return true;
  };
}
