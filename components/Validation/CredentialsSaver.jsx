import AsyncStorage from '@react-native-async-storage/async-storage';

// Save user email and password to AsyncStorage
export async function SaveCredentials ({user}) {
    try {
        const userInfo = {
            user: user
        };

        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

    } catch (error) {
        console.error('Error saving credentials:', error);
    }
};

// Retrieve user credentials from AsyncStorage
export async function GetCredentials ({setUser}) {
    try {
        const userInfo = await AsyncStorage.getItem('userInfo');

        if (userInfo !== null) {
            // Parse the stored data
            const parsedUserInfo = JSON.parse(userInfo);
            setUser((prevUser) => ({
                ...prevUser,
                parsedUserInfo
            }))

            // Use the data as needed, e.g., for automatic login
            // ...
        }
    } catch (error) {
        console.error('Error retrieving credentials:', error);
    }
};

// Call the function to save or retrieve credentials as needed
// For example, to save credentials:
// saveCredentials('user@example.com', 'password123');

// To retrieve credentials:
// getCredentials();
