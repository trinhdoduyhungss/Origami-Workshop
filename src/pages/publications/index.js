import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Origamis from '../../components/origamis'

const Publications = () => {
  return (
    <PageLayout>
      <Title title="Publications" />
      <Origamis length={5} />
    </PageLayout>
  )
}

export default Publications
