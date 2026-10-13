// =======================
// CLASS UNTUK DATA TUGAS
// =======================

class TaskItem {

    constructor(id, title, deadline, status = false){

        this.id = id;
        this.title = title;
        this.deadline = deadline;
        this.status = status;

    }

}



// =======================
// CLASS UNTUK MENGELOLA APP
// =======================

class DashboardApp {


    constructor(){

        this.tasks = 
        JSON.parse(localStorage.getItem("tasks")) || [];

        this.render();

    }



    // Menyimpan data ke localStorage
    save(){

        localStorage.setItem(
            "tasks",
            JSON.stringify(this.tasks)
        );

    }



    // Menambah tugas
    addTask(task){

        this.tasks.push(task);

        this.save();

        this.render();

    }



    // Menghapus tugas
    deleteTask(id){

        this.tasks = 
        this.tasks.filter(
            task => task.id !== id
        );


        this.save();

        this.render();

    }



    // Mengedit tugas
    editTask(id){

        const task = this.tasks.find(
            task => task.id === id
        );


        const newTitle = 
        prompt(
            "Edit nama tugas:",
            task.title
        );


        if(newTitle){

            task.title = newTitle;

            this.save();

            this.render();

        }

    }



    // Mengubah status tugas
    toggleTask(id){

        this.tasks =
        this.tasks.map(task => {


            if(task.id === id){

                return {

                    ...task,

                    status: !task.status

                };

            }


            return task;


        });


        this.save();

        this.render();

    }



    // Menampilkan data ke halaman
    render(){

        const list =
        document.getElementById("taskList");


        list.innerHTML =

        this.tasks.map(task => `


            <div class="task">


                <h3>
                ${task.title}
                </h3>


                <p>
                Deadline:
                ${task.deadline}
                </p>



                <button onclick="
                app.toggleTask(${task.id})
                ">

                ${task.status ? 
                "Selesai" : "Belum"}

                </button>



                <button onclick="
                app.editTask(${task.id})
                ">

                Edit

                </button>



                <button onclick="
                app.deleteTask(${task.id})
                ">

                Hapus

                </button>



            </div>


        `).join("");

    }


}




// =======================
// INISIALISASI APLIKASI
// =======================

const app = new DashboardApp();





// =======================
// EVENT TAMBAH TUGAS
// =======================

document
.getElementById("addBtn")
.addEventListener(
"click",

()=>{


    const title =
    document
    .getElementById("taskName")
    .value;



    const deadline =
    document
    .getElementById("taskDeadline")
    .value;



    const newTask =

    new TaskItem(

        Date.now(),

        title,

        deadline

    );



    app.addTask(newTask);



});






// =======================
// ASYNC API QUOTE
// =======================

async function getQuote(){


    const response =

    await fetch(
        "https://dummyjson.com/quotes/random"
    );



    const data =

    await response.json();



    document

    .getElementById("quote")

    .innerHTML =

    data.quote;


}



getQuote();