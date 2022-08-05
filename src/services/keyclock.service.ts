import Keycloak from 'keycloak-js';

// "realm": "GCP",
// "auth-server-url": "https://keycloak12.cloud.korewireless.com/auth/",
// "ssl-required": "external",
// "resource": "webapp",
// "public-client": true,
// "confidential-port": 0
const keycloak = new Keycloak({
    url: 'https://keycloak12.cloud.korewireless.com/auth/',
    realm: 'GCP',
    clientId: 'webapp',
});
keycloak.onReady = (auth: boolean) => {
    console.log('token@@@@-----', keycloak.token);
    
  }
// keycloak.on
if(keycloak) {
    keycloak.onTokenExpired = () => {

    }
    // keycloak?.onReady((auth: boolean) => {
    
    // })
}

export { keycloak };
// export default class KeyCloakClass {
//     constructor() {
//         store.dispatch({
//             type: actionTypes.SET_IS_SIGN_IN,
//             isSignIn: true
//         })

//     const keycloakInit =()=>{

//         if (!window.location.href.includes("activate")) {
//             keycloak.init({
//                 onLoad: "check-sso", checkLoginIframe: true
//                 , silentCheckSsoRedirectUri: `${BASE_URL}/silent-check-sso.html`
//             }).then((authenticated) => {
//                 if (!authenticated) {
//                     document.cookie = "UserLoggedIn=false";
//                     store.dispatch({
//                         type: actionTypes.SET_IS_SIGN_IN,
//                         isSignIn: false
//                     })
//                     this.switchUrl();
//                     this.logoutHandler();
//                     store.dispatch({
//                         type: actionTypes.SET_HOMEPAGE,
//                         isHomePage: true
//                     })

//                 } else {
//                     document.cookie = "UserLoggedIn=true";
//                     store.dispatch({
//                         type: actionTypes.SET_HOMEPAGE,
//                         isHomePage: true
//                     })
//                 //show SignOut Button faster if authenticated.
//                 if(!localStorage.getItem('accessToken')) {
//                     store.dispatch({
//                         type: actionTypes.AUTHORIZE,
//                         isAuthorized: true,
//                         portalAccessPopup: false
//                     })
//                     //store authentication tokens in localStorage for usage in app
//                     this.setTokens();
//                 }

//                 }
//             })
//                 .catch(err => {
                    
//                     store.dispatch({
//                         type: actionTypes.SET_IS_SIGN_IN,
//                         isSignIn: false
//                     })
//                     store.dispatch({
//                         type: actionTypes.SET_HOMEPAGE,
//                         isHomePage: true
//                     })
//                     this.switchUrl();
//                     this.logoutHandler();
//                 })
//         }
//     }

//        function getCookie(username) {
//            try{ 
//            let name = username + "=";
//            let spli = document.cookie.split(';');    
//            for(var j = 0; j < spli.length; j++) {
//               let char = spli[j];
//               while (char.charAt(0) === ' ') {
//                  char = char.substring(1);
//                }
//              if (char.indexOf(name) === 0) {
//                 return char.substring(name.length, char.length);
//               }
//            }
//          return "";
//         } catch(err) {
//            // console.log("Error in getCookie: ",err);
//         } 
//         }

//       //decreasing the expiration time by 8 seconds to avoid any conflict.
//         const milliseconds = (localStorage.getItem('exp') * 1000)-8000 
//         const expiryTime = new Date(milliseconds);

//       // if user was logged in and has token in localstorage
//        if(localStorage.getItem('idToken') && localStorage.getItem('accessToken') && expiryTime >new Date()  && getCookie('UserLoggedIn')) 
//         {
//             store.dispatch({
//                     type: actionTypes.SET_IS_SIGN_IN,
//                     isSignIn: true
//                     })
//             store.dispatch({
//                     type: actionTypes.AUTHORIZE,
//                      isAuthorized: true
//                     }); 
//             this.switchUrl();
//             this.setTokens(true);
//             setTimeout( ()=>{ keycloakInit()}, 5000);
//         }
//         //user not logged in or token expired.
//         else { 
//             localStorage.removeItem('idToken');
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('exp');
//              store.dispatch({
//                     type: actionTypes.SET_IS_SIGN_IN,
//                     isSignIn: true
//                 })

