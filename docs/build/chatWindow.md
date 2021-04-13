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

Diving into the `NewMessage` component below: 

The form contains a textarea with a `v-model` binding the user input with the reactive ref property `message` within the setup function.  On submission of the form which is triggered by a keydown event by the enter key, the `handleSubmit` function is invoked.

This function adds a new document to the messages collection, lets break it down:

`handleSubmit` is an asynchronous function which initially defines an object `chat` which is the new message to be added to the messages collection.  Critically here the `createdAt` property includes the timestamp which we will return to in the next section.

Once the `chat` object has been defined, await is used and then `addDoc` is invoked passing in the new chat message object. `addDoc` itself is an asynchronous function as it connects to Firebase Firestore and initially returns a promise. Once complete and if there are no errors, the message user input is set to an empty string ready for the next one and the new message is now in the messages collection and in real-time rendered to the view via the messages component which we will move onto next.


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

The messages component has a similar structure to the ProjectsList and BugsList components in that `v-for` is used to render each message within the messages collection. However unlike the Bugs view where each bug is listed similar to a blog post, the messages are organised to be newest at the bottom and for the container element to open with the scrollbar automatically at the bottom to always show the last message.  Lets look at the code for this.

Near the bottom of the setup function below, the messages const is defined with the initial value of null.  Then below that the Vue lifecycle hook `onUpdated` is used passing in the callback to be executed. The key here is to set the scrollTop to always equal the scrollHeight.

Coming back to the `timestamp` we created when the new message was added to the collection: First a method is imported `formatDistanceToNow` from `date-fns`, then within the setup function a computed property is defined `formattedDocuments`:

Note: `documents` is extracted from the `getCollectionMessages` composable

If there is access to the messages collection, loop through each message using `map` and for each message create a property `time` and use the timestamp to reformat the data saving the new format to `time`. Then spread the message document into a new object and reassign `time` as the `createdAt` value. Then loop through and render the `formattedDocuments` instead of the original messages collection `documents`.

The result is that each message now has `x minutes ago` or `x days ago` instead of a long winded date, much more chat app friendly.

```html 

<template>
    <div class="chat-window">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="documents" class="messages" ref="messages">
            <transition-group name="list" appear>
                <div v-for="doc in formattedDocuments" :key="doc.id" class="single" :class="{light: light}">
                    <div class="timestamp" :class="{light: light}">
                        <span class="created-at" :class="{light: light}">{{ doc.createdAt }}</span>
                        <span class="name" :class="{light: light}">{{ doc.name }}</span>
                    </div>
                    <span class="message" :class="{light: light}">{{ doc.message }}</span>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import getCollectionMessages from '../composables/getCollectionMessages'
import { formatDistanceToNow } from 'date-fns'
import { computed, onUpdated, ref } from '@vue/runtime-core'


export default {
    props: ['light'],
    setup(){
        const { documents, error } = getCollectionMessages('messages')

        const formattedDocuments = computed (() => {
            if(documents.value){
                return documents.value.map(doc => {
                    let time = formatDistanceToNow(doc.createdAt.toDate())
                    return { ...doc, createdAt: time }
                })
            }
        })

        // auto-scroll to bottom of messages to show the newest
        const messages = ref(null)
        // fire on every update to maintain always showing the latest messages
        onUpdated(() => {
            messages.value.scrollTop = messages.value.scrollHeight
        })

        return { formattedDocuments, documents, error, messages }
    }
}
</script>

```