import {useAuth0} from "react-native-auth0";
import {Button} from "react-native";
import React from "react";

export const LoginButton = () => {
    const {authorize} = useAuth0();

    const onPress = async () => {
        try {
            await authorize();
        } catch (e) {
            console.log(e);
        }
    };

    return <Button onPress={onPress} title="Log in" />
}