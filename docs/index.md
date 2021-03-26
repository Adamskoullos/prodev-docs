## Introduction

This guide serves to break down and model the build process, detailing the awkward nuts and bolts at each step. The focus is on the patterns used when working with views, components and composables and the critical details that pull a project together.

## Birds Eye View

Below is the component architecture for the build:

![image](https://user-images.githubusercontent.com/73107656/112589968-f2835b00-8df9-11eb-9fcb-0b3c6ac92ea3.png)


## Project patterns

The project includes patterns for the following types of applications:

- Blog
- Live-Chat 
- project management
- Todo 

## Technologies Overview

The Vue cli is used to create the project and includes vue-router. The project is built using Vue 3 and the composition api. Vue-transitions are used in conjunction with JS hooks and GSAP. Bootstrap 5 rows and columns are used for responsiveness.

The backend utilises Firebase services: 

- Firestore
- Storage
- Authentication

## Note

In an attempt to keep the guide concise, recurring patterns for example adding a view to the router, importing a component or adding a route guard to a new view are assumed and omitted. Also styling is specific to each project and also not included.

The side bar is laid out in the oder of the build and the entry point for each section is the view.  However each section includes details for the relevant components, composables and any interactions with Firebase.