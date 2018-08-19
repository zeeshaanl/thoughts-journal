import * as React from "react";
import {
    Route,
    Redirect
} from 'react-router-dom'
import User from "../../domain/viewModel/User";
import Thoughts from "./Thoughts/Thoughts";

const ProtectedRoute =
    ({component: Component, isLoggedIn, ...rest}: { component: typeof React.Component, isLoggedIn: boolean }): any => {
        return (
            <Route {...rest} render={(props) => (
                isLoggedIn ? <Component {...props} {...rest} />
                    : <Redirect to={{
                        pathname: '/login', state: {from: props.location}
                    }} />
            )} />
        )
    };

export default ProtectedRoute;