# New Bug View

The new bug view has a simple form where the user can add a bug title which is used when filtering bugs, a description of the issue and an opportunity to paste in any error messages (if relevant). Below is the template for this:

```html
<template>
  <div class="row">
    <form @submit.prevent="handleSubmit" class="col-12" :class="{light: light}">
      <h4 :class="{light: light}">Create new bug</h4>
      <input type="text" placeholder="Bug title" v-model="title" :class="{light: light}" required>
      <textarea placeholder="Description of the issue" v-model="description" :class="{light: light}" required></textarea>
      <textarea placeholder="Paste error message here" v-model="errorMessage" :class="{light: light}" required></textarea>
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending" :class="{light: light}">Add new bug</button>
      <button v-if="isPending" class="loading" :class="{light: light}">Uploading...</button>
    </form>
  </div>
</template>
```

Below is the script for the component, focusing on the `handleSubmit` function:

We are adding a new document to the bugs collection so first we are importing `useCollection` and extracting the `addDoc` function.  Once the user completes the form and hits submit the `handleSubmit` function is fired.

The `isPending` value is set to true showing the `Uploading...` button to let the user know something is happening. The await keyword is used before invoking the `addDoc` function saving the response to a const.  We pass in an object which is the document to be added to the collection, adding the user inputs.  The object also has the user name and id attached to it, the initial value of `solved` set to false, the `solution` as an empty string and with both the future solution image file path and public url set to null. And lastly a created at time stamp.

There was much consideration on wether to create a solutions array at this stage, however this way, each time a user adds a solution it over-writes the previous offering.  

This can be used in the following ways:

The bugs gets added, further information on the issue can be added uploading a visual of the error or code where the error is triggering.

Then once solved this can be overwritten with the actual solution description and solution image.  This keeps things simple and for future visitors to quickly see the final solution.

```html

<script>
import { ref } from '@vue/reactivity'
import useCollection from '../composables/useCollection'
import getUser from '../composables/getUser'
import { timestamp } from '../firebase/config'
import { useRouter } from 'vue-router'

export default {
  props: ['light'],
  setup(){
    const title = ref('')
    const description = ref('')
    const errorMessage = ref('')
    const isPending = ref(false)

    const { addDoc, error } = useCollection('bugs')
    const { user } =getUser()
    const router = useRouter()

    const handleSubmit = async () => {
      isPending.value = true
      const res = await addDoc({
        title: title.value,
        description: description.value,
        errorMessage: errorMessage.value,
        userId: user.value.uid,
        userName: user.value.displayName,
        solution: '',
        solved: false,
        imageUrl: null,
        filePath: null,
        createdAt: timestamp()
      })
      if(!error.value){
        isPending.value = false
        router.push({ name: 'SingleBug', params: { id: res.id } })
      }
      title.value = ''
      description.value = ''
      errorMessage.value = ''
    }

    return { title, description, errorMessage, isPending, handleSubmit, error }
  }
}
</script>

```