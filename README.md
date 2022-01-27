# 活動公佈欄 UniLife Bulletin

## Setup
```
firebase init
yarn
```
In `firebase.json`:
```json
{
  "hosting": {
    "site": "bulletin-unilife",
    "public": "dist",
    ...
```

## Build
```
yarn build
```

## Deploy
```
firebase deploy
```

## Development
```
yarn dev
```
This will serve hot-reload website at `localhost:3000`
