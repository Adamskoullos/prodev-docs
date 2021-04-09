![Main-1](https://user-images.githubusercontent.com/73107656/114161994-9273d500-9920-11eb-8e5a-a3a8fa7d2806.png)

![24 -display](https://user-images.githubusercontent.com/73107656/114161888-71ab7f80-9920-11eb-8c3b-3418e7b447e0.png)

## Introduction

This guide serves to break down and model the build process, detailing the awkward nuts and bolts at each step. The focus is on the patterns used when working with views, components and composables and the critical details that pull a project together.

## Birds Eye View

Below is the component architecture for the build:

![image](https://user-images.githubusercontent.com/73107656/114159806-1bd5d800-991e-11eb-82ba-593748c79a7b.png)


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
    - Collections for `projects`, `bugs` and `messages` 
- Storage
    - Storage is used for project cover image and solution images for bugs
- Authentication

## Note

In an attempt to keep the guide concise, recurring patterns for example adding a view to the router, importing a component or adding a route guard to a new view are assumed and omitted. Also styling is specific to each project and also not included.

The side bar is laid out in the order of the build and the entry point for each section is the view.  However each section includes details for the relevant components, composables and any interactions with Firebase.