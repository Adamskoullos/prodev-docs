# Project List views

As the Team Projects and My Projects views have the same structure we will only cover the My Projects view here. This view shows quick link buttons to create a new project or switch between the My Projects and Team Projects views.

Here is the template snippet:

```html
<template>
    <div class="wrapper">
        <div class="button-wrapper">
            <router-link :to="{ name: 'TeamProjects' }" :class="{light: light}">
                <button :class="{light: light}">Team Projects</button>
            </router-link>
            <router-link :to="{ name: 'NewProject' }" :class="{light: light}">
                <button :class="{light: light}">New Project</button>
            </router-link>
        </div>
        <div class="projects-window">
            <div v-if="error" class="error">
                <h4>Cannot access the the projects database</h4>
            </div>
            <div v-if="documents" class="project">
                <ProjectsList :light="light" :projects="documents" />
            </div>
        </div>
    </div>
</template>

```
As you can see there is not much here, however the nested component `ProjectsList` can be seen which also has the collection props `:projects="documents"` being passed down.  The `ProjectsList` is where the collection of projects is looped through and each project is presented. We will move onto this shortly. We can also see that `:light="light"` props is also being passed down. This is a reactive `ref` property which is either true or false and works in conjunction the the conditional class also in the template above `:class="{light: light}"` which gives the element the class of light if the property light is set to true. This is how the provision is put in place to switch from dark mode and back.  

Below is the script snippet which imports the required composables and the ProjectsList component. Then within the setup function the props `light` is accepted and the ProjectsList is added to components.
The composables are destructed and `documents` is returned so it can be accessed in the template and passed down into the nested component `ProjectsList`  

```html

<script>
import getCollection from '../composables/getCollection'
import ProjectsList from '../components/ProjectsList'
import getUser from '../composables/getUser'

export default {
    props: ['light'],
    components: { ProjectsList },
    setup(){
        const { user } = getUser()
        const { documents, error } = getCollection('projects', ['userId', '==', user.value.uid])

        return { documents, error }
    }
}
</script>
```

One thing to note here, because this is the component for the user projects the `getCollection` composable is passed two inputs when destructed.  The first argument is the collection to grab, the second argument is a Firebase query using the Firebase `where()` method in order to only grab documents within the projects collection that have a userId that matches the current logged in user.value.uid.  The uid property is part of the Firebase auth user object. When a project is created, it is given a property `userId` which is set to the value of the users `uid`.

Here is the snippet for the `getCollection` composable showing how when used to grab a single users projects, the if statement comes into play and adds the second argument `query` and chains it onto the end of the collection reference by using the Firebase `where()` method and spreading the query in as an argument: 

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

Moving onto to the `ProjectsList` component, first lets look at the template.

At the top there is a search bar with a v-model which we will come back to, then the div with the Vue directive `v-for`. Inside this div is the structure for each project card, all elements within the v-for div are created for each individual project in the collection and rendered.   

```html
<template>
  <input type="text" v-model="search" placeholder="Title search" :class="{light: light}">
    <div v-for="(project, index) in projectSearch" :key="project.id" :data-index="index" class="container-fluid project-list-wrapper">
      <router-link :to="{ name: 'SingleProject', params: {id: project.id} }" class="route-tag">
          <div class="single row" :class="{light: light}">
            <div class="thumbnail col-12 col-sm-3">
                <img :src="project.imageUrl" alt="project cover image">
            </div>
            <div class="info col-12 col-sm-6" :class="{light: light}">
                <h3>{{ project.title }}</h3>
                <p>Project lead: {{ project.userName }}</p>
            </div>
            <div class="tasks col-12 col-sm-3" :class="{light: light}">
                <p>Tasks: {{ project.tasks.length }}</p>
            </div>
          </div>
      </router-link>
    </div>
</template>
```

The components script tags below show the props passed down are accepted and also passed into the `setup` function to be accessed.  The search bar input value is bound to the `search` ref and used within the `computed` property to create a filtered project list depending on the user input.  Then back in the template instead of v-for looping through the `projects` we now loop through the computed property `projectSearch` 

```html
<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
export default {
    props: ['projects', 'light'],
    setup(props){
      const search = ref('')

      const projectSearch = computed(() => {
        return props.projects.filter(project => {
          return project.title.toLowerCase().match(search.value.toLowerCase())
        })
      })

      return { search, projectSearch }
    }
}
</script>
```

In practice when the user input is an empty string the whole collection is shown, but with every keystroke the projects are filtered. Notice how both the title and user input are set to lowercase to make the search as user friendly as possible. 