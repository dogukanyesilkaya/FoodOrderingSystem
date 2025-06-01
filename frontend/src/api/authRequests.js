export async function registerRequest(userData) {
	try {
		const response = await fetch('http://localhost:8000/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const authToken = response.headers.get("Authorization");

		console.log('Success:', authToken);

		return authToken.substring(7);

	} catch (error) {
		console.error('Error:', error);
	}
}
export async function loginRequest(userData) {
	try {
		const response = await fetch('http://localhost:8000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const authToken = response.headers.get("Authorization");

		console.log('Success:', authToken);

		return authToken.substring(7);

	} catch (error) {
		console.error('Error:', error);
	}
}

