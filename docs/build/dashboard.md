## Overview

ProDev is built as an SPA and is a tool so the ui was given an admin style dashboard and navigation.  Below are images of the bare bones structure once the dashboard layout and functionality were developed.


![light-chat](https://user-images.githubusercontent.com/73107656/112616150-46526c00-8e1b-11eb-9d59-715444af18b3.png)


![light-mobile](https://user-images.githubusercontent.com/73107656/112616162-4b172000-8e1b-11eb-8cb7-bab4e6f42a1d.png)

![dark-chat](https://user-images.githubusercontent.com/73107656/112616186-510d0100-8e1b-11eb-92d4-7a58f02d6067.png)

![dark-tablet-2](https://user-images.githubusercontent.com/73107656/112616221-5e29f000-8e1b-11eb-87d6-a42e5ca9b06a.png)

At this stage the navigation is operational and the following is in place:

- Dashboard elements transition in on load
- Top nav contents change on different size devices
- Side-nav and top-bar transitions in/out at the break point
- The side-chat can be toggled in and and out from the right with a smooth transition
- On larger screens the side-chat component is taken out of the main router views but on smaller screens the chat component is added back so it takes up the full width and does not wrap below.  This provides a more focused mobile app feel on smaller screens but allows full functionality above the break point.

To manage dark and light mode the Vue conditional class is used: `:class="{dark: dark}"` and the `.dark` mode class is utilised within `main.css`

## Managing Breakpoints

The top-bar and side-nav are custom built using flexbox, custom breakpoint logic was put together to manage the responsive behaviour:

![Screenshot from 2021-03-26 10-30-24](https://user-images.githubusercontent.com/73107656/112618686-4e5fdb00-8e1e-11eb-93cd-ab539fdf44ca.png)

The last line in the code above ensures that as the screen is enlarged above the breakpoint, that the `Chat` component is not initially shown in both the main `router-view` and the side-chat window.  This would happen if the `Chat` component was in view prior to the break point larger.  Therefore as the breakpoint is hit and the side-nav slides in and the side chat slides in the main router view is set to `MyProjects`. 

Before moving on there are some intricate bits to cover within the template structure regarding the navigation:

## Router-View Transitions

![Screenshot from 2021-03-26 10-49-50](https://user-images.githubusercontent.com/73107656/112620909-03939280-8e21-11eb-99f7-16c1ad96dfe9.png)

Above we are looking at the `<router-view>` normally the opening tag is also the closing tag but when transitions are used between views this is the pattern to use with Vue 3.  

A v-slot is added to the router-view grabbing the current view via `Component`, inside that are the transition tags using the `mode="in-out"` and inside them the `<component>` tag is binding to the `Component` signifying whichever component the router-view is mounting at the time. 

## Element Transitions

There are transition tags around both the top-bar and side-nav for on load transitions. These are using the JS hooks in conjunction with GSAP. The below image shows the side-nav with the transition tags:

![Screenshot from 2021-03-26 11-06-57](https://user-images.githubusercontent.com/73107656/112622770-67b75600-8e23-11eb-842c-7aa35c7ac42b.png)

Note that the `<router-link>` inside the `<li>` tags does not have `<a>` tags.  Vue adds these to the HTML.

Here is the logic using GSAP for the side-nav transition:

![Screenshot from 2021-03-26 11-10-13](https://user-images.githubusercontent.com/73107656/112623124-da283600-8e23-11eb-94c5-aef637d5b5c1.png)







