import React from 'react'
import renderer from 'react-test-renderer'
import PageLayout from '.'
import TestingEnvironment from '../../test-utils/router'
jest.mock('../header', () => 'Header')
jest.mock('../aside', () => 'Aside')
jest.mock('../footer', () => 'Footer')

describe('PageLayout Component', () => {

    it('should render pageLayout component', () => {
        const tree = renderer.create(
            <TestingEnvironment value={{
                user: {
                    isLoggedIn: true,
                    id: '123'
                }
            }}>
                <PageLayout />
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
