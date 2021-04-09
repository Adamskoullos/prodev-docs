# New project view

Below is the template and script for the component. Each project is created with a title, description and cover image:

```html
<template>
  <div class="row">
    <form @submit.prevent="handleSubmit" class="col-12" :class="{light: light}">
      <h4 :class="{light: light}">Create new project</h4>
      <input type="text" placeholder="Project title" v-model="title" :class="{light: light}" required>
      <textarea placeholder="Description" v-model="description" :class="{light: light}" required></textarea>
      <label :class="{light: light}" for="file-upload" class="file-upload-button">Upload project image</label>
      <input id="file-upload" type="file" @change="handleChange">
      <div class="error">{{ fileError }}</div>
      <button :class="{light: light}" v-if="!isPending">Add new project</button>
      <button :class="{light: light}" v-if="isPending" class="loading">Uploading...</button>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '../composables/useStorage'
import useCollection from '../composables/useCollection'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'
import { useRouter } from 'vue-router'


export default {
  props: ['light'],
  setup(){
    const title = ref('')
    const description = ref('')
    const projectImage = ref(null)
    const fileTypes = ['image/png', 'image/jpeg']
    const fileError = ref(null)
    const isPending = ref(false)

    const { uploadImage, error, filePath, url } = useStorage()
    const { addDoc } = useCollection('projects')
    const { user } = getUser()
    const router = useRouter()

    const handleSubmit = async () => {
      if(projectImage.value){
        isPending.value = true
        await uploadImage(projectImage.value)
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          imageUrl: url.value,
          filePath: filePath.value,
          tasks: [],
          createdAt: timestamp()
        })
        if(!error.value){
          isPending.value = false
          router.push({ name: 'SingleProject', params: { id: res.id } })
        }
      } 
      projectImage.value = null
      title.value = ''
      description.value = ''
      fileError.value = null
    }

    const handleChange = (e) => {
      const selected = e.target.files[0]
      if(selected && fileTypes.includes(selected.type)){
        projectImage.value = selected
        fileError.value = null
      } else{
        projectImage.value = null
        fileError.value = 'Please select an image file, jpeg or png'
      }
    }

    return { title, description, projectImage, fileError, handleSubmit, handleChange, error, isPending }
  }
}
</script>
```

Practically the user fills out the title and description then clicks on the file upload button, when an image is chosen the above `handleChange` function is invoked, which checks if the image is either a jpeg or png file type and then if so assigns the image as the value of the `projectImage`

Then the user clicks the `Add new project` button and invokes the `handleSubmit` function (above) which if an image is chosen, uploads the image to firebase storage and once the promise is resolved the `addDoc` function as invoked, also using the await keyword as the `addDoc` is an asynchronous function within the `useCollection` composable.

Once the response is returned from Firebase Firestore the user is pushed to the project view where they can add tasks.

Below is the `uploadImage` function from the `useStorage` composable and beneath that the `addDoc` snippet from the `useCollection` composable:

```js
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
```

```js
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
```