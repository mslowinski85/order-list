{
  let tasks = [];
  let hideDoneTask = false;

  const onFocus = () => {
    document.getElementById("focusButton").addEventListener("click", () => {
      document.getElementById("inputTask").focus();
    });
  };

  const removeTask = (taskIndex) => {
    const tasksLength = tasks.length;
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1, tasksLength),
    ];

    render();
  };

  const doneTaskToggle = (taskIndex) => {
    const tasksLength = tasks.length;

    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1, tasksLength),
    ];

    render();
  };

  const doneAllTasksToggle = () => {
    const tasksLength = tasks.length;

    for (let task = 0; task < tasks.length; task++) {
      if (task < tasksLength) {
        tasks = [
          ...tasks.slice(0, task),
          { ...tasks[task], done: true },
          ...tasks.slice(task + 1),
        ];
      }
    }
    render();
  };

  const showHideEndTasks = () => {
    // let itemIndex = 0;
    // checkHideDoneTasks();

    // if (hideDoneTask !== false){
    //   tasks = [
    //     ...tasks.slice(0,2),
    //     { ...tasks.filter(() => tasks.done === false) },
    //   ];
    //   hideDoneTask = false;
    //   console.log("hideDoneTask - false: " + hideDoneTask);
    //   return;
    // } else {
    //   tasks = [
    //     ...tasks,
    //     { ...tasks.filter(() => tasks.done === false) },
    //   ];
    //   hideDoneTask = true;
    //   console.log("hideDoneTask - true: " + hideDoneTask);
    //  // return;
    // }

    render();

    //   hideDoneTask = true;
    // } else hideDoneTask = false;

    // if (hideDoneTask === true) {
    //   tasks = [
    //     ...tasks,
    //     { ...tasks.filter((isDone) => isDone.done === true) },
    //   ];
    //   hideDoneTask = false;
    // } else {
    //   tasks = [...tasks,];
    //   hideDoneTask = true;
    // }
  };

  const bindToggleDoneEvents = () => {
    const doneButtonsToggle = document.querySelectorAll(".js-done");

    doneButtonsToggle.forEach((toggleButton, index) => {
      toggleButton.addEventListener("click", () => {
        doneTaskToggle(index);
      });
    });
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const bindButtonsEvents = () => {
    //if sprawdzający czy po wyrenderowaniu przycisk w ogóle jest
    //Jeśli tak to łapie eventListenera
    const endAllTasksButton = document.querySelector(".js-endAllTasks");
    const hideAllDoneTasksButton = document.querySelector(
      ".js-showHideEndTasks"
    );

    if (endAllTasksButton !== null) {
      endAllTasksButton.addEventListener("click", () => {
        doneAllTasksToggle();
      });
    }
    if (hideAllDoneTasksButton !== null) {
      hideAllDoneTasksButton.addEventListener("click", () => {
        showHideEndTasks();
      });
    }
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
     
      <li class="list__item"> 
          <button class="list__button js-done">
              ${task.done ? "✓" : ""}
          </button>
          <span class="${task.done ? " list__item--done" : ""}">
              ${task.content}
          </span> 
          <button class="list__button list__button--delete js-remove">
              🗑
          </button> 
      </li>
      `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let htmlButtonString = "";

    if (tasks.length === 0) {
      document.querySelector(".js-buttons").innerHTML = htmlButtonString;
    } else {
      htmlButtonString = `
        <button class="body__buttons  js-showHideEndTasks">
          Ukryj ukończone
        </button> 
        <button class="body__buttons js-endAllTasks">
          Ukończ wszystkie
        </button>
        `;
      document.querySelector(".js-buttons").innerHTML = htmlButtonString;
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];

    render();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
  };

  const init = () => {
    render();
    onFocus();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
