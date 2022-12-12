{
  let tasks = [];
  let hideDoneTask = false;
  //let doneTasks = false;
  let doneTask = false;
  //let buttonsHidden = false;

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
    //tasks.splice(taskIndex, 1); remove one element at index "taskIndex"
    render();
  };

  const doneTaskToggle = (taskIndex) => {
    //działa tylko jak się klika w ten sam task
    const tasksLength = tasks.length;
    if (doneTask === false) {
      tasks = [
        ...tasks.slice(0, taskIndex),
        { ...tasks[taskIndex], done: true },
        ...tasks.slice(taskIndex + 1, tasksLength),
      ];
      doneTask = true;
    } else {
      tasks = [
        ...tasks.slice(0, taskIndex),
        { ...tasks[taskIndex], done: false },
        ...tasks.slice(taskIndex + 1, tasksLength),
      ];
      doneTask = false;
    }

    //tasks[taskIndex].done = !tasks[taskIndex].done;
    //renderTasks();
    render();
  };

  const doneAllTasksToggle = () => {

     for (const task in tasks) {
      // console.log(`${task}: ${tasks[task].content}`);
        tasks = [
          {...tasks[task], done: true}, //zakańcza tylko pierwszy task - dlaczego? 
        ];
       //console.log("ile tasków: " + tasks.length);
  
     }
    render();
  };

  // };

  const showHideEndTasks = () => {
    if (hideDoneTask) {
    }
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

    console.log(endAllTasksButton);
    if (endAllTasksButton === null) {
      return;
    } else {
      //endAllTasksButton.forEach((endAllTasks) => {
      endAllTasksButton.addEventListener("click", () => {
        doneAllTasksToggle();
      });
      //});
    }
    if (hideAllDoneTasksButton === null) {
      return;
    } else {
      hideAllDoneTasksButton.addEventListener("click", (index) => {
        showHideEndTasks(index);
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
      </span>
      <span>  
        <button class="body__buttons js-endAllTasks">
          Ukończ wszystkie
        </button>
      </span>
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
    // tasks.push({
    //   content: newTaskContent,
    // });
    // document.getElementById("inputTask").value = "";
    tasks = [...tasks, { content: newTaskContent }];
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
