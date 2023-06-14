import React, { useState, useContext } from 'react'
import Title from '../../components/title'
import SubmitButton from '../../components/button/submit-button'
import styles from './index.module.css'
import PageWrapper from '../../components/page-layout'
import Input from '../../components/input'
import authenticate from '../../utils/authService'
import UserContext from '../../Context'
import { useHistory } from 'react-router-dom'

const LoginPage = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const context = useContext(UserContext)
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()

        // Place for validations before submit

        await authenticate('http://localhost:9999/api/user/login', {
            username, password
        }, (user) => {
            console.log('Yeyyyyy')
            context.logIn(user)
            history.push('/')
        }, (e) => {
            console.log('Error', e)
        })
    }

    return (
        <PageWrapper>
            <form className={styles.container} onSubmit={handleSubmit}>
                <Title title='Login' />
                <Input value={username} onChange={e => setUsername(e.target.value)} label="Username" id="username" />
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} label="Password" id="password" />
                <SubmitButton title='Login' />
            </form>
        </PageWrapper>
    )
}

export default LoginPage
