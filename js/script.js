{
  let tasks = [];
  let hideDoneTask = false;
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

  const doneAllTasksToggle = () => {
    const tasksLength = tasks.length;
    doneAllTasksChecked = true;

    for (let taskIndex = 0; taskIndex < tasksLength; taskIndex++) {
      if (taskIndex < tasksLength) {
        tasks = [
          ...tasks.slice(0, taskIndex),
          { ...tasks[taskIndex], done: true },
          ...tasks.slice(taskIndex + 1),
        ];
      }
    }
    render();
  };

  const changeHideDoneTasks = () => {
    return (hideDoneTask = !hideDoneTask);
  };

  const showHideEndTasks = () => {
    // let itemIndex = 0;

    changeHideDoneTasks();
    //hideDoneTask = true  w tym momencie - trzeba tutaj znależć wszystkie zaznaczone taski, a w renderowaniu dodać im klasę w css hidden 
    


    //if (checkHideDoneTasks()){
    //console.log("wartość hideDoneTask: " + checkHideDoneTasks());
    // if (checkHideDoneTasks()) {
    //   tasks = [];
    // }
    //} else console.log("false");

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

    for (const task of tasks) {   //dodać klasę list__item--hidden do tasków zaznaczonych i ukrytych po naciśnięciu przycisku
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
      if (tasks[taskIndex].done === true){
        doneTasks += 1;
      }
    }
    // console.log("trueTasks: " + trueTasks);
    // console.log("tasksLength: " + tasksLength);

    if (tasksLength === 0) {
      htmlButtonString = ``;
      //document.querySelector(".js-buttons").innerHTML = htmlButtonString;
    } 
    if (doneAllTasksChecked === false) {
      htmlButtonString = `
      <button class="body__buttons  js-showHideEndTasks">
        Ukryj ukończone
      </button> 
      <button class="body__buttons js-endAllTasks">
        Ukończ wszystkie
      </button>
      `;
    } 
    if (doneAllTasksChecked === true || doneTasks === tasksLength) {
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
