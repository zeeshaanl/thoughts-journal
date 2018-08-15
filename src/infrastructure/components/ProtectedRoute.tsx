import * as React from "react";
import {
    Route,
    Redirect
} from 'react-router-dom'
import User from "../../domain/viewModel/User";
import Thoughts from "./Thoughts/Thoughts";

const ProtectedRoute =
    ({component: Component, user, ...rest}: { component: typeof React.Component, user: User }): any => {
        return (
            <Route {...rest} render={(props) => (
                user ? <Component user={user} {...props} />
                    : <Redirect to={{
                        pathname: '/login', state: {from: props.location}
                    }} />
            )} />
        )
    }

export default ProtectedRoute;