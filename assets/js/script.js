'use strict';

const notes = [{
		name: 'Накрасить ногти',
		text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quaerat nulla debitis accusamus mollitia natus, eveniet provident animi nihil, tenetur quia fugit laborum ex error ut blanditiis doloremque, maiores architecto!',
		date: '2022-05-15'
	},
	{
		name: 'Домашка по валидации',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit id, voluptatibus fugiat nulla quibusdam cumque reprehenderit officiis ipsa. Aperiam voluptatibus pariatur ullam, facilis laborum eos assumenda consequuntur vero sunt quos.',
		date: '2022-05-15'
	},
	{
		name: 'Почитать про алгоритмы',
		text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate esse minima, ex asperiores culpa quidem dolore illum officia, eligendi, sunt harum iste eaque voluptate dignissimos architecto pariatur deserunt porro modi.',
		date: '2022-06-03'
	},
	{
		name: 'Сделать домашку по API',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, reprehenderit est dolorem similique reiciendis culpa? Id animi, illo quaerat, harum distinctio earum ipsam minus voluptatibus rem blanditiis, iste omnis iure?',
		date: '2022-05-27'
	},
	{
		name: 'Погулять с собакой',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, reprehenderit est dolorem',
		date: '2022-06-03'
	},
	{
		name: 'Заняться спортом',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, reprehenderit est dolorem',
		date: '2022-05-27'
	},
	{
		name: 'Почитать про алгоритмы',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit id, voluptatibus fugiat nulla quibusdam cumque reprehenderit officiis ipsa. Aperiam voluptatibus pariatur ullam, facilis laborum eos assumenda consequuntur vero sunt quos.',
		date: '2022-05-27'
	}
];


document.addEventListener('DOMContentLoaded', function () {
	class Note {
		constructor(noteTitle, noteContent, id) {
			this.noteTitle = noteTitle;
			this.noteContent = noteContent;
			this.id = id;
		}

		render() {
			const previewBlock = document.querySelector('.main__wrapper.notes');
			const element = document.createElement('div');
			element.classList.add('note');
			const elTitle = document.createElement('div');
			elTitle.classList.add('note__title');
			elTitle.setAttribute('id', this.id);
			elTitle.innerText = this.noteTitle;
			elTitle.addEventListener('click', handleNoteCardClick);
			const optionsDiv = document.createElement('div');
			optionsDiv.classList.add('note__options');

			optionsDiv.innerHTML = `<div class="note__option option--download">
						<img src="./assets/images/icons/download.svg" alt="download">
					</div>
					<div class="note__option option--copy">
						<img src="./assets/images/icons/content_copy.svg" alt="copy">
					</div>`;

			const deleteDiv = document.createElement('div');
			deleteDiv.classList.add('note__option');
			deleteDiv.classList.add('option--delete');
			deleteDiv.innerHTML = '<img src="./assets/images/icons/delete.svg"	alt="delete">';
			deleteDiv.addEventListener('click', handleDeleteClick);
			previewBlock.append(element);
			element.append(elTitle);
			element.append(optionsDiv);
			optionsDiv.append(deleteDiv);
		}

		saveToLS() {
			const value = JSON.stringify([this.noteTitle, this.noteContent]);
			localStorage.setItem('note' + this.id, value);
		}
	}

	const noteTitle = document.querySelector('.note-form__title');
	const noteContent = document.querySelector('.note-form__text');
	const submitBtn = document.querySelector('.button--submit');
	const cancelBtn = document.querySelector('.button--cancel');
	let id = 0;

	generateNotes();
	getNotesFromLs();

	function getId() {
		return id++;
	}

	function generateNotes() {

		notes.forEach(note => {
			new Note(note.name, note.text, getId()).saveToLS();
		})
	}

	function getNotesFromLs() {
		for (let key in localStorage) {
			const prefix = key.slice(0, 4);
			if (prefix === 'note') {
				const value = JSON.parse(localStorage[key]);
				const title = value[0];
				const content = value[1];
				const id = key.slice(4);
				new Note(title, content, id).render();
			}
		}
	}

	cancelBtn.addEventListener('click', handleResetClick);
	submitBtn.addEventListener('click', handleSubmitClick);

	function handleSubmitClick(e) {
		e.preventDefault();
		const note = new Note(noteTitle.value, noteContent.value, getId());
		note.render();
		note.saveToLS();
		handleResetClick();
	}

	function handleResetClick() {
		noteTitle.value = '';
		noteContent.value = '';
	}

	function handleNoteCardClick(e) {
		noteTitle.value = e.target.innerText;
		noteContent.value = JSON.parse(localStorage.getItem('note' + e.target.id))[1];
	}

	function handleDeleteClick(e) {
		const id = e.target.parentNode.parentNode.parentNode.firstElementChild.id;
		localStorage.removeItem('note' + id);
		e.target.parentNode.parentNode.parentNode.remove();
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