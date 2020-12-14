# 🎬 The movie app

_React, Redux, Javascript, node.js, Express, MongoDB, Mongoose, Axios, JWT, Jest, TMDb API, Heroku_

## Description

The project consists on a movie app with a Netflix-like visual style where, once logged in, users are able to:

- Fetch movies from a third-party API
- See movie details
- Like and dislike movies
- Leave comments
- Add movies to their favourites section

You will find it deployed to Heroku under the url: [www.heroku-invented.com](https://github.com/jgarciatorralba)

---

## Content

The folder structure consists on three main sub-folders:

- _**client**_: contains the code corresponding to the frontend of the application, which was developed using the JavaScript library **React**.

- _**server**_: here it is stored the code for the backend of the application, for which the technologies used were mainly **node.js**, **Express** and **MongoDB**.

- _**project-documentation**_: includes a descriptive memory of the project along with a short presentation about it.

---

### General API Information

All endpoints return a **JSON** object with the following format:

```javascript
// If everything went ok
{
  data: [{...}],
  error: null
}

// In case an error occurs
{
  data: null,
  error: "Error message"
}
```

---

### HTTP Return Codes

- HTTP `400` return code is used for malformed requests; the issue is on the sender's side.
- HTTP `401` return code is used when trying to access a protected endpoint without providing a JWT.
- HTTP `403` return code is used when trying to access a protected endpoint with an invalid JWT.
- HTTP `500` return code is used for internal errors; the issue is on the API side.

---

## Author

- **Jorge García Torralba** &#8594; [jorge-garcia](https://github.com/jgarciatorralba)

---
