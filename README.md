 here i mentioned the sample data for testing the API endpoints. You can use this data to create users, posts, and comments in your application.
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "123456"
}




{
    "user": {
        "name": "John Doe",
        "username": "johndoe",
        "email": "john@example.com",
        "password": "$2b$10$o8.ROouWKsDkHNjjMZTCouhgW702NteWgptIpWETS64bP.cFma2ou",
        "friends": [],
        "friendRequests": {
            "sent": [],
            "received": []
        },
        "_id": "6985979f871a3820f985128d",
        "createdAt": "2026-02-06T07:26:23.161Z",
        "updatedAt": "2026-02-06T07:26:23.161Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODU5NzlmODcxYTM4MjBmOTg1MTI4ZCIsImlhdCI6MTc3MDM2Mjc4MywiZXhwIjoxNzcyOTU0NzgzfQ.3H8jlCq3Q_3rhvHT9Dz_-aSvPDOSIUP_AIed9v80DfI"
}




{
    "user": {
        "friendRequests": {
            "sent": [],
            "received": []
        },
        "_id": "6985979f871a3820f985128d",
        "name": "John Doe",
        "username": "johndoe",
        "email": "john@example.com",
        "password": "$2b$10$o8.ROouWKsDkHNjjMZTCouhgW702NteWgptIpWETS64bP.cFma2ou",
        "friends": [],
        "createdAt": "2026-02-06T07:26:23.161Z",
        "updatedAt": "2026-02-06T07:26:23.161Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODU5NzlmODcxYTM4MjBmOTg1MTI4ZCIsImlhdCI6MTc3MDM2Mjg3MiwiZXhwIjoxNzcyOTU0ODcyfQ.aIxwdXPZjvQdeT3EEr8d-6Di6LFi3LS9ahy5UTp3TX4"
}



 "author": "6985979f871a3820f985128d",
    "media": [],
    "likes": [],
    "_id": "6985991e871a3820f9851290",
    "createdAt": "2026-02-06T07:32:46.719Z",
    "updatedAt": "2026-02-06T07:32:46.719Z",
    "__v": 0
}




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


