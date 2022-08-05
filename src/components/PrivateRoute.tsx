import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from 'react-router-dom';
// import { useSearchParams, useLocation } from 'react-router-dom';

const PrivateRoute = (props: any) => {
    const { keycloak } = useKeycloak();
    // const locations = useLocation();
    // const target = locations.pathname
    const {children } = props;

    const isLoggedIn = keycloak.authenticated;

    console.log('isLoggedIn-----', );
    
    // const url = target ? target : '/'
    return isLoggedIn ? children : (<Navigate to={`/`} />);
};

export default PrivateRoute;