//             //if not authenticated, sets button as SignIn in keycloakInit - logoutHandler()
//             keycloakInit();
//             this.switchUrl();
//         }

//         if (window.location.href === `${BASE_URL}/`) {
//             store.dispatch({
//                 type: actionTypes.SET_HOMEPAGE,
//                 isHomePage: true
//             })   
//         }
//         else {
//             store.dispatch({
//                 type: actionTypes.SET_HOMEPAGE,
//                 isHomePage: false
//             })
            
//         }

//         /// check whether the url is from dev portal or directly clicked
//         if (window.location.href !== `${BASE_URL}/` && !window.location.href.includes("activate") && !window.location.href.includes("state") && !localStorage.getItem('isRedirectUrl')) {
//             localStorage.setItem('redirectUrl', window.location.href);
//          //   let url = localStorage.getItem('redirectUrl');
//         }
//         else {
//             localStorage.removeItem('isRedirectUrl');
//         }
        
//     }
//     logoutHandler() {
//         localStorage.removeItem('idToken');
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('exp');
//         store.dispatch({
//             type: actionTypes.AUTHORIZE,
//             isAuthorized: false
//         })
//     }

//     setTokens(isTokenAvailable = false) {
//         store.dispatch({
//             type: actionTypes.SET_IS_SIGN_IN,
//             isSignIn: true
//         })
//         let idToken= isTokenAvailable ? localStorage.getItem('idToken') : keycloak.idToken ;
//         let parsedIdToken = this.parseJwt(idToken) ;

//         axios.defaults.headers.common['Authorization'] = idToken;
//         let organization;
//         axios.get(`${USER_MANAGEMENT_API_URL}/user/details`)
//             .then(({ data }) => {
//                 let user = { ...data.data.user }
//                 organization = user.organization;
//                 if (Object.keys(user).length > 0) {
//                     if(!isTokenAvailable) { 
//                     localStorage.setItem('accessToken', keycloak.token);
//                     localStorage.setItem('idToken', keycloak.idToken);
//                     localStorage.setItem('exp', parsedIdToken.exp);
//                     }
//                     store.dispatch({
//                         type: actionTypes.SET_AUTHORIZER_DATA,
//                         data: user
//                     })
//                     // get user type
//                     store.dispatch({
//                         type: actionTypes.SET_IS_SIGN_IN,
//                         isSignIn: false
//                     })
//                     store.dispatch({
//                         type: actionTypes.AUTHORIZE,
//                         isAuthorized: true,
//                         portalAccessPopup: false,
//                         isPortalAdmin: user && user.roles && user.roles.includes("kore_admin"),
//                         isAccountAdmin: user && user.roles && user.roles.includes("account_admin"),
//                         isClientOwner: user && user.roles && user.roles.includes("client_owner"),
//                         isDeveloper: user && user.roles && user.roles.includes("developer")
//                     })
//                     store.dispatch({
//                         type: actionTypes.SET_ORGANIZATION,
//                         organization: organization ? organization.toLowerCase() : "unknown"
//                     })
//                     this.switchUrl();

//                     axios.get(`${USER_MANAGEMENT_API_URL}/system/devPortal/user/${parsedIdToken.email}/organization?organization=${encodeURIComponent(organization?.toLowerCase())}`)
//                         .then(({ data }) => {
//                             if (data.data) {
//                                 let services = data.data, userType = "localUser";
//                                 store.dispatch({
//                                     type: actionTypes.SET_SERVICES,
//                                     services: services
//                                 })
//                                 this.switchUrl();

//                             } else {
//                                 store.dispatch({
//                                     type: actionTypes.SET_SERVICES,
//                                     services: []
//                                 })
//                                 this.switchUrl();
//                             }

