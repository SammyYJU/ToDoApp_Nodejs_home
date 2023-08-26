const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const taskCompleteDOM = document.querySelector(".task-edit-completed");
const formAlertDOM = document.querySelector(".form-alert");

//console.log(window.location);
const params = window.location.search;
const id = new URLSearchParams(params).get("id"); //URL パラメータからidの値を返す

//特定のタスクを取り出す
const showTask = async () => {
    try {
        const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
//        console.log(task);
        const { _id,completed,name } = task;
        taskIDDOM.textContent = _id;
        taskNameDOM.value  = name;
        if(completed){
            taskCompleteDOM.checked = true;
        }
     } catch (err) {
        console.log(err);
    }
}
showTask();


//タスクの編集
editFormDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;
        taskCompleted = taskCompleteDOM.checked;
        const {data: task} = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        })
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "Edit is done.";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
    }
    setTimeout(() => {
      formAlertDOM.style.display = "none";  
    }, 3000);
});
