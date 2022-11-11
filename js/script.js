{
    const tasks = [
        {
            content: "",
            done: false,
        }

    ];

const render = () => {
    let htmlString = "";

    for (const task of tasks){
        htmlString += `
        <li>
            ${task.content}
        </li>
        `;
    }
};

    const init = () => {

    }

        init();
}