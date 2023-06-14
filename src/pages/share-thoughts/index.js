import React, { useState } from 'react'
import styled from 'styled-components'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import SubmitButton from '../../components/button/submit-button'
import Origamis from '../../components/origamis'

const ShareThoughtsPage = () => {
  const [publication, setPublication] = useState('')
  const [updatedOrigami, setUpdatedOrigami] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()

    await fetch('http://localhost:9999/api/origami', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        description: publication
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setPublication('')
    setUpdatedOrigami([...updatedOrigami, 1])
  }

  return (
    <PageLayout>
      <Title title="Share your thoughts..." />
      <Container>
        <form onSubmit={handleSubmit}>
          <div>
            <TextArea value={publication} onChange={e => setPublication(e.target.value)} />
          </div>
          <div>
            <SubmitButton title="Post" />
          </div>
        </form>
      </Container>
      <Origamis length={3} updatedOrigami={updatedOrigami} />
    </PageLayout>
  )
}

const Container = styled.div`
    text-align: center
`

const TextArea = styled.textarea`
width: 40%;
display: block;
margin: 0 auto;
resize: none;
padding: 2%;
height: 10vh;
font-style: italic;
border-radius: 6px;
border:1px solid #234465;
color: #234465;
`

export default ShareThoughtsPage
