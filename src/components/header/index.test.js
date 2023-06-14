import React from 'react'
import renderer from 'react-test-renderer'
import Header from '.'
import TestingEnvironment from '../../test-utils/router'
import getNavigation from '../../utils/navigation'

describe('Header Component', () => {

    it('return authenticated route from getNavigation', () => {
        const links = getNavigation({isLoggedIn: true, id: '123'})
        const authLinks = [
            {
                title: "Publications",
                link: "/"
            },
            {
                title: "Share your thoughts",
                link: "/share"
            },
            {
                title: "Profile",
                link: `/profile/123`
            }
        ]
        console.log(links);
        expect(links).toStrictEqual(authLinks)
    })

    it('should render authenticated routes', () => {
        const tree = renderer.create(
            <TestingEnvironment value={{
                user: {
                    isLoggedIn: true,
                    id: '123'
                }
            }}>
                <Header />
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('should render non-authenticated routes', () => {
        const tree = renderer.create(
            <TestingEnvironment value={{
                user: {
                    isLoggedIn: false
                }
            }}>
                <Header />
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})
