import Keycloak from 'keycloak-js';

const url = process.env.REACT_APP_KEYCLOACK_URL || '';
const realm = process.env.REACT_APP_KEYCLOACK_REALM || '';
const clientId = process.env.REACT_APP_KEYCLOACK_CLIENT_ID || '';

const keycloak = new Keycloak({
    url,
    realm,
    clientId,
});

export { keycloak };