//                         })
//                         .catch((e) => {
//                             store.dispatch({
//                                 type: actionTypes.SET_SERVICES,
//                                 services: []
//                             })
//                             this.switchUrl();
//                         })
//                     //log user login activity
//                     axios.post(`${USER_MANAGEMENT_API_URL}/user/${parsedIdToken.email}/track?organization=${encodeURIComponent(organization.toLowerCase())}`)
//                         .then(() => {
//                             // console.log("login activity has been logged")
//                         })
//                         .catch((e) => console.error("Error in loging user activity ", e))
//                 } else {
//                     store.dispatch({
//                         type: actionTypes.SET_IS_SIGN_IN,
//                         isSignIn: false
//                     })
                    
//                     store.dispatch({
//                         type: actionTypes.AUTHORIZE,
//                         isAuthorized: false,
//                         portalAccessPopup: true
//                     })
//                     this.switchUrl();
//                 }
//             })
//             .catch((err) => {
                
//                 store.dispatch({
//                     type: actionTypes.SET_IS_SIGN_IN,
//                     isSignIn: false
//                 })
//                 store.dispatch({
//                     type: actionTypes.AUTHORIZE,
//                     isAuthorized: false,
//                     portalAccessPopup: true
//                 })
//                 localStorage.removeItem('idToken');
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('exp');
//             })
//     }

//     ///// to redirect to url if directly clicked
//     switchUrl = () => {
//         if (localStorage.getItem('redirectUrl')) {
//             let url = localStorage.getItem('redirectUrl');
//             localStorage.removeItem('redirectUrl');
//             localStorage.setItem('isRedirectUrl', true);
//             store.dispatch({
//                 type: actionTypes.SET_REDIRECT_URL,
//                 isRedirectUrl: true,
//                 redirectUrl: url
//             })
//         }
//     }

//     parseJwt(token: string) {
//         try{
//             let base64Url = token.split('.')[1];
//             let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//             let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
//                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//             }).join(''));

//             return JSON.parse(jsonPayload);
//         }
//         catch(err) {
//             localStorage.removeItem('idToken');
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('exp');
//             store.dispatch({
//                 type: actionTypes.SET_IS_SIGN_IN,
//                 isSignIn: false
//             })
//             store.dispatch({
//                 type: actionTypes.AUTHORIZE,
//                 isAuthorized: false,
//                 portalAccessPopup: true
//             })
//         }  
//     }

//     static onLogoutClicked = async () => {
//         if (keycloak && localStorage.getItem('idToken')) {
//             try {
//                 keycloak.logout({
//                     redirectUri: `${BASE_URL}`
//                 })
//                 //to avoid conflict, clear these itemd from localStorage
//                 localStorage.removeItem('idToken');
//                 localStorage.removeItem('accessToken');
//                 localStorage.removeItem('exp');
//             } catch (e) {
//                //  console.log("error in logout ", e)
//             }
//         }
//     }
//     static onLogInClicked = async () => {
//         try {
//             keycloak && keycloak.login();
//         } catch(err) {
//           //  console.error(err);
//         }
//     }

// }

// keycloak.onTokenExpired = () => {
//     keycloak.updateToken(2).then((refreshed: any) => {
//         if (refreshed) {//}) && localStorage.getItem('exp') && checkExpirationTime(+localStorage.getItem('exp')) > 180) {
//             localStorage.setItem('accessToken', keycloak && keycloak.token);
//             localStorage.setItem('idToken', keycloak && keycloak.idToken);
//             localStorage.setItem('exp', keycloak && keycloak.tokenParsed?.exp);
//             axios.defaults.headers.common['Authorization'] = keycloak && keycloak.idToken;
//         } else {
//             //console.log('not refreshed ', keycloak.token);
//         }
//     }).catch(() => {
//         localStorage.removeItem('idToken');
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('exp');
//         store.dispatch({
//             type: actionTypes.AUTHORIZE,
//             isAuthorized: false
//         })
//     });
// }

