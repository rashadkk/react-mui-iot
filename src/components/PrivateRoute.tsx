// import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from 'react-router-dom';

import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const PrivateRoute = (props: any) => {
    // const { keycloak } = useKeycloak();

    const [user] = useAuthState(auth);

    const {children } = props;

    const isLoggedIn = !!user;

    console.log('isLoggedIn-----', isLoggedIn);
    
    // const url = target ? target : '/'
    return isLoggedIn ? children : (<Navigate to={`/`} />);
};

export default PrivateRoute;

