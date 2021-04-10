# Single Project View

When the user is in either the Team Projects view or the My Projects view they can click on a projects card and route to the view for that specific project. Each project is its own object and has a tasks array. There is a separate component `AddTask` which is nested at the bottom of the template below.

Within the template we can see the elements that have the conditional `light` class for the light/dark theme toggle functionality.  There is a conditional `v-if` that only shows the `Project Complete` button when the current user is the project owner.  `<transiton-groups>` tags are used to manage how each task is added and removed from the DOM and a `v-for` to render the array of tasks.

Material icons are used to delete a task or change its state to either complete or still to do. 

One more item to take note of is with some `v-if` elements we are only showing the element if the current user is the owner, using the `ownership` computed property which we will come back to below.

```html
<template>
    <div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="document" class="">
            <div class=" single row" :class="{light: light}">
                <div class=" thumbnail col-12 col-sm-4" :class="{light: light}">
                    <img :src="document.imageUrl" alt="project cover image" :class="{light: light}">
                </div>
                <div class="info col-12 col-sm-8">
                    <h3 :class="{light: light}">{{ document.title }}</h3>
                    <p class="user-name" :class="{light: light}">Project lead: {{ document.userName }}</p>
                    <p :class="{light: light}">{{ document.description }}</p>
                </div>
                <button v-if="ownership && !isPending" @click="handleDelete" class=" big" :class="{light: light}">Project Complete</button>
                <button v-if="isPending" class="loading big" :class="{light: light}">Completing...</button>
                <div class="tasks col-12">
                    <h4 :class="{light: light}">Tasks</h4>
                    <transition-group name="list" appear>
                        <div v-for="task in document.tasks" :key="task.id" class="single-task">
                            <div class="task" :class="{ complete: task.completed, light: light}">
                                <div class="actions">
                                    <div class="details">
                                        <p :class="{light: light}">{{ task.task }}</p>
                                    </div>
                                    <div class="icons" v-if="ownership">
                                        <span class="material-icons" @click="handleDeleteTask(task.id)" :class="{light: light}">delete</span> 
                                        <span class="material-icons" @click="handleTaskComplete(task.id)" :class="{light: light}">done</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                    <AddTask v-if="ownership" :projects="document" :light="light"/>
                </div>
            </div>
        </div>
    </div>
</template>
```

There is a lot going on within the script much of which has been touched upon previously.  The props accepted are `id` and `light`, we know that `light` has been passed down but where is `id` coming from.

Within `index.js` the router, each route has the property of `props` that is set to true.  because of this we can now accept the route `id` for each specific project via the params, which we use as the second argument when destructuring `useDocument` and `getDocument`.  Note again that `props` has to be passed into the `setup` function to access this.

Coming back to the `ownership` computed property below, this is a boolean value that returns true if there is a document value and a user value and the user id matches the document user id.

```html

<script>
import AddTask from '../components/AddTask'
import useStorage from '../composables/useStorage'
import useDocument from '../composables/useDocument'
import getDocument from '../composables/getDocument'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
import { computed, ref } from '@vue/runtime-core'

export default {
    props: ['id', 'light'],
    components: { AddTask },
    setup(props){
        const { deleteImage } = useStorage()
        const { deleteDoc, updateDoc, error } = useDocument('projects', props.id)
        const { document } = getDocument('projects', props.id)
        const { user } = getUser()
        const router = useRouter()
        const isPending =ref(false)

        const ownership = computed(()=> {
            return document.value && user.value && user.value.uid == document.value.userId
        })

        const handleDelete = async () => {
            isPending.value = true
            await deleteDoc()
            await deleteImage(document.value.filePath)
            isPending.value = false
            router.push({ name: 'MyProjects' })
        }

        const handleTaskComplete = async (id) => {
            const tasks = document.value.tasks.map(task => {
              if (task.id == id){
                task.completed = !task.completed
              }
              return task
            })
            await updateDoc({
              tasks: tasks
            })
        }

        const handleDeleteTask = async (id) => {
            const tasks = document.value.tasks.filter(task => task.id != id)
            await updateDoc({
              tasks: [...tasks]
            })
        }

        return { document, error, ownership, handleDelete, isPending, handleTaskComplete, handleDeleteTask }
    }
}
</script>

```