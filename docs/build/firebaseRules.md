# FireBase Rules

Before fully testing functionality we need to set up the firestore and storage rules with firebase otherwise we will keep getting errors even if the code is all good. So lets get that setup for all collections a storage items now:

## Firestore Rules:

```js

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{docId} {
      allow read, create: if request.auth != null;
      allow delete, update: if request.auth.uid == resource.data.userId;
    }
    match /users/{docId}{
        allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /messages/{messagesId} {
      allow read, write: if request.auth != null;
    }
    match /bugs/{bugId} {
      allow read, write: if request.auth != null;
      allow delete, update: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Storage Rules:


```js

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projectImages/{userId}/{allPaths=**} {
      allow read, create: if request.auth != null;
      allow delete: if request.auth.uid == userId;
    }
    match /bugImages/{userId}/{allPaths=**} {
      allow read, create: if request.auth != null;
      allow delete: if request.auth.uid == userId;
    }
  }
}
```
