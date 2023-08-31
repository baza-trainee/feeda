const url = 'http://localhost:8000';

export const sendApplication = async (data: unknown) => {
	try {
		const response = await fetch(`${url}/user-project/join/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json; charset=UTF-8' },
			body: JSON.stringify(data),
		});
		return response.json();
	} catch (error) {
		console.log('error', error);
	}
};

function load(url: string) {
	// eslint-disable-next-line no-async-promise-executor
	return new Promise(async function (resolve) {
		const res = await fetch(url);

		resolve(res.json());
	});
}

export const fetchProjectTypes = load(`${url}/user-project/types-project-list/`);
export const fetchProjects = load(`${url}/user-project/projects/`);
