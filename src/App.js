import React, { useState, useEffect } from 'react'
import UserContext from './Context'

const App = (props) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const logIn = (user) => {
        setUser({ ...user, isLoggedIn: true })
    }

    const logOut = () => {
        document.cookie = 'x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
        setUser({ isLoggedIn: false })
    }

    useEffect(() => {
        fetch('http://localhost:9999/api/user/verify', {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(promise => {
            return promise.json()
        }).then(response => {
            if (response.status) {
                logIn({
                    username: response.user.username,
                    id: response.user._id
                })
            } else {
                logOut()
            }
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <UserContext.Provider value={{
            user,
            logIn,
            logOut
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default App