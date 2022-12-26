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
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const showHideEndTasks = () => {
    hideDoneTask = !hideDoneTask;
    render();
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
          <li class="${
            hideDoneTask && task.done === true
              ? "list__item--hiden"
              : "list__item"
          }"> 
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
    const tasksLength = tasks.length;
    let htmlButtonString = "";

    if (tasksLength > 0) {
      htmlButtonString = `
        <button class="body__buttons  js-showHideEndTasks">${hideDoneTask && tasks.some(({done}) => done) ? "Pokaż ukończone" : "Ukryj ukończone"} </button> 
        <button class="${tasks.every(({done}) => done) ? "body__buttonDisabled" : "body__buttons"} js-endAllTasks" ${tasks.every(({ done }) => done) ? "disabled" : ""}> Ukończ wszystkie </button>
      `;
    } else htmlButtonString = ``;

    document.querySelector(".js-buttons").innerHTML = htmlButtonString;
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
