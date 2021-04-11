# Chat Window

The chat view includes two nested components `NewMessage` and `Messages` which can be viewed below:

```html 

<template>
  <div class="main-chat-window" ref="messages">
    <Messages :light="light"/>
    <NewMessage :light="light"/>
  </div>
</template>

<script>
import NewMessage from '../components/NewMessage'
import Messages from '../components/Messages'

export default {
  components: { NewMessage, Messages },
  props: ['light']
}
</script>

<style scoped>
.main-chat-window{
  flex:1;
  max-height: 100vh;
}
</style>
```

The `Chat` component is present twice within the main dashboard view which on first inspection is confusing. However looking closely at the `v-if` directives the first Chat component above the main `router-view` tags is only shown when the viewport width is below the break point ensuring the chat window takes up the full screen on mobile devices.

Then above the break point the `Chat` view is moved to the side-chat column, where it can be toggled and viewed in conjunction with the main `router-view` content.

```html

    </div>
</transition>
<div class="row content-row" :class="{light: light}">
    <div class="col content-col" :class="{light: light}">
        <div class="col-12 chat-col side-chat-window" :class="{light: light}" v-if="showSideChat && !showSideNav">
            <Chat :light="light" />
        </div>
        <router-view :light="light" 
        @signedUp="handleLogin"
        @login="handleLogin" 
        v-if="
        (!showSideChat && !showSideNav) || 
        (!showSideChat && showSideNav) || 
        (showSideNav)" 
        v-slot="{ Component }">
            <transition name="route" mode="out-in">
                <component :is="Component"></component>
            </transition>  
        </router-view>
    </div>
    <transition name="slideSideChat"
    @before-enter="sideChatBeforeEnter"
    @enter="sideChatEnter"
    @before-leave="sideChatBeforeLeave"
    @leave="sideChatLeave">
        <div class="col-12 col-md-4 chat-col side-chat-window" :class="{light: light}" v-if="showSideChat && showSideNav">
            <Chat :light="light" />
        </div>
    </transition>
</div>
```

## New Message component

Diving into the `NewMessage` component


```html

<template>
    <transition name="list" appear>
        <form :class="{light: light}">
            <textarea
            :class="{light: light}"
            v-model="message"
            placeholder="Type your message and hit enter"
            @keydown.enter.prevent="handleSubmit" required>
            </textarea>
            <div class="error">{{ error }}</div>
        </form>
    </transition>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser'
import useCollection from '../composables/useCollection'
import { timestamp } from '../firebase/config'


export default {
    props: ['light'],
    setup(){
        const message = ref('')
        const { addDoc, error } = useCollection('messages')
        const { user } = getUser()

        const handleSubmit = async () => {
            const chat = {
                name: user.value.displayName,
                message: message.value,
                createdAt: timestamp()
            }
            await addDoc(chat)
            if(!error.value){
                message.value = ''
            }
        }

        return { addDoc, error, handleSubmit, message }
    }
}
</script>
```

## Messages component