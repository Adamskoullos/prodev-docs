# Deployment

## Initial Deployment

Using the Vue cli compile and minify the project for production:

```
npm run build
```

Vue uses `dist` as the public build folder, within the `firebase.json` file make sure the `hosting` object has: `"public": "dist"` so firebase points to the public folder then deploy:

```
firebase deploy
```

Once deployed firebase provides the public url within the terminal, this can also be found within the firebase console.

As and when any changes are made to the project re-build and re-deploy as above and then re-commit to GitHub.

## Locking down the Firebase API key

As the Firebase SDK is accessible from the front-end to prevent the api key being used by third parties we can lock the api key to the application domain.  To do this go to: `console.developers.google.com` > select Firebase project > Credentials side-tab > Key restrictions.

Add the domain and/or specific urls for Firebase to accept requests from:

![Screenshot from 2021-04-11 06-52-24](https://user-images.githubusercontent.com/73107656/114294008-fcac8700-9a92-11eb-872f-417f4ec928ae.png)

## Locking down the Email.js API key

Sign in to Email.js account > settings > add domain to only allow api requests from domain