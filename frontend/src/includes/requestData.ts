const requestData = async (url: string, method?: string, data?: object, header?: Record<string, string>): Promise<any> => {
    try {
        const options: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(header || {})
            },
            body: data ? JSON.stringify(data) : undefined,
        };
        // console.log(options.headers)

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