const STORAGE_KEY = "tugas_kuliah_sederhana";
const QUOTE_URL = "https://dummyjson.com/quotes/random";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast?latitude=-5.36&longitude=105.31&current=temperature_2m,relative_humidity_2m&timezone=Asia%2FJakarta";

const $ = (selector) => document.querySelector(selector);

class TaskItem {
  constructor(id, title, course, deadline, priority = "Sedang", completed = false) {
    this.id = id;
    this.title = title;
    this.course = course;
    this.deadline = deadline;
    this.priority = priority;
    this.completed = completed;
  }
}

class DashboardApp {
  constructor() {
    this.tasks = this.loadTasks();
    this.filter = "Semua";
    this.search = "";
    this.addEvents();
    this.render();
    this.loadQuote();
    this.loadWeather();
  }

  loadTasks() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      return saved.map((task) => new TaskItem(
        task.id, task.title, task.course, task.deadline,
        task.priority, task.completed
      ));
    } catch (error) {
      console.log("Data tugas belum bisa dibaca.", error);
      return [];
    }
  }

  saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  addEvents() {
    $("#taskForm").addEventListener("submit", (event) => this.saveTask(event));
    $("#cancelButton").addEventListener("click", () => this.resetForm());
    $("#searchInput").addEventListener("input", (event) => {
      this.search = event.target.value.toLowerCase().trim();
      this.renderTasks();
    });

    document.querySelectorAll(".filter").forEach((button) => {
      button.addEventListener("click", () => {
        this.filter = button.dataset.filter;
        document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        this.renderTasks();
      });
    });

    $("#taskList").addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action]");
      if (!button) return;

      const { action, id } = button.dataset;
      if (action === "edit") this.editTask(id);
      if (action === "delete") this.deleteTask(id);
    });

    $("#taskList").addEventListener("change", (event) => {
      if (event.target.matches("input[data-check]")) {
        this.toggleTask(event.target.dataset.check);
      }
    });

    $("#quoteButton").addEventListener("click", () => this.loadQuote());
    $("#weatherButton").addEventListener("click", () => this.loadWeather());
  }

  saveTask(event) {
    event.preventDefault();

    const id = $("#taskId").value;
    const title = $("#taskTitle").value.trim();
    const course = $("#taskCourse").value.trim();
    const deadline = $("#taskDeadline").value;
    const priority = $("#taskPriority").value;

    if (id) {
      const oldTask = this.tasks.find((task) => task.id === id);
      const updatedTask = new TaskItem(id, title, course, deadline, priority, oldTask.completed);
      this.tasks = this.tasks.map((task) => task.id === id ? updatedTask : task);
    } else {
      const newTask = new TaskItem(Date.now().toString(), title, course, deadline, priority);
      this.tasks = [...this.tasks, newTask];
    }

    this.saveTasks();
    this.resetForm();
    this.render();
  }

  editTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return;

    $("#taskId").value = task.id;
    $("#taskTitle").value = task.title;
    $("#taskCourse").value = task.course;
    $("#taskDeadline").value = task.deadline;
    $("#taskPriority").value = task.priority;
    $("#saveButton").textContent = "Simpan Perubahan";
    $("#taskTitle").focus();
  }

  deleteTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) return;

    if (confirm(`Hapus tugas "${task.title}"?`)) {
      this.tasks = this.tasks.filter((item) => item.id !== id);
      this.saveTasks();
      this.render();
    }
  }

  toggleTask(id) {
    this.tasks = this.tasks.map((task) => task.id === id
      ? new TaskItem(task.id, task.title, task.course, task.deadline, task.priority, !task.completed)
      : task
    );
    this.saveTasks();
    this.render();
  }

  resetForm() {
    $("#taskForm").reset();
    $("#taskId").value = "";
    $("#saveButton").textContent = "Simpan Tugas";
  }

  getTasksToShow() {
    return this.tasks
      .filter((task) => {
        if (this.filter === "Belum" && task.completed) return false;
        if (this.filter === "Selesai" && !task.completed) return false;
        return `${task.title} ${task.course}`.toLowerCase().includes(this.search);
      })
      .sort((a, b) => a.deadline.localeCompare(b.deadline));
  }

  render() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((task) => task.completed).length;

    $("#totalTasks").textContent = total;
    $("#completedTasks").textContent = completed;
    $("#pendingTasks").textContent = total - completed;
    this.renderTasks();
  }

  renderTasks() {
    const tasksToShow = this.getTasksToShow();

    $("#taskList").innerHTML = tasksToShow.map((task) => `
      <div class="task ${task.completed ? "done" : ""}">
        <input type="checkbox" data-check="${task.id}" aria-label="Tandai selesai" ${task.completed ? "checked" : ""}>
        <div class="task-info">
          <strong>${this.escapeHTML(task.title)}</strong>
          <small>${this.escapeHTML(task.course)} | Deadline: ${this.escapeHTML(task.deadline)} | Prioritas: ${this.escapeHTML(task.priority)}</small>
        </div>
        <div class="task-actions">
          <button type="button" data-action="edit" data-id="${task.id}">Edit</button>
          <button type="button" data-action="delete" data-id="${task.id}" class="secondary">Hapus</button>
        </div>
      </div>
    `).join("");

    $("#emptyMessage").style.display = tasksToShow.length ? "none" : "block";
    if (!tasksToShow.length) {
      $("#emptyMessage").textContent = this.tasks.length
        ? "Tidak ada tugas yang cocok."
        : "Belum ada tugas. Silakan tambahkan tugas.";
    }
  }

  escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  async loadQuote() {
    $("#quoteText").textContent = "Memuat kutipan...";
    try {
      const response = await fetch(QUOTE_URL);
      if (!response.ok) throw new Error("Kutipan tidak tersedia");
      const data = await response.json();
      $("#quoteText").textContent = `"${data.quote}" — ${data.author}`;
    } catch (error) {
      $("#quoteText").textContent = "Tetap semangat dan kerjakan tugas sedikit demi sedikit.";
    }
  }

  async loadWeather() {
    $("#weatherText").textContent = "Memuat informasi cuaca...";
    try {
      const response = await fetch(WEATHER_URL);
      if (!response.ok) throw new Error("Cuaca tidak tersedia");
      const data = await response.json();
      const current = data.current;
      $("#weatherText").textContent =
        `Suhu: ${current.temperature_2m}°C, kelembapan: ${current.relative_humidity_2m}%.`;
    } catch (error) {
      $("#weatherText").textContent = "Data cuaca tidak tersedia. Periksa koneksi internet.";
    }
  }
}

const app = new DashboardApp();
