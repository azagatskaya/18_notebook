'use strict';
window.addEventListener('DOMContentLoaded', function () {
	class Note {
		constructor(noteTitle, noteContent, timestamp) {
			this.noteTitle = noteTitle;
			this.noteContent = noteContent;
			this.timestamp = timestamp;
		}

		render() {
			const previewBlock = document.querySelector('.main__wrapper.notes');
			const element = document.createElement('div');
			element.classList.add('note');
			const elTitle = document.createElement('div');
			elTitle.classList.add('note__title');
			elTitle.setAttribute('id', this.timestamp);
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
			const keyName = 'note' + this.timestamp;
			localStorage.setItem(keyName, [this.noteTitle + '_', this.noteContent]);
		}
	}

	getNotesFromLs();
	generateNotes();

	function generateNotes() {
		const note1 = new Note('Моя первая заметка', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quaerat nulla debitis accusamus mollitia natus, eveniet provident animi nihil, tenetur quia fugit laborum ex error ut blanditiis doloremque, maiores architecto!', +new Date());
		note1.render();
		note1.saveToLS();

		const note2 = new Note('Вторая', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quaerat nulla debitis accusamus mollitia natus, eveniet provident animi nihil, tenetur quia fugit laborum ex error ut blanditiis doloremque, maiores architecto!', +new Date());
		note2.render();
		note2.saveToLS();

		const note3 = new Note('Еще одна важная заметка', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita quaerat nulla debitis accusamus mollitia natus, eveniet provident animi nihil, tenetur quia fugit laborum ex error ut blanditiis doloremque, maiores architecto!', +new Date());
		note3.render();
		note3.saveToLS();
	}

	function getNotesFromLs() {
		for (let key in localStorage) {
			let prefix = key.slice(0, 4);
			if (prefix === 'note') {
				let value = localStorage.getItem(key).split('_,');
				let title = value[0];
				let content = value[1];
				let timestamp = key.slice(4);
				new Note(title, content, timestamp).render();
			}
		}
	}

	const noteTitle = document.querySelector('.note-form__title');
	const noteContent = document.querySelector('.note-form__text');
	const submitBtn = document.querySelector('.button--submit');
	const cancelBtn = document.querySelector('.button--cancel');
	const noteCards = document.querySelectorAll('.note__title');
	const deleteBtns = document.querySelectorAll('.option--delete');


	cancelBtn.addEventListener('click', handleResetClick);
	submitBtn.addEventListener('click', handleSubmitClick);
	addListenersToNoteCards(noteCards);
	addListenersToDeleteBtns(deleteBtns);

	function addListenersToNoteCards(noteCards) {
		noteCards.forEach(card => {
			card.addEventListener('click', handleNoteCardClick);
		});
	}

	function addListenersToDeleteBtns(deleteBtns) {
		deleteBtns.forEach(el => {
			el.addEventListener('click', handleDeleteClick);
		});
	}

	function handleSubmitClick(e) {
		e.preventDefault();
		const timestamp = +new Date();
		localStorage.setItem('note' + timestamp, [noteTitle.value + '_', noteContent.value]);
		new Note(noteTitle.value, noteContent.value, timestamp).render();
	}

	function handleResetClick() {
		noteTitle.value = '';
		noteContent.value = '';
	}

	function handleNoteCardClick(e) {
		noteTitle.value = e.target.innerText;
		noteContent.value = localStorage.getItem('note' + e.target.id).split('_,')[1];
	}

	function handleDeleteClick(e) {
		const timestamp = e.target.parentNode.parentNode.parentNode.firstElementChild.id;
		console.log(e.target.parentNode.parentNode.parentNode.firstElementChild);
		localStorage.removeItem('note' + timestamp);
		e.target.parentNode.parentNode.parentNode.remove();

	}

});