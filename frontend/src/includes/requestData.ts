const requestData = async (url: string, data?: object): Promise<any> => {
    try {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined,
        };

        const response = await fetch(`http://localhost:8080/${url}`, options);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { requestData }