{
  let tasks = [];
  let allTasks = [];
  let hideDoneTask = true;
  let doneAllTasksChecked = false;

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

  // const changeDoneAllTasksChecked = () => {
  //   if (doneAllTasksChecked === false){
  //     return doneAllTasksChecked = true;
  //   } else return doneAllTasksChecked = false;
  // };

  const doneAllTasksToggle = () => {
    // const tasksLength = tasks.length;
    // doneAllTasksChecked = true;
    // hideDoneTask = true;

tasks = tasks.map((task) => ({
  ...task,
  done: true,
}) );

    //changeHideDoneTasks(); nie działa

    // if (hideDoneTask = true){
    //   hideDoneTask = false;
    // };

    // for (let taskIndex = 0; taskIndex < tasksLength; taskIndex++) {
    //   if (taskIndex < tasksLength) {
    //     tasks = [
    //       ...tasks.slice(0, taskIndex),
    //       { ...tasks[taskIndex], done: true },
    //       ...tasks.slice(taskIndex + 1),
    //     ];
    //   }
    // }
    render();
  };

  const changeHideDoneTasks = () => {
    return (hideDoneTask = !hideDoneTask);
  };

  // const ifTaskDone = () => {
  //   const tasksLength = tasks.length;

  //   for (let taskIndex = 0; taskIndex < tasksLength; taskIndex++) {
  //     if (tasks[taskIndex].done === false) {
  //       return true;
  //     }
  //   }
  // };

  const showHideEndTasks = () => {
    //const tasksLength = tasks.length;

    // let itemIndex = 0;
    //hideDoneTask = true;

    console.log("HDT1: " + hideDoneTask);

    switch (hideDoneTask) {
      case false:
        tasks = [...allTasks];
        changeHideDoneTasks();
        console.log("HDT-false: " + hideDoneTask);
        console.log(tasks);
        break;

      case true:
        allTasks = [...tasks];
        tasks = [...tasks.filter((doneTask) => doneTask.done === false)];
        changeHideDoneTasks();
        console.log("HDT-true: " + hideDoneTask);
        console.log(tasks);
        break;
    }
    render();

    // console.log(tasks);
    console.log("allTasks: ", allTasks);
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
    console.log("renderTasks - hideDoneTask: ", hideDoneTask);

    for (const task of tasks) {
      switch (hideDoneTask){
        case true:
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
        break;
        case false:
                 htmlString += `

          <li class="list__item list__item--hiden">
          <button class="list__button ">
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
        break;
      }
      //dodać klasę list__item--hiden do tasków zaznaczonych i ukrytych po naciśnięciu przycisku

      //     if (hideDoneTask === true){
     
      //      }
      //      else {

  
      // }

      // if (tasks[task].done === false > 0)
      // {
      //   doneAllTasksChecked = false;
      // }
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {
    const tasksLength = tasks.length;
    let htmlButtonString = "";
    let doneTasks = 0;

    for (let taskIndex = 0; taskIndex < tasksLength; taskIndex++) {
      if (tasks[taskIndex].done === true) {
        doneTasks += 1;
      }
    }
    if (tasksLength > 0 && doneTasks === tasksLength) {
      doneAllTasksChecked = true;
      //changeDoneAllTasksChecked();
    } else doneAllTasksChecked = false;
    // else changeDoneAllTasksChecked();
    // console.log("doneTasks: " + doneTasks);
    // console.log("tasksLength: " + tasksLength);
    // console.log("doneAllTasksChecked: " + doneAllTasksChecked);

    if (tasksLength === 0 && doneAllTasksChecked === false) {
      htmlButtonString = ``;
      //document.querySelector(".js-buttons").innerHTML = htmlButtonString;
    } else if (tasksLength > 0 && doneAllTasksChecked === false) {
      htmlButtonString = `
      <button class="body__buttons  js-showHideEndTasks">
        Ukryj ukończone
      </button> 
      <button class="body__buttons js-endAllTasks">
        Ukończ wszystkie
      </button>
      `;
    } else if (
      (tasksLength > 0 && doneAllTasksChecked === true) ||
      doneTasks === tasksLength
    ) {
      htmlButtonString = `
      <button class="body__buttons  js-showHideEndTasks">
        Ukryj ukończone
      </button> 
      <button class="body__buttons--disabled js-endAllTasks" disabled>
        Ukończ wszystkie
      </button>
      `;
    }

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
    if (doneAllTasksChecked === true) {
      doneAllTasksChecked = false;
    }
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
