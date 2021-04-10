# Project Tasks

Within the SingleProject view there is a nested AddTask component which has the props `document` passed down as `projects` (should have been called project):

```html

        </div>
    </transition-group>
    <AddTask v-if="ownership" :projects="document" :light="light"/>
</div>
```

The AddTask component has a simple form and below is the component script. Focusing on the `handleAddTask` async function, an object is defined `newTask` with the task property set the value of the user input. Then the await keyword is used when invoking the `updateDoc` function which is destructed from the `useDocument` composable.  This connects to Firestore and is itself an asynchronous function.

The `updateDoc` takes an input which is an object with the properties to be updated. The tasks array is to be updated so first we spread the existing tasks array in and then add the new task.

```html

<script>
import { ref } from '@vue/reactivity'
import useDocument from '../composables/useDocument'

export default {
  props: ['projects', 'light'],
  setup(props){
    const { updateDoc } = useDocument('projects', props.projects.id)
    const task = ref('')
    const addTask = ref(false)
    const isPending = ref(false)
    const inputEl = ref<Element>(null)

    const openForm = () => {
      addTask.value = true
    }

    const handleAddTask = async () => {
      isPending.value = true
      addTask.value = true
      const newTask = {
        task: task.value,
        completed: false,
        id: Math.floor(Math.random()*1000000000)
      }
      await updateDoc({
        tasks: [...props.projects.tasks, newTask]
      })
      task.value = ''
      isPending.value = false
      addTask.value = false
    }

    return { handleAddTask, task, addTask, isPending, inputEl, openForm  }
  }
}
</script>
```