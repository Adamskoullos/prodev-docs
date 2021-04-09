# Authentication

Now the main dashboard, router and each view is set up its time to allow users to sign up and log in.

On the landing page the top-bar has a login and sign up tab which takes the user to the relevant views.

## Signup

This first snippet is the html template for the signup form, note how each input has two way data binding by using `v-model`:
```html

<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" @click="handleReset" required>
    <input type="email" placeholder="Email" v-model="email" @click="handleReset" required>
    <input type="Password" placeholder="Password" v-model="password" @click="handleReset" required>
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Signup</button>
    <button class="loading" v-if="isPending">Loading...</button>
  </form>
</template>
```
The component imports the Vue `ref()` object for reactive properties, the `useSignup` composable and Vue router in order to push the user to their projects page on successful signup. Also notice how `props` and `context` are passed into the setup function in order to use `context` to emit a custom event to manage the dashboard behaviour on login depending on the viewport size. This event triggers the `handleLogin` function we discussed within the dashboard section:
```js
<script>
import { ref } from '@vue/reactivity'
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'

export default {
  emits: ['signedUp'],
  setup(props, context){
    const email = ref('')
    const password = ref('')
    const displayName = ref('')
    const router = useRouter()

    const { error, isPending, signup } = useSignup()
    
    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value)

      if(!error.value){
          context.emit('signedUp')
          router.push({ name: 'MyProjects' })
      }
    }

    const handleReset = ()=> {
      error.value = null
    }

    return { email, password, displayName, handleReset, handleSubmit, error, isPending }
  }

}
</script>
```
```css
<style scoped>
form{
  margin-top: 20vh;
}
</style>
```

## Login View

The login view is structured with a similar pattern as the signup component, except `useLogin` is imported instead.  The custom event has a different name but in the parent component triggers the same `handleLogin` function.

```html
<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" @click="handleReset" required>
    <input type="Password" placeholder="Password" v-model="password" @click="handleReset" required>
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>
    <button class="loading" v-if="isPending">Loading...</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../../composables/useLogin'
import { useRouter } from 'vue-router'

export default {
  emits: ['login'],
  props:['light'],
  setup(props, context){
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const { error, login, isPending } = useLogin()

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if(!error.value){
          context.emit('login')
          router.push({ name: 'MyProjects' })
      }
    }

    const handleReset = ()=> {
      error.value = null
    }

    return { error, email, password, handleSubmit, isPending, handleReset }
  }
}
</script>

<style scoped>
form{
  margin-top: 20vh;
}
</style>
```
Notice the `handleSubmit` function is an asynchronous function that calls the `login` function. The return value of invoking `login` is initially a promise so the await keyword is used and the eventual response is saved to a const.  Lets take a look at this login function within the `useLogin` composable to see what is happening:

This is a snippet for just the `login` function expression:

```js
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
```
Here we see that `login` is an asynchronous function utilising `try`, `catch` blocks and that within the `try` block we again see the await keyword with the response being saved to a const.  This is the crux of all these async/awaits. Now this await stops the function execution thread while the following takes place. Firebase auth is accessed and the method to signin is invoked passing in the email and password from the user inputs. 
Once firebase returns the authenticated user the response is returned and the thread jumps back out one level to continue within the handleSubmit function (seen in the view above)

If there are no errors the custom event is emitted and the user is pushed to their projects page at which point the thread jumps back out to the global execution context and resumes down the file.

The overall structure of the pattern above is consistent throughout functions that call composable functions that connect with external api's.
