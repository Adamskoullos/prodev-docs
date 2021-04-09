# Single Project View

Below is the template for the view:

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