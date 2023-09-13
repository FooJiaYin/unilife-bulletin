# 活動公佈欄 UniLife Bulletin

## Demo 
Website: https://bulletin.unilife.cc/hualien/

Share link: https://bulletin.unilife.cc/hualien/activity/3sf5pJpOe20PV1VzCYsS

## Setup
1. Install dependencies
    ```
    yarn
    ```
2. Login to firebase
    ```
    yarn run init
    ```
    Then, login with your firebase account and select the project you want to use. Type `default` for the alias.
    
3. Create a `.env` file in the root directory and fill in the following information:
    ```
    FIREBASE_API_KEY = {your api key}
    FIREBASE_AUTH_DOMAIN = {your auth domain}
    FIREBASE_DATABASE_URL = {your database url}
    FIREBASE_PROJECT_ID = {your project id}
    FIREBASE_STORAGE_BUCKET = {your storage bucket}
    FIREBASE_MESSAGING_SENDER_ID = {your messaging sender id}
    FIREBASE_APP_ID = {your app id}
    FIREBASE_MEASUREMENT_ID = {your measurement id}
    ```
## Build
```
yarn build
```

## Deployment
```
yarn deploy
```

## Development
```
yarn dev
```
This will serve hot-reload website at `localhost:3000`
