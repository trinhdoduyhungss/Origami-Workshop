const authenticate = async (url, body, onSuccess, onFailure) => {
    try {
        const promise = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const response = await promise.json()

        console.log(response);

        if (response.username) {
            onSuccess({
                username: response.username,
                id: response._id
            })
        } else {
            onFailure()
        }

    } catch (e) {
        onFailure(e)
    }
}

export default authenticate