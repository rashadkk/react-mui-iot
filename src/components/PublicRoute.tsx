import { useKeycloak } from "@react-keycloak/web";
import { Navigate } from 'react-router-dom';

const PublicRoute = (props: any) => {
    const { keycloak } = useKeycloak();

    const {children } = props;

    const isLoggedIn = keycloak.authenticated;

    return isLoggedIn ? (<Navigate to={'/registries'} />) : children;
};

export default PublicRoute;