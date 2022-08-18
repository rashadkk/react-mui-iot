import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from 'react-router-dom';

import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const PublicRoute = (props: any) => {
    // const { keycloak } = useKeycloak();
    const [user] = useAuthState(auth);

    const {children } = props;

    const isLoggedIn = !!user;

    return isLoggedIn ? (<Navigate to={'/registries'} />) : children;
};

export default PublicRoute;