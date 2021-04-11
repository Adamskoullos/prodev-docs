# Bug Journal View

The bug journal view has the `BugsList` component nested within the template.  `getCollection` is used to grab the `bugs` collection which is then passed down into the `BugsList` component with the name `bugs`:


```html

<template>
    <div class="wrapper">
        <div class="button-wrapper">
            <router-link :to="{ name: 'NewBug' }" :class="{light: light}">
                <button :class="{light: light}">New Bug</button>
            </router-link>
        </div>
        <div class="Bugs-window">
            <div v-if="error" class="error">
                <h4>Cannot access the the Bugs database</h4>
            </div>
            <div v-if="documents" class="Bugs">
                <BugsList :bugs="documents" :light="light" />
            </div>
        </div>
    </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import BugsList from '../components/BugsList'

export default {
    props: ['light'],
    components: { BugsList },
    setup(){
        const { documents, error } = getCollection('bugs')

        return { documents, error }
    }
}
</script>

<style>
```

The `BugsList` component below accepts the props `bugs` and creates a computed property in order to search the bug titles with a keyword search.

Each bug is looped through and rendered, as we have seen before within the `ProjectsList` component:

```html

<template>
  <input type="text" v-model="search" placeholder="Title search" :class="{light: light}">
  <div v-for="bug in bugSearch" :key="bug.id" class="container-fluid bug-list-wrapper">
    <router-link :to="{ name: 'SingleBug', params: {id: bug.id} }" class="route-tag">
        <div class="single row" :class="{light: light}">
          <div class="top-row">
            <div class="info col-12">
              <span v-if="!bug.solved" class="material-icons not-solved">build_circle</span>
              <span v-if="bug.solved" class="material-icons">verified</span>
              <h3 :class="{light: light}">{{ bug.title }}</h3>
              <p :class="{light: light}">Issued by: {{ bug.userName }}</p>
            </div>
          </div>
          <div class="description col-12">
              <p :class="{light: light}">{{ bug.description }}</p>
          </div>
        </div>
    </router-link>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

export default {
  props: ['bugs', 'light'],
  setup(props){
    const search = ref('')

    const bugSearch = computed(() => {
      return props.bugs.filter(bug => {
        return bug.title.toLowerCase().match(search.value.toLowerCase())
      })
    })

    return { search, bugSearch }
  }
}
</script>
```