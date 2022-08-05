import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from 'react-router-dom';

import { useSearchParams } from 'react-router-dom';

const PublicRoute = (props: any) => {
    const { keycloak } = useKeycloak();

    const [serachParams] = useSearchParams();
    const target = serachParams.get('target');

    const {children } = props;

    const isLoggedIn = keycloak.authenticated;

    const redirectUrl = target ? target : '/registries'

    return isLoggedIn ? (<Navigate to={'/registries'} />) : children;
};

export default PublicRoute;