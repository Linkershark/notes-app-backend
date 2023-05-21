const {nanoid} = require('nanoid');
const { notes } = require('./notes');
const addNoteHandler = (req, h) => {
	const {title, tags, body} = req.payload;
	const id = nanoid(16);
	const createdAt = new Date().toISOString();
	const updatedAt = createdAt;
	const newnotes = {title, tags, body, id, createdAt, updatedAt};
	notes.push(newnotes);
	const isSuccess = notes.filter((note) => note.id === id).length > 0;
	if(isSuccess){
		const response = h.response({
			status: 'success',
			message: 'Catatan Berhasil Di Tambahkan',
			data: {
				noteId: id,
			},
		});
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'Catatan Gagal Di Tambahkan',
	});
	return response
		.code(500);
	
};

const getAllNotesHandler = () => ({
	status: 'success',
	data: {
		notes,
	},
});
const getNoteByIdHandler = (req, h) => {
	const { id } = req.params;
	const note = notes.filter((n) => n.id === id)[0];
	if(note !== undefined){
		return {
			status: 'success',
			data: {
				note,
			},
		};
	}

	const response = h.response({
		status: 'fail',
		message: 'Catatan tidak ditemukan',
	});
	response.code(404);
	return response;
}
const editNoteByIdHandler = (req, h) => {
	const { id } = req.params;
	const { title, tags, body } = req.payload;
	const updatedAt = new Date().toISOString();
	const index = notes.findIndex((note) => note.id === id);
	if (index !== -1) {
		notes[index] = {
			...notes[index],
			title,
			tags,
			body,
			updatedAt,
		};
		const response = h.response({
			status: 'success',
			message: 'Catatan berhasil diperbarui',
		});
		return response
			.code(200);
	}
	const response = h.response({
		status: 'fail',
		message: 'Gagal memperbarui data. Id tidak ditemukan',
	});
	return response
		.code(404);
}
const deleteNoteByIdHandler = (req, h) => {
	const { id } = req.params;
	const index = notes.findIndex((note) => note.id === id);
	if (index !== -1) {
		notes.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'Catatan berhasil dihapus',
		});
		return response
			.code(200);
	}
	const response = h.response({
		status: 'fail',
		message: 'Catatan gagal dihapus. Id tidak ditemukan',
	});
	return response
		.code(404);
	
}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };
