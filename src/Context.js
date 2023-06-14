import React from 'react';

const UserContext = React.createContext({
    user: null,
    logIn: () => {},
    logout: () => {}
})

export default UserContext
