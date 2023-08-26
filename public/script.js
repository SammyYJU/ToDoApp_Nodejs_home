//console.log(axios);
// /api/v1/tasks からタスクを読み込む

//親ドキュメントのdiv class="tasks"のNodeをDOMにセットする
const tasksDOM = document.querySelector(".tasks");
const fromDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

fromDOM.addEventListener("submit", async (event)=> {
    event.preventDefault();
    const name = taskInputDOM.value;
    //console.log(name);
    try {
        await axios.post("/api/v1/tasks",{name:name});
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "Success to add a new task!";
        formAlertDOM.classList.add("text-success");
        showTasks();
    } catch(err) {
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = "Invalid input. Please retry!";
        formAlertDOM.classList.remove("text-success"); 
        showTasks();
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
    }, 4000);
});

//Delete the task;
tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
//    console.log(element.parentElement.classList);
//    console.log(element.parentElement);
    if(element.parentElement.classList.contains("delete-btn")){
        const id = element.parentElement.dataset.id;
//        console.log(id);
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    };
});

// /api/v1/tasksから全タスクを読み込む
const showTasks = async () => {
    try {
        //自作のAPIをコールする
        //dataに絞ってゲット
//      console.log(tasks);
        const {data: tasks} = await axios.get("/api/v1/tasks");
        if(tasks.length<1){
            tasksDOM.innerHTML = `<h5 class="empty-list">No Tasks exist.</h5>`;
            return;
        }    
         //タスクを出力
        const allTasks = tasks.map((task) => { //一つずつ取り出す
            const {completed, _id, name} = task; //分割代入法
//            console.log(task.name);
            return `<div class="single-task">
            <h5>
                <span><i class="far fa-check-circle"></i></span>${name}
            </h5>
            <div class="task-links">
                <!--編集リンク-->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <!--ゴミ箱リンク-->
                <button type="button" class="delete-btn" data-id="${_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`;
        }).join(""); //配列区切りのカンマを除去する
//        console.log(allTasks);
        //親ドキュメントのdiv class="tasks"の下層Nodeに差し込む
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    } 
};

showTasks();
