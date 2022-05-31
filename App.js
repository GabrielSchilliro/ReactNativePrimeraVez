import React, {useState} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null)

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    
    if (pickerResult.cancelled === true) {
      return;
    }
    
    setSelectedImage({localUri: pickerResult.uri});

  }

  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('Sharing, is not available on your platform');
      return;
    }

    Sharing.shareAsync(selectedImage.localUri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>pick and image</Text>
      <TouchableOpacity
        onPress={openImagePickerAsync}
      >
      <Image
        source={{uri: selectedImage !== null ? selectedImage.localUri: 'https://picsum.photos/200/200'}}
        style={styles.image}
      />
      </TouchableOpacity>
      {selectedImage ? (

        <TouchableOpacity
        onPress={openShareDialog}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Share this image</Text>
        </TouchableOpacity>
        ) : <View/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 30, color: '#fff'},
  image: {height: 200, width:200, borderRadius: 100, resizeMode: 'contain'},
  button: {
    backgroundColor: 'blue',
    padding: 7,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  }
});
