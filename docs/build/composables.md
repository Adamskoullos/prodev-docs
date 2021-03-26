## Composables

The project utilises the following composablse which we will dissect now: 

- getUser
- useSignup
- useLogin
- useLogout
- getCollection
- useCollection
- getDocument
- useDocument
- useStorage

--------------------------------------

## getUser

![Screenshot from 2021-03-26 11-42-01](https://user-images.githubusercontent.com/73107656/112626587-50c73280-8e28-11eb-940e-10d4cdebf444.png)

Ref and firebase auth are imported, a const `user` is created as a ref and the value of the current user is assigned to user.  If there is a current user logged in the value of user is the user object, if not the value is `null`.

Then a firebase auth method is used to add a listener for any changes in user auth and re-assigns the value of `user` on every update

the `getUser()` function is exported, which has access to `user` through closure.  `user` is returned when getUser is destructed.

This composable is used any time we want to check user auth for say route guarding, adding a document to a collection, giving the user access to their own collection, logging a user in etc.

## useSignup

```js
import { ref } from "@vue/reactivity"
import { fAuth } from "../firebase/config"

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
    error.value = null
    isPending.value = true
    try{
        const res = await fAuth.createUserWithEmailAndPassword(email, password)
        if(!res){
            throw new Error('Could not complete the signup, please try again')
        }
        await res.user.updateProfile({ displayName })
        error.value = null
        isPending.value = false

        return res

    } 
    catch(err){
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }
}

const useSignup = () => {
    return { error, signup, isPending }
}

export default useSignup
```


`useSignup` is exported which returns properties `isPending` and `error` and also the `signup()` function.  when the `signup()` is invoked it takes in the user inputs: `email`, `password` and `userName`

error is set to null and isPending to true to use the boolean to show any loading elements.  `signup()` is an asynchronous function as it is communicating with firebase and we use `try`, `catch` blocks to manage the response.

The return value of a successful response is saved to a const `res`, which is ultimately returned. If firebase has successfully accepted and created a new user the user profile is updated with their displayName.  Once this has been completed via the `await` keyword the `ispending` property is set back to false and `res` is returned


## useLogin

```js
import { ref } from "@vue/reactivity"
import { fAuth } from "../firebase/config"

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    error.value = null
    isPending.value = true
    try{
        const res = await fAuth.signInWithEmailAndPassword(email, password)
        error.value = null
        isPending.value = false
        return res
    }
    catch(err) {
        error.value = 'Incorrect login credentials'
        isPending.value = false
    }
}

const useLogin = () => {
    return { error, login, isPending }
}

export default useLogin

```

Same structural pattern as previous, the `login()` function takes in the user input: `email` and `password`.  within the `try` block `await` is used ahead of calling firebase Auth and using the authentication method to attempt logging the user in. Once a successful response has been returned error is set to null and isPending to false, with the response `res` being returned from `login()`.

## useLogout

```js

import { ref } from "@vue/reactivity"
import { fAuth } from "../firebase/config"

const error = ref(null)
const isPending = ref(false)

const logout = async () => {
    error.value = null
    isPending.value = true
    try{
        await fAuth.signOut()
        isPending.value = false
    }
    catch(err) {
        error.value = err.message
        isPending.value = false
        console.log(error.value)
    }
}

const useLogout = () => {
    return { error, logout, isPending }
}

export default useLogout

```

Same pattern again, but using the the Firebase auth method `signout()`


## getCollection

```js

import { ref } from "@vue/reactivity"
import { watchEffect } from "@vue/runtime-core"
import { fStore } from "../firebase/config"



const getCollection = (collection, query) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = fStore.collection(collection).orderBy('createdAt',"desc")

    if(query){
        collectionRef = collectionRef.where(...query)
    }

    const unsub = collectionRef.onSnapshot((snap) => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        error.value = 'Could not fetch data'
        documents.value = null
    })
    // unsub method to prevent multiple onSnapshot events running at the same time
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection

```

We also import `watchEffect` here, similar to `watch`, `watchEffect` is a listener for updates to reactive properties and fires its callback every time there is an update.  Unlike `watch`, `watchEffect` runs initially on load as well. we will come back to this.

`getCollection` takes in two arguments: `collection` and `query` with query being some kind of filter to only grab specific documents within a collection that meet a criteria.  `documents` is initially null but is returned as an array of document objects from a collection.

First we make a reference to the target collection and we are also ordering the documents using the firestore method.

Then the `if` statement checks to see if there is a query to return a filtered collection and if so chains the query onto the collection reference  by using the `where()` method and spreading the query in.

Below that we add create a const `unsub` which we will come back to and add the firebase `onSnapshot` listener to the collection ref which fires every time there is an update to a document.  

Diving into the callback, which takes in the particular snapshot `snap`, first the results array is set to empty, then a `forEach` is used on the firebase `doc.docs` to cycle through each document in the collection.

`data()` is a firestore method to acces the document data and first there is a check for a `createdAt` property from firestore to make sure the snapshot data is not the locally emitted data, then each docs data is spread into the results array.  The id is added separately as this property is not in the document object data but on the document.   

Then the results array is assigned as the value of `documents`, with `documents` being returned from `getCollection`.

`onSnapshot` listeners do not by default unsubscribe when the view un mounts, so to prevent them from building up on top of each other we stick the const `unsub` in front of the `onSnapshot` so we can invoke it and stop the listener.

This is done just above the returned object within the `watchEffect` function, using `onValidate()`.


## useCollection

```js

import { ref } from '@vue/reactivity'
import { fStore } from '../firebase/config'


const useCollection = (collection) => {
    const error = ref(null)
    const isPending = ref(false)

    const addDoc = async (doc) => {
        error.value = null
        isPending.value = true
        try{
            const res = await fStore.collection(collection).add(doc)
            isPending.value = false
            return res
        }
        catch(err){
            console.log(err.message)
            isPending.value = false
            error.value = 'Unable to send this message'
        }
    }
    return { addDoc, error, isPending }
}

export default useCollection

```

Again the same composable structure. `useCollection` takes in the collection as an argument when destructed and returns the `addDoc()` function, which itself takes in an argument, the new document to be added to the collection.

Then simply using the firestore method `add()` an attempt to add the document to the db is made. Again this is asynchronous so the keyword `await` is used.  The returned value is saved to a const `res`, which is returned from the `addDoc()` function.


## getDocument

```js

import { ref } from "@vue/reactivity"
import { watchEffect } from "@vue/runtime-core"
import { fStore } from "../firebase/config"



const getDocument = (collection, id) => {
    const document = ref(null)
    const error = ref(null)

    let docRef = fStore.collection(collection).doc(id)

    const unsub = docRef.onSnapshot((doc) => {
        if(doc.data()){
            document.value = {...doc.data(), id: doc.id}
            error.value = null
        } else{
            error.value = 'That project does not exist'
        }

    }, (err) => {
        console.log(err.message)
        error.value = 'Could not fetch data'
        document.value = null
    })
    // unsub method to prevent multiple onSnapshot events running at the same time
    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { document, error }
}

export default getDocument

```

The `getDocument` function takes in the collection and document id when it is invoked and destructed, and returns `document`.

First a reference to the document is made `docRef`, then a const `unsub` (we have seen this before) is defined and used as before as a way of stopping the `onSnapshot` listener. A listener is added to the document and `if` the document has data (exists) the document data is assigned as the value of `document`.


## useDocument

```js

import { ref } from '@vue/reactivity'
import { fStore } from '../firebase/config'

const useDocument = (collection, id) => {
    
    let error = ref(null)
    let isPending = ref(false)

    let docRef = fStore.collection(collection).doc(id)

    const deleteDoc = async () => {
        isPending = true
        error.value = null
        
        try{
            const res = await docRef.delete()
            isPending = false
            return res
        }
        catch(err){
            error.value = 'Unable to delete the project'
            isPending = false
            console.log(err.message)
        }
    }

    const updateDoc = async (updates) => {
        isPending = true
        error.value = null
        
        try{
            const res = await docRef.update(updates)
            isPending = false
            return res
        }
        catch(err){
            error.value = 'Unable to update'
            isPending = false
            console.log(err.message)
        }
    }

    return { updateDoc, deleteDoc, error, isPending }
}

export default useDocument

```

`useDocument` takes in the collection and doc id when destructed and returns the `deleteDoc` and `updateDoc` functions. 

the document reference `docRef` is used in both functions which they have access to via closure.

The `deleteDoc()` function takes no argument and simply uses the `delete()` method.

The `updateDoc()` function takes in an object including any properties and values to be updated. This function is used to update the project document when the tasks array is updated.


## useStorage

```js

import { ref } from "@vue/reactivity"
import { fStorage } from "../firebase/config"
import getUser from '@/composables/getUser'

const { user } = getUser()

const useStorage = () => {
    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `projectImages/${user.value.uid}/${file.name}`
        const storageRef = fStorage.ref(filePath.value)
        try{
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        }
        catch(err){
            console.log(err.message)
            error.value = err.message
        }
    }

    const deleteImage = async (path) => {
        const storageRef = fStorage.ref(path)
        try{
            await storageRef.delete()
        }
        catch(err){
            error.value = err.message
            console.log(error.value)
        }
    } 

    return { error, url, filePath, uploadImage, deleteImage }
}

export default useStorage 

```

This composable is used to add images to and remove images from firebase storage.  We import `getUser` so we can add images to the users image folder as well as delete the image from their image folder.

To upload an image we first need to define a filepath and save it to a ref `filePath`. We then use the filePath to create a const `storageRef`. Then within the `try` block use `storageRef` to upload the image using the firebase storage method `put()`

We save the response `res` and then use it to get the public url to access the image and display it within the application, saving this to `url`

Both the `filePath` and `url` are also returned so can be used within the app.

`deleteImage` takes in the `path` as an argument when it is invoked.

