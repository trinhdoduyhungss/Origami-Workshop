import React, { useContext, useEffect, useState } from 'react'
import PageLayout from '../../components/page-layout'
import Origamis from '../../components/origamis'
import UserContext from '../../Context'
import { useParams, useHistory } from 'react-router-dom'

const ProfilePage = () => {
    const [username, setUsername] = useState('')
    const [posts, setPosts] = useState('')
    const context = useContext(UserContext)
    const history = useHistory()
    const params = useParams()

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getData = async () => {
        const id = params.userid
        const response = await fetch(`http://localhost:9999/api/user?id=${id}`)

        if (!response.ok) {
            history.push('/error')
        } else {
            let user = await response.json()
            user = user[0]
            setUsername(user.username)
            setPosts(user.posts && user.posts.length)
        }
    }

    const logOut = () => {
        context.logOut()
        history.push('/')
    }

    if (!username) {
        return (
            <PageLayout>
                <div>Loading...</div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <div>
                <p>User: {username}</p>
                <p>Posts: {posts}</p>

                <button onClick={logOut}>Logout</button>
            </div>
                <Origamis length={5} />
        </PageLayout>
    )
}

export default ProfilePage
