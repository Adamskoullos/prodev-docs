# Project Setup

- Create directory for the project and cd into it
- Create Vue project using vue-cli adding vue-router
- Strip all unused boilerplate files and folders
- Add `main.css` (unless using SASS) for global styles to the assets folder and import into `main.js`
- Import any google fonts into `main.css` and set up basic global styles
- As a default, `language` is not set within the `<html>` tag in `index.html` so do this now
- Add a link to material icons within the head of `index.html`
- Install GSAP: `npm install gsap`, to be imported where used 
- Install Bootstrap 5: `npm install bootstrap@next`  
- Import Bootstrap within `main.js`:
    - `import "bootstrap/dist/css/bootstrap.min.css"`
    - `import "bootstrap"`
- Save, add the repo to GitHub and publish

## Setup Firebase

### Backend 

Must be signed up with firebase and be in the Firebase console:

- Create Firebase project
- Create Firestore database (start in test mode for development)
- Enable authentication methods (email, password, Google etc)

### Frontend

Open up a terminal:

- Install Firebase tools: `npm install -g firebase-tools` this is global and only needs to be installed on a machine once, not for each project
- `firebase init` adding Firestore and Storage
-  Use file names: `firestore.rules` and `storage.rules`
- Make sure to use `dist` as the public directory (if using Vue)

here is the visual:

![image](https://user-images.githubusercontent.com/73107656/112598464-82c79d00-8e06-11eb-820f-2daedbe38ffd.png)


### Connecting the frontend to firebase

- Create `firebase` folder within `src` and `config.js`  file within that
- Install the firebase SDK for the project: `npm install firebase`

Within Firebase console:

- Create Firebase `web app` + add `hosting` and register the app
- Project settings > apps > grab the config SDK snippet and copy into the `config.js` file within the `firebase` folder back in the frontend

Back in the front end, set up the `config.js` file:

- Import Firebase core and services above the config SDK
- Initialise Firebase
- Initialise services
- Save the firebase timestamp method to a const to be used as a field value within document objects, so a `createdAt` property can be created for each document. 
- Then finally export Firebase services and timestamp. 

Here is the visual:

SDK omitted

![Screenshot from 2021-03-26 09-29-24](https://user-images.githubusercontent.com/73107656/112611541-dab9d000-8e15-11eb-89e0-dcfc50d1d8e2.png)


## Setting up the Views and router

Before moving on to build out the main dashboard and navigation create each view and set up the router (index.js within the router folder). Note the route guard is added using Firebase authentication.  The route guard uses `next()` instead of push() and must have `to`, `from` and `next` passed in.  Once defined the route guard is used for each route that requires a logged in user before access:

```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TeamProjects from '../views/TeamProjects.vue'
import MyProjects from '../views/MyProjects.vue'
import NewProject from '../views/NewProject.vue'
import Bugs from '../views/Bugs.vue'
import NewBug from '../views/NewBug.vue'
import Chat from '../views/Chat'
import ReportIssue from '../views/ReportIssue'
import Contact from '../views/Contact.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import SingleProject from '../views/SingleProject.vue'
import SingleBug from '../views/SingleBug.vue'

import { fAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  const user = fAuth.currentUser
  if(!user){
    next({ name: 'Home' })
  } else{
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'TeamProjects',
    component: TeamProjects,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/projects/user',
    name: 'MyProjects',
    component: MyProjects,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/projects/new',
    name: 'NewProject',
    component: NewProject,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/projects/:id',
    name: 'SingleProject',
    component: SingleProject,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/bugs',
    name: 'Bugs',
    component: Bugs,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/bugs/new',
    name: 'NewBug',
    component: NewBug,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/bugs/:id',
    name: 'SingleBug',
    component: SingleBug,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/issue',
    name: 'ReportIssue',
    component: ReportIssue,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: true
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

```

At this stage of the build each view is just given an `<h1>` to verify view and also flexbox layout:

![Screenshot from 2021-03-26 10-18-44](https://user-images.githubusercontent.com/73107656/112617276-a85fa100-8e1c-11eb-8ec6-a1dfbd5bcb42.png)








