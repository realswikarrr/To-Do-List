const listDataContainer = document.querySelector("[data-container]");
const formContainer = document.querySelector("[data-form]");
const inputContainer = document.querySelector("[data-input]");
const clearAllButton = document.getElementById("clear");

const LOCAL_STORAGE_LIST_KEY = "task.lists";
lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];

formContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = inputContainer.value;
  const Value = addToList(inputValue);
  lists.push(Value);
  inputContainer.value = null;
  saveAndRender();
});

function addToList(value) {
  return { id: Date.now().toString(), name: value };
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
}

function saveAndRender() {
  save();
  render();
}

clearAllButton.addEventListener("click", (e) => {
  lists = [];
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  render();
});

function render() {
  clearElement(listDataContainer);
  lists.forEach((list, index) => {
    let listItems = document.createElement("li");
    let paraElement = document.createElement("p");
    paraElement.classList.add("para");
    paraElement.innerText = list.name;
    let buttonElement = document.createElement("button");
    buttonElement.classList.add("btn-trash");
    let iconElement = document.createElement("i");
    iconElement.className += "fa fa-trash";
    buttonElement.appendChild(iconElement);
    let spanElement = document.createElement("span");
    spanElement.onclick = `removeList(${index})`;
    listItems.appendChild(paraElement);
    listItems.appendChild(buttonElement);
    listDataContainer.appendChild(listItems);
  });
}

document.addEventListener("click", removeElement);

function removeElement(e) {
  const item = e.target;
  if (item.className == "btn-trash") {
    removeList();
  }
}

function removeList(index) {
  lists.splice(index, 1);
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists));
  render();
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
