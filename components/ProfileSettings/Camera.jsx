import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Camera() {
    const [image, setImage] = useState(null);

    const takePhoto = async () => {
        let camPerm;

        try{
            camPerm = await ImagePicker.getCameraPermissionsAsync();
            if(!camPerm){
                console.log("You have no camera permission, requesting one")
                camPerm = await ImagePicker.requestCameraPermissionsAsync()
            }
        }catch (e){
            console.log(e)
        }

        if(camPerm){
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        }

    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Take a Photo" onPress={takePhoto}/>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
    );
}
