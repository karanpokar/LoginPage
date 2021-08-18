import firestore from '@react-native-firebase/firestore';
export const FIREBASE_IMAGE_ID='6FnJWfkS9n1qQHTPSieZ'
export const FIREBASE_TEXT_ID='OsJdDHpzZebJERdT9UJm'

export const takePictureGallery = async (image) => {
    firestore()
.collection('Image')
.doc(FIREBASE_IMAGE_ID)
.set({
  name: image,
})
.then(() => {
  console.log('User added!');
});
    console.log(image);
};

{/*
export const takePictureGallery = async (image) => {
  firestore()
.collection('Image').add({name:image})
.then(() => {
console.log('Image added!');
});
  console.log(image);
};
*/}
export const takePicture = async (camera) => {
    if (camera) {
      const options = { quality: 1, base64: true };
      const data = await camera.current.takePictureAsync(options);
      firestore()
  .collection('Image')
  .doc(FIREBASE_IMAGE_ID)
  .set({
    name: data.uri,
  })
  .then(() => {
    console.log('User added!');
  });
      console.log(data.uri);
    }
  };

  export const setTextVal = async (text) => {
    console.log('text',text)
    firestore()
.collection('Text')
.doc(FIREBASE_TEXT_ID)
.set({
  Text: text,
})
.then(() => {
  console.log('User added!');
});
    console.log(text);
};