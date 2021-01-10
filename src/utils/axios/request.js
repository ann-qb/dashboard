export const onRequest = (config) => {
	const token = JSON.parse(localStorage.getItem('currentUser'))?.loggedUser?.token;
	if (token) {
		config.headers['Authorization'] = 'Bearer ' + token;
	}
    // config.headers['Content-Type'] = 'application/json';
    console.log(config);
	return config;
};

export const onRequestError = (error) => {
	Promise.reject(error);
};
