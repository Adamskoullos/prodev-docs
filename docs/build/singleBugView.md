# Single Bug View

Each bug within the `Bugs` view is presented in its own card and can be clicked to open the full view for that specific bug.  Below is the `SingleBug` view.

Owners of the issue have access to the `solved` button changing the bugs state, all users have access to the `Add Solution` button and can contribute solutions.

The template has the nested component `AddSolution` which is the form that allows the user to add a solution string and upload an image wether that be a solution image or an extension of the issue to be resolved.

```html

<template>
    <div class="outside">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="document" class="outer-wrapper">
            <div class=" single row">
                <div class="info col-12">
                    <h3 :class="{light: light}">{{ document.title }}</h3>
                    <p class="user-name" :class="{light: light}">By: {{ document.userName }}</p>
                    <span v-if="!document.solved" class="material-icons not-solved">build_circle</span>
                    <span v-if="document.solved" class="material-icons">verified</span>
                    <button v-if="ownership" @click="handleSolved" :class="{light: light}">Solved</button>
                </div>
                <h6 :class="{light: light}">Issue description</h6>
                <div class="single-bug col-12">
                    <div class="bug" :class="{light: light}">
                        <div class="actions">
                            <div class="details">
                                <p :class="{light: light}">{{ document.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h6 :class="{light: light}">Error message</h6>
                <div class="single-bug col-12">
                    <div class="bug" :class="{light: light}">
                        <div class="actions">
                            <div class="details">
                                <p :class="{light: light}">{{ document.errorMessage }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="document.solution" class="bugs col-12">
                    <h4 :class="{light: light}">Solution</h4>
                    <div class="single-bug">
                        <div class="bug" :class="{ complete: document.solved, light: light}">
                            <div class="actions">
                                <div class="details">
                                    <p :class="{light: light}">{{ document.solution }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="document.imageUrl" class=" thumbnail col-12 col-sm-4">
                        <img :src="document.imageUrl" alt="project cover image">
                    </div>
                </div>
                <AddSolution v-if="!document.Solved" :bug="document" :light="light" />
            </div>
        </div>
    </div>
</template>

<script>
import useDocument from '../composables/useDocument'
import getDocument from '../composables/getDocument'
import getUser from '../composables/getUser'
import { computed } from '@vue/runtime-core'
import AddSolution from '../components/AddSolution'

export default {
  props: ['id', 'light'],
  components: { AddSolution },
  setup(props){
    const { updateDoc, error } = useDocument('bugs', props.id)
    const { document } = getDocument('bugs', props.id)
    const { user } = getUser()

    const ownership = computed(()=> {
        return document.value && user.value && user.value.uid == document.value.userId
    })

    const handleSolved = async () => {
      document.solved = !document.solved
      await updateDoc({
        solved: document.solved
      })
    }

    return { ownership, error, document, user, handleSolved }
  }
}
</script>

```

## Add Solution component

Initially only the `Add Solution` button is shown, when clicked the form is displayed.  The user can add a solution string or elaborate on the issue and also upload an image.

Digging into the script, as the component mounts the DOM, if the bug is set to solved the solution is displayed but the `Add Solution` is not. The owner can un-solve the bug by toggling the `solved` button at the top of the Single bug view template.

We re-use the `handleChange` function to trigger as the user clicks to add an image in order to check the chosen image meets the criteria and set the image as the value of the property `solutionImage`.

Then the `handleSubmit` function checks to see if there is an image value and if so uploads the image to Firebase Storage, and then updates the document in Firebase Firestore as we have seen before when adding and deleting tasks to update a project document.


```html 

<template>
    <div class="buttons">
        <button v-if="showSolution" @click="handleCloseForm" :class="{light: light}">Cancel</button>
        <button v-if="!bug.solved && !showSolution" @click="showSolution = true" :class="{light: light}">Add Solution</button>
    </div>
    <transition name="fade">
        <form v-if="showSolution" @submit.prevent="handleSubmit" :class="{light: light}">
            <h5 :class="{light: light}">Add solution details</h5>
            <textarea placeholder="Solution details" v-model="solution" required :class="{light: light}"></textarea>
            <div class="buttons">
                <label for="file-upload" class="file-upload-button" :class="{light: light}">Upload solution image</label>
                <input id="file-upload" type="file" @change="handleChange">
            </div>
            <div class="error">{{ fileError }}</div>
            <div class="buttons">
                <button v-if="!isPending" :class="{light: light}">Submit solution</button>
                <button v-if="isPending" class="loading" :class="{light: light}">Uploading...</button>  
            </div>
        </form>
    </transition>
</template>

<script>
import { ref } from '@vue/reactivity'
import useStorage from '../composables/useStorage'
import useDocument from '../composables/useDocument'
import { onMounted } from '@vue/runtime-core'

export default {
    props: ['bug', 'light'],
    setup(props){
        const showSolution = ref(false)
        const solution = ref('')
        const solutionImage = ref(null)
        const fileTypes = ['image/png', 'image/jpeg']
        const fileError = ref(null)
        const isPending = ref(false)

        const { uploadImage, error, filePath, url } = useStorage()
        const { updateDoc } = useDocument('bugs', props.bug.id)

        onMounted(() => {
            if(props.bug.solved){
                showSolution.value = false
            }
        })

        const handleCloseForm = () => {
            showSolution.value = false
            solution.value = ''
            solutionImage.value = null
        }

        const handleChange = (e) => {
            const selected = e.target.files[0]
            if(selected && fileTypes.includes(selected.type)){
                solutionImage.value = selected
                fileError.value = null
            } else{
                solutionImage.value = null
                fileError.value = 'Please select an image file, jpeg or png'
            }
        }

        const handleSubmit = async () => {
            if(solutionImage.value){
                isPending.value = true
                await uploadImage(solutionImage.value)
                const res = await updateDoc({
                solution: solution.value,
                imageUrl: url.value,
                filePath: filePath.value
                })
                if(!error.value){
                isPending.value = false
                showSolution.value = true
                }
            } 
            solutionImage.value = null
            solution.value = ''
            fileError.value = null
        }


        return { showSolution, handleCloseForm, handleSubmit,handleChange, solution, fileError, isPending }
    }
}
</script>

```