# MusicLab App


# How to use

Download or clone this repository  

To retrieve data from the API you should register as a [Developer in Spotify](https://developer.spotify.com) to get an access Token.

Once you have the token just put it in spotifyLogic of the file src/services/spotifylogic.js. 

Go to the container folder with your terminal and use this commands: 
>  npm i

...to install the dependencies, and run the app with:

>  npm start

Note: if you don't use the token, you can access to the app anyway but it won't retrieve any data

# Functional Description

## Use dases diagram

The first thing the user can see is the landing page with the logo a quote and an enter button. After clicking on the Enter button, the user can see the rotation cube where all the sides have different functionalities.  

It's possible to register, log in, see the saved playlist, if the user has, search an artist, choose an album, choose a track and play it, add it to an existing playlist:

<img src="./src/assets/img/use-case-diagram.png" width="700" alt="use case diagram"> 
 

***


# Technical Description  

## Components Diagram  

Our application has some react components, the business logic and two APIs that we use: UserAPi (to store and access all the users data) and SpotifyAPI (to access all the artists, albums and tracks details that we show to the user):

<img src="./src/assets/img/components-diagram.png" width="700" alt="components diagram"> 

***


# Sequence Diagram  

There are some repetitive tasks in our logic the most significant of them are those that use the APIs. The User API is used to save the user data when registering, and to authenticate the data of the saved user with the data introduced in the login; the authentication process of the data in the login looks like this:  

<img src="./src/assets/img/sequence-login-diagram.png" width="700" alt="login sequence diagram">



