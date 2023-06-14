import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Publications from './pages/publications'
import ShareThoughtsPage from './pages/share-thoughts'
import RegisterPage from './pages/register'
import LoginPage from './pages/login'
import ProfilePage from './pages/profile'
import ErrorPage from './pages/error'
import UserContext from './Context'

const Navigation = () => {
    const context = useContext(UserContext)
    console.log(context);
    const loggedIn = context.user.isLoggedIn

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Publications} />
                <Route path="/share">
                    {loggedIn ? (<ShareThoughtsPage />) : (<Redirect to="/login" />)}
                </Route>
                <Route path="/register">
                    {loggedIn ? (<Redirect to="/" />) : (<RegisterPage />)}
                </Route>
                <Route path="/login">
                    {loggedIn ? (<Redirect to="/" />) : (<LoginPage />)}
                </Route>
                <Route path="/profile/:userid">
                    {loggedIn ? (<ProfilePage />) : (<Redirect to="/login" />)}
                </Route>
                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    )
}

// const LazyPublications = React.lazy(() => import('./pages/publications'))
// const LazyShareThoughtsPage = React.lazy(() => import('./pages/share-thoughts'))
// const LazyRegisterPage = React.lazy(() => import('./pages/register'))
// const LazyLoginPage = React.lazy(() => import('./pages/login'))
// const LazyProfilePage = React.lazy(() => import('./pages/profile'))
// const LazyErrorPage = React.lazy(() => import('./pages/error'))

// const LazyNavigation = () => {

//     return (
//         <BrowserRouter>
//             <Switch>
//                 <Suspense fallback={<h1>Loading...</h1>}>
//                     <Route path="/" exact component={LazyPublications} />
//                     <Route path="/share" component={LazyShareThoughtsPage} />
//                     <Route path="/register" component={LazyRegisterPage} />
//                     <Route path="/login" component={LazyLoginPage} />
//                     <Route path="/profile/:userid" component={LazyProfilePage} />
//                     <Route component={LazyErrorPage} />
//                 </Suspense>
//             </Switch>
//         </BrowserRouter>
//     )
// }

// export default LazyNavigation
export default Navigation
