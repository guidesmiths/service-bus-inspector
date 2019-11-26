
const handlingResponse = (successStatus = [200], errorMessage = 'Error') => ({ status, data }) => {
	if (!successStatus.includes(status)) {
		const error = new Error(errorMessage);
		error.statusCode = status;
		throw error;
	}
	return data;
};

const logError = error => {
	// Add aplication Insight
	throw error.response.data;
};

module.exports = {
	handlingResponse,
	logError,
};
