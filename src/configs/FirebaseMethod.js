import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app, db, storage } from "./FirebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const auth = getAuth(app);

const RegisterWithFB = async (obj) => {
  console.log(obj);
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, obj.email, obj.password)
    const user = userCredential.user
    const docRef = await addDoc(collection(db, "users"), {
      username: obj.username,
      email: obj.email,
      imgUrl: null,
      coverImgUrl: null,
      uid: user.uid
    });
    return { success: true, user };

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { success: false, errorMessage: error.message };
  }


}



const loginWithFB = async (obj) => {

  try {
    const userCredential = await signInWithEmailAndPassword(auth, obj.signinEmail, obj.signinPassword)
    const user = userCredential.user;
    return { success: true, user };

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { success: false, errorMessage: error.message };

  }

}
const GetDtaFromUserUid_DB = async (uid, dbn) => {
  if (uid) {
    const q = query(collection(db, dbn), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let userData = null;
    let docId = null;

    querySnapshot.forEach((doc) => {
      userData = doc.data();
      docId = doc.id;
    });

    return { userData, docId };
  } else {
    return null;
  }

};
const subscribeToAuthChanges = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, return the UID
      callback(user.uid);
    } else {
      // User is not signed in
      callback(null);
    }
  });

  // Return the unsubscribe function
  return unsubscribe;
};
const logoutUser = async () => {
  try {
    await auth.signOut(); // Call the signOut method from Firebase Auth
  } catch (error) {
    console.error("Logout error:", error);
    throw error; // Rethrow the error for handling in the caller
  }
};


async function uploadImage(files, email) {
  const storageRef = ref(storage, email);
  try {
    const uploadImg = await uploadBytes(storageRef, files);
    const url = await getDownloadURL(storageRef);
    console.log(url);
    return url;
  } catch (error) {
    console.log(error);
  }
}


const updateDocument = async (collectionName, docId, updates) => {
  try {
    const documentRef = doc(db, collectionName, docId);
    await updateDoc(documentRef, updates);
    return { success: true, message: "Document updated successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
const addBlogPost = async (obj, fileName) => {
  try {
    const docRef = await addDoc(collection(db, fileName), {
      ...obj,
      time: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, error: e };
  }
};

const deleteBlogFromFirestore = async (collectionName,id) => {
  try {
    const blogRef = doc(db, collectionName, id); 
    await deleteDoc(blogRef); 
    return { success: true, message: "blog Deleted successfully!" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
const getallDataInLine = async (uid, fileNme) => {
  let arr = [];
  try {
    const todosRef = collection(db, fileNme);
    const q = query(

      todosRef,
      where("uid", "==", uid),
      orderBy("time", "desc")
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return { success: true, arr};
    
  } catch (error) {
    return { success: false, error, };
  }
}
const fetchBlogs = async () => {
  let arr = []
  const todosRef = collection(db, "blogs");
  const q = query(

    todosRef,
    orderBy("time", "desc")
  );
  try {
    const blogsSnapshot = await getDocs(q);
    blogsSnapshot.docs.map(doc => {
      arr.push({ ...doc.data(), id: doc.id });
    });
    return { success: true, arr};
  } catch (error) {
    console.log(error);
    
    return { success: false, error, };
  }
};
export {
  RegisterWithFB,
  loginWithFB,
  GetDtaFromUserUid_DB,
  subscribeToAuthChanges,
  logoutUser,
  uploadImage,
  updateDocument,
  addBlogPost,
  getallDataInLine,
  deleteBlogFromFirestore,
  fetchBlogs
}