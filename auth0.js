import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
    domain: 'dev-1amhow0a0ahynq64.eu.auth0.com',
    clientId: '5ZWWqJRrM2VxtbGBBQ47idAYsRiz6ZKP',
});

export const loginWithAuth0 = async () => {
    try {
        const credentials = await auth0.webAuth.authorize({
            scope: 'openid profile email', // Add the necessary scopes
        });
        // Handle successful authentication
        console.log('Credentials:', credentials);
        return credentials;
    } catch (error) {
        // Handle authentication error
        console.error('Authentication failed:', error);
        throw error;
    }
};

export const logoutWithAuth0 = () => {
    auth0.webAuth.clearSession();
    // Handle logout, navigate to the login screen, etc.
};
