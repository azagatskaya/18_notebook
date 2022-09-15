"use strict";

const moment = require("moment");
const chart = require("chart.js");

const notesDB = [];

const notes = [
  {
    name: "Доделать проект с карточками",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quaerat nulla debitis accusamus mollitia natus, eveniet provident animi nihil, tenetur quia fugit laborum ex error ut blanditiis doloremque, maiores architecto!",
    date: "2022-05-15",
  },
  {
    name: "Домашка по валидации",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit id, voluptatibus fugiat nulla quibusdam cumque reprehenderit officiis ipsa. Aperiam voluptatibus pariatur ullam, facilis laborum eos assumenda consequuntur vero sunt quos.",
    date: "2022-05-15",
  },
  {
    name: "Почитать про алгоритмы",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate esse minima, ex asperiores culpa quidem dolore illum officia, eligendi, sunt harum iste eaque voluptate dignissimos architecto pariatur deserunt porro modi.",
    date: "2022-05-31",
  },
  {
    name: "Почитать про алгоритмы",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate esse minima, ex asperiores culpa quidem dolore illum officia, eligendi, sunt harum iste eaque voluptate dignissimos architecto pariatur deserunt porro modi.",
    date: "2022-05-31",
  },
  {
    name: "Почитать про алгоритмы",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate esse minima, ex asperiores culpa quidem dolore illum officia, eligendi, sunt harum iste eaque voluptate dignissimos architecto pariatur deserunt porro modi.",
    date: "2022-05-31",
  },
  {
    name: "Почитать про алгоритмы",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate esse minima, ex asperiores culpa quidem dolore illum officia, eligendi, sunt harum iste eaque voluptate dignissimos architecto pariatur deserunt porro modi.",
    date: "2022-05-31",
  },
  {
    name: "Почитать про алгоритмы",
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate esse minima, ex asperiores culpa quidem dolore illum officia, eligendi, sunt harum iste eaque voluptate dignissimos architecto pariatur deserunt porro modi.",
    date: "2022-06-03",
  },
  {
    name: "Сделать домашку по API",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, reprehenderit est dolorem similique reiciendis culpa? Id animi, illo quaerat, harum distinctio earum ipsam minus voluptatibus rem blanditiis, iste omnis iure?",
    date: "2022-05-27",
  },
  {
    name: "Погулять с собакой",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, reprehenderit est dolorem",
    date: "2022-06-03",
  },
  {
    name: "Заняться спортом",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, reprehenderit est dolorem",
    date: "2022-05-27",
  },
  {
    name: "Почитать про алгоритмы",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit id, voluptatibus fugiat nulla quibusdam cumque reprehenderit officiis ipsa. Aperiam voluptatibus pariatur ullam, facilis laborum eos assumenda consequuntur vero sunt quos.",
    date: "2022-05-27",
  },
  {
    name: "Сводить ребенка в зоопарк",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit id, voluptatibus fugiat nulla quibusdam cumque reprehenderit officiis ipsa. Aperiam voluptatibus pariatur ullam, facilis laborum eos assumenda consequuntur vero sunt quos.",
    date: "2022-06-03",
  },
  {
    name: "Сделать домашку по API",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, reprehenderit est dolorem similique reiciendis culpa? Id animi, illo quaerat, harum distinctio earum ipsam minus voluptatibus rem blanditiis, iste omnis iure?",
    date: "2022-05-27",
  },
  {
    name: "Сделать домашку по API",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, reprehenderit est dolorem similique reiciendis culpa? Id animi, illo quaerat, harum distinctio earum ipsam minus voluptatibus rem blanditiis, iste omnis iure?",
    date: "2022-05-27",
  },
  {
    name: "Сделать домашку по API",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, reprehenderit est dolorem similique reiciendis culpa? Id animi, illo quaerat, harum distinctio earum ipsam minus voluptatibus rem blanditiis, iste omnis iure?",
    date: "2022-06-03",
  },
  {
    name: "Сделать домашку по API",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, reprehenderit est dolorem similique reiciendis culpa? Id animi, illo quaerat, harum distinctio earum ipsam minus voluptatibus rem blanditiis, iste omnis iure?",
    date: "2022-06-03",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  class Note {
    constructor(noteTitle, noteDate, noteContent, id) {
      this.noteTitle = noteTitle;
      this.noteDate = noteDate;
      this.noteContent = noteContent;
      this.id = id;
    }

    render() {
      const previewBlock = document.querySelector(".main__wrapper.notes");
      const element = document.createElement("div");
      element.classList.add("note");
      const elTitle = document.createElement("div");
      elTitle.classList.add("note__title");
      elTitle.setAttribute("id", this.id);
      elTitle.innerText = this.noteTitle;
      elTitle.addEventListener("click", handleNoteCardClick);
      const optionsDiv = document.createElement("div");
      optionsDiv.classList.add("note__options");

      optionsDiv.innerHTML = `<div class="note__option option--download">
			<img src="./assets/images/icons/download.svg" alt="download">
			</div>
			<div class="note__option option--copy">
			<img src="./assets/images/icons/content_copy.svg" alt="copy">
			</div>`;

      const deleteDiv = document.createElement("div");
      deleteDiv.classList.add("note__option");
      deleteDiv.classList.add("option--delete");
      deleteDiv.innerHTML =
        '<img src="./assets/images/icons/delete.svg"	alt="delete">';
      deleteDiv.addEventListener("click", handleDeleteClick);
      previewBlock.append(element);
      element.append(elTitle);
      element.append(optionsDiv);
      optionsDiv.append(deleteDiv);
      notesDB.push(this);
    }

    saveToLS() {
      const value = JSON.stringify([
        this.noteTitle,
        this.noteDate,
        this.noteContent,
      ]);
      localStorage.setItem("note" + this.id, value);
    }
  }

  const noteTitle = document.querySelector(".note-form__title");
  const noteDate = document.querySelector(".note-form__date");
  const noteContent = document.querySelector(".note-form__text");
  const submitBtn = document.querySelector(".button--submit");
  const cancelBtn = document.querySelector(".button--cancel");
  let id = 0;

  generateNotes();
  getNotesFromLs();

  // chart
  const notesDailyCount = new Map();
  const labelsSet = new Set(
    notesDB
      .map((el) => {
        let date = el.noteDate;
        if (!notesDailyCount.has(el.noteDate)) {
          notesDailyCount.set(el.noteDate, 1);
        } else {
          notesDailyCount.set(date, notesDailyCount.get(date) + 1);
        }

        return moment(el.noteDate).format("YYYY-MM-DD");
      })
      .sort()
  );
  const labels = [...labelsSet];
  const notesCount = labels.map((el) => {
    return notesDailyCount.get(el);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: "#d55bd5",
        borderColor: "#d55bd5",
        data: notesCount,
        borderJoinStyle: "round",
      },
    ],
  };

  function updateChartAfterAdd() {
    const newDate = moment(noteDate.value).format("YYYY-MM-DD");
    let indexOfNewDate = labels.indexOf(newDate);
    if (indexOfNewDate === -1) {
      labels.push(newDate);
      labels.sort();
      notesCount.splice(labels.indexOf(newDate), 0, 1);
    } else {
      const currentCount = notesCount[indexOfNewDate];
      notesCount.splice(indexOfNewDate, 1, currentCount + 1);
    }
    myChart.update();
  }

  function updateChartAfterDelete(date) {
    let indexOfNewDate = labels.indexOf(date);
    const currentCount = notesCount[indexOfNewDate];
    if (currentCount === 1) {
      labels.splice(indexOfNewDate, 1);
      notesCount.splice(indexOfNewDate, 1);
    } else {
      notesCount.splice(indexOfNewDate, 1, currentCount - 1);
    }
    myChart.update();
  }

  const config = {
    type: "line",
    data: data,
    options: {
      elements: {
        line: {
          tension: 0.25,
          borderWidth: 10,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Daily activity",
          font: {
            size: 14,
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          max: notes.length / 2,
          ticks: {
            stepSize: 1,
          },
        },
        x: {
          ticks: {
            minRotation: 45,
            maxRotation: 90,
          },
        },
      },
    },
  };
  chart.Chart.defaults.font.family = "Nunito";
  const myChart = new Chart(document.getElementById("myChart"), config);

  function getId() {
    return id++;
  }

  function generateNotes() {
    notes.forEach((note) => {
      new Note(note.name, note.date, note.text, getId()).saveToLS();
    });
  }

  function getNotesFromLs() {
    for (let key in localStorage) {
      const prefix = key.slice(0, 4);
      if (prefix === "note") {
        const value = JSON.parse(localStorage[key]);
        const title = value[0];
        const date = value[1];
        const content = value[2];
        const id = key.slice(4);
        new Note(title, date, content, id).render();
      }
    }
  }

  cancelBtn.addEventListener("click", handleResetClick);
  submitBtn.addEventListener("click", handleSubmitClick);

  function handleSubmitClick(e) {
    e.preventDefault();
    if (validateFields()) {
      const note = new Note(
        noteTitle.value,
        noteDate.value,
        noteContent.value,
        getId()
      );
      note.render();
      note.saveToLS();
      updateChartAfterAdd();
      handleResetClick();
    }
  }

  function validateFields() {
    let res = false;
    if (
      noteTitle.value === "" ||
      noteDate.value === "" ||
      noteContent.value === ""
    ) {
      alert("Вы ввели не все данные");
      res = false;
    } else {
      res = true;
    }
    return res;
  }

  function handleResetClick() {
    noteTitle.value = "";
    noteContent.value = "";
  }

  function handleNoteCardClick(e) {
    noteTitle.value = e.target.innerText;
    noteDate.value = JSON.parse(localStorage.getItem("note" + e.target.id))[1];
    noteContent.value = JSON.parse(
      localStorage.getItem("note" + e.target.id)
    )[2];
  }

  function handleDeleteClick(e) {
    const id = e.target.parentNode.parentNode.parentNode.firstElementChild.id;
    const indInDB = getIndInNotesDB(id);

    const dateToDelete = notesDB[indInDB].noteDate;
    notesDB.splice(indInDB, 1);
    updateChartAfterDelete(dateToDelete);
    localStorage.removeItem("note" + id);
    e.target.parentNode.parentNode.parentNode.remove();
  }

  function getIndInNotesDB(eId) {
    let res = null;
    for (let i = 0; i < notesDB.length; i++) {
      if (notesDB[i].id == eId) {
        res = i;
        break;
      }
    }
    return res;
  }
});

// Listeners for noteCard & deleteBtns

// const noteCards = document.querySelectorAll('.note__title');
// const deleteBtns = document.querySelectorAll('.option--delete');
// addListenersToNoteCards(noteCards);
// addListenersToDeleteBtns(deleteBtns);

// function addListenersToNoteCards(noteCards) {
// 	noteCards.forEach(card => {
// 		card.addEventListener('click', handleNoteCardClick);
// 	});
// }

// function addListenersToDeleteBtns(deleteBtns) {
// 	deleteBtns.forEach(el => {
// 		el.addEventListener('click', handleDeleteClick);
// 	});
// }
