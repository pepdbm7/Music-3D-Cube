# MusicLab App

- Use Demo: [music-3d-cube.com](https://music-3d-cube.netlify.com)

# How to use

Download or clone this repository

Go to the container folder with your terminal and use this commands:

> npm i

to install the dependencies,

> npm start

to run the app with

# Functional Description

- Has two separated logics: user management and music management,

- Uses **Heroku** for a database of users, which API I created with this endpoints:
  - register user
  - login
  - retrieve user
  - update user
  - add playlist
  - add song to playlist
  - remove song from playlist
  - remove playlist
  
- Uses **iTunes API** for the music management:
  - show artist
  - show albums
  - show songs
  - play songs


## Use dases diagram

The first thing the user can see is the landing page with the logo a quote and an enter button. After clicking on the Enter button, the user can see the rotation cube where all the sides have different functionalities.

It's possible to register, log in, see the saved playlist, if the user has, search an artist, choose an album, choose a track and play it, add it to an existing playlist:

<img src="./src/assets/img/use-case-diagram.png" width="700" alt="use case diagram">

---

# Technical Description

## Components Diagram

Our application has some react components, the business logic and two APIs that we use: UserAPi (to store and access all the users data) and SpotifyAPI (to access all the artists, albums and tracks details that we show to the user):

<img src="./src/assets/img/components-diagram.png" width="700" alt="components diagram">

---

# Sequence Diagram

There are some repetitive tasks in our logic the most significant of them are those that use the APIs. The User API is used to save the user data when registering, and to authenticate the data of the saved user with the data introduced in the login; the authentication process of the data in the login looks like this:

<img src="./src/assets/img/sequence-login-diagram.png" width="700" alt="login sequence diagram">
