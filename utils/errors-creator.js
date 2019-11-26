const createNotFoundError = message => Object.assign(new Error(), { message, status: 404 });
const createBadRequest = message => Object.assign(new Error(), { message: message || 'malformed request', status: 500 });

module.exports = {
	createNotFoundError,
	createBadRequest,
};
