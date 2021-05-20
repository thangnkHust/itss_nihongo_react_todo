import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyB25zV3EAL7ty0JIfbr2i9ozoscApQWpKw",
  authDomain: "itss-nihongo-todos.firebaseapp.com",
  projectId: "itss-nihongo-todos",
  storageBucket: "itss-nihongo-todos.appspot.com",
  messagingSenderId: "109613432529",
  appId: "1:109613432529:web:82b8271b0ff95e3a684ff0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};
