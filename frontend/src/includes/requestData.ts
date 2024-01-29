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

        const response = await fetch(`http://localhost:8080/${url}`, options);
        const responseData = await response.json();
console.log(responseData)
        if (!response.ok) {
            return {
                success: false,
                message: responseData,
            };
        }

        return responseData;
    } catch (error) {
        // console.error(error);
        return {
            success: false,
            message: error! || 'An error occurred during the request.',
        };
    }
};

export { requestData }