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
  this.checkSame = function (valueComp, arrValue, notiId, mess) {
    for (var i = 0; i < arrValue.length; i++) {
      if (valueComp === arrValue[i].name) {
        getEle(notiId).style.display = "block";
        getEle(notiId).textContent = mess;
        return false;
      }
    }
    getEle(notiId).style.display = "none";
    getEle(notiId).textContent = "";
    return true;
  };
}
