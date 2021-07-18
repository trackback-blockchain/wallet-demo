import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoggedIn } from 'reducers/app';

type PrivateRouteProps = {
    component: React.ComponentType<RouteProps>;
    exact?: boolean;
    path: string;
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
    const isUserRegistered = useSelector(isLoggedIn);
    
    return (
        <Route {...rest} render={props => {
            if (!isUserRegistered) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/welcome', state: { from: props.location } }} />
            }
 
            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export default PrivateRoute;