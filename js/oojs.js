class Task {
    constructor(text) {
      this.text = text;
      this.completed = false;
    }
  
    toggle() {
      this.completed = !this.completed;
    }
  
    render(index, onToggle, onDelete) {
      const li = document.createElement("li");
      const textSpan = document.createElement("span");
      textSpan.textContent = this.text;
      textSpan.style.textDecoration = this.completed ? "line-through" : "none";

      li.appendChild(textSpan);
  
      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = this.completed ? "✖" : "✔";
      toggleBtn.onclick = () => onToggle(index);
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.onclick = () => onDelete(index);
  
      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("button-group");
      buttonGroup.appendChild(toggleBtn);
      buttonGroup.appendChild(deleteBtn);
      li.appendChild(buttonGroup);
  
      return li;
    }
  }

  class UrgentTask extends Task {
    constructor(text) {
      super(text);
      this.urgent = true;
    }
  
    render(index, onToggle, onDelete) {
      const li = super.render(index, onToggle, onDelete);
      li.style.color = "red";
      li.style.fontWeight = "bold";
      return li;
    }
  }
  
  class ToDoApp {
    constructor() {
      this.tasks = [];
      this.taskList = document.getElementById("taskList");
    }
  
    addTask() {
        const input = document.getElementById("taskInput");
        const text = input.value.trim();
        if (text === "") return;
      
        let task;
        if (text.includes("!")) {
          task = new UrgentTask(text);
        } else {
          task = new Task(text);
        }
      
        this.tasks.push(task);
        input.value = "";
        this.render();
    }
  
    toggleTask(index) {
      this.tasks[index].toggle();
      this.render();
    }
  
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.render();
    }
  
    render() {
        this.taskList.innerHTML = "";
      
        this.tasks.forEach((task, index) => {
          const li = task.render(
            index,
            this.toggleTask.bind(this),
            this.deleteTask.bind(this)
          );
          this.taskList.appendChild(li);
        });
      
        const statusId = "taskCountDisplay";
        let existing = document.getElementById(statusId);
        if (existing) existing.remove();

        const status = document.createElement("p");
        status.id = statusId;
        status.textContent = `Feladatok száma: ${this.tasks.length}`;
        status.style.textAlign = "center";
        status.style.fontWeight = "bold";
        status.style.margin = "20px 0";

        const footer = document.querySelector("footer");
        document.body.insertBefore(status, footer);
      }
  }
  
  const todoApp = new ToDoApp();
  window.todoApp = todoApp;