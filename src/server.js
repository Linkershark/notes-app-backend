console.log('API Started');
const Hapi = require('@hapi/hapi');
const {route} = require('./routes.js');
const server = Hapi.server({
	port: 5000,
	host: process.env.NODE_ENV !=='production' ? 'localhost' : '0.0.0.0',
	routes: {
		cors: {
			origin: ['*'],
		},
	},
});
const init = async () => {
	await server.start();
	server.route(route);
	console.log(`Server Running At ${server.info.uri}`);
}
init();
