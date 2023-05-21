
const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');


const route = [
	{
		method: 'GET',
		path: '/',
		handler: (req, h) => {
			return {
				message: "Welcome To Home Page"
			};
		},
	},
	{
		method: '*',
		path: '/',
		handler: (req, h) => {
			return {
				message: "Permission Denied"
			};
		},
	},
	{
		method: 'POST',
		path: '/notes',
		handler: addNoteHandler,
	},
	{
		method: 'GET',
		path: '/notes',
		handler: getAllNotesHandler,
	},
	{
		method: 'GET',
		path: '/notes/{id}',
		handler: getNoteByIdHandler,
	},
	{
		method: 'PUT',
		path: '/notes/{id}',
		handler: editNoteByIdHandler,
	},
	{
		method: 'DELETE',
		path: '/notes/{id}',
		handler: deleteNoteByIdHandler,
	},
];


module.exports = { route };
