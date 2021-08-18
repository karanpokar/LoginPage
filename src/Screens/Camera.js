import React,{useEffect, useRef,useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,Image, Modal, Dimensions,Alert } from 'react-native'
import { RNCamera } from 'react-native-camera';
import firestore from '@react-native-firebase/firestore';
import * as ImagePicker from 'react-native-image-picker';
import { FIREBASE_IMAGE_ID, takePictureGallery,takePicture } from '../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Camera = () => {
const camera = useRef(null)
const [type, setType] = useState(true)
const [fullImage,setFullImage]=useState(false)
const [image,setImage]=useState('http://clipart-library.com/img/990375.jpg')

function selectImage() {
    let options = {
      title: 'Choose an Image',
      maxWidth: 1024,
      maxHeight: 1024,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      //console.log({ response });
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.assets[0].uri
        takePictureGallery(source)
      }
    });
  }

  const doc = firestore().collection('Image').doc(FIREBASE_IMAGE_ID);
    useEffect(() => {
        const subscriber = doc.onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
            setImage( documentSnapshot.data().name)
          });
    
        return () => subscriber();
      }, []);

    return (
        <View style={styles.container}>
        <Modal visible={fullImage} transparent={true}>
            <TouchableOpacity onPress={()=>{setFullImage(false)}} style={{flex:1,width:Dimensions.get('screen').width-50,alignSelf:'center',height:Dimensions.get('screen').height-100}}>
            <Image source={{uri:image}} style={{width:Dimensions.get('screen').width-50,height:Dimensions.get('screen').height-200,alignSelf:'flex-end'}}/>
            </TouchableOpacity>
        </Modal>
        <RNCamera
          ref={camera}
          style={styles.preview}
          type={type?'back':'front'}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          
        >
        <TouchableOpacity onPress={()=>setFullImage(true)} onLongPress={()=>setImage('http://clipart-library.com/img/990375.jpg')}>
        <Image source={{uri:image}} style={{width:80,height:80,alignSelf:'flex-end'}}/>
        </TouchableOpacity>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={()=>setType(!type)} style={styles.capture}>
            <Ionicons name={'camera-reverse'} size={32}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>takePicture(camera)} style={styles.capture}>
          <Ionicons name='camera' size={32}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={selectImage} style={styles.capture}>
          <Ionicons name='images' size={32}/>
          </TouchableOpacity>
        </View>
        </RNCamera>
      </View>
    );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Camera
