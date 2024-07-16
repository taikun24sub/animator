
String.prototype.hashCode = function() {
  var hash = 0,
    i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
function open_latest(){
	if(!storageAvailable("localStorage")){
		alert("LocalStorage not avaliable.LocalStorage(デバイス内のデータ保存)に対応していないようです。");
		return;
	}
	new_project("untitled");
}
function new_project(name){
	if (!localStorage.getItem("animator_projects")) {
	  localStorage.setItem("animator_projects", JSON.stringify([]));
	}
	let now = JSON.parse(localStorage.getItem("animator_projects"));
	let id = "animator.project@" + (Math.random().toString(32).substring(2) + name).hashCode();
	now.push({
		"name": name,
		"localstorage":id
	});
	localStorage.setItem("animator_projects", JSON.stringify(now));
	localStorage.setItem(id, JSON.stringify({
		"images":[]
	}))
}
function remove_projects(){
	let now = JSON.parse(localStorage.getItem("animator_projects"));
	for (var i = 0; i < now.length; i++) {
		console.log(now[i]);
		localStorage.removeItem(now[i]["localstorage"]);
	}
	localStorage.setItem("animator_projects", JSON.stringify([]));
}