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
As you can see there is not much here, however the nested component `ProjectsList` can be seen which also has the collection props `:projects="documents"` being passed down.  The `ProjectsList` is where the the collection of projects is looped through and each project is presented. We will move onto this shortly. We can also see that `:light="light"` props is also being passed down. This is a reactive `ref` property which is either true or false and works in conjunction the the conditional class also in the template above `:class="{light: light}"` which gives the element the class of light if the property light is set to true. This is how the provision is put in place to switch from dark mode and back.  

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

Moving onto to the `ProjectsList` component
