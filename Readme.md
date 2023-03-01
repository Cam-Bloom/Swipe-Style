# Swipe Style

## Introduction

Welcome to Swipe Style, a mobile app inspired by Tinder that helps you discover new items based on your interests. With Swipe Style, you can easily find and favourite items that you like and get suggestions for similar items based on tags.

<p align="center">
  <img src="https://s9.gifyu.com/images/clothes-tinder.gif" />
</p>

![Swipe Style Demo](https://s9.gifyu.com/images/clothes-tinder.gif)

## Developed By

This app was developed over a period of three weeks by a team of Northcoders students as part of a final capstone project.

- [Sasha Kryvko](https://github.com/Aleksanrda)
- [Cameron Bloomfield](https://github.com/Cam-Bloom)
- [Jack Hind](https://github.com/JxckHind)
- [Jim Jenkinson](https://github.com/Superjim)
- [Yuliia Ozmitel](https://github.com/juliaozm)

## How it works

Swipe Style works by presenting you with a series of items that you can swipe left or right on, similar to the popular dating app Tinder. If you swipe right on an item, tags associated with the item are saved in your individual user preferences object. If you swipe left, the item will be dismissed, and the tags will be removed from your user preferences, and you will be presented with the next item.

As you swipe through items, Swipe Style uses machine learning algorithms to identify tags associated with the items you like. It then suggests similar items based on these tags so you can discover even more items that match your interests. If you find an item that you like, you can add it to your favourites list, where you can easily access it later. You can also add items to your cart for purchase.

One of the unique features of Swipe Style is the way it learns from your preferences over time. As you continue to use the app and swipe on more items, Swipe Style will become better at predicting which items you are likely to be interested in. This means that over time, the suggestions that Swipe Style provides will become even more tailored to your individual preferences.

## Features

- Swipe-based interface inspired by Tinder: Swipe left or right to like or dismiss items based on your preferences.
- Firebase sign-up / login: Easily create an account and sign in to Swipe Style using Firebase authentication.
- Machine learning algorithms: Swipe Style uses advanced machine learning algorithms to identify tags associated with the items you like and suggest similar items based on those tags.
- User preferences object: Your individual user preferences object stores tags associated with the items you like, helping Swipe Style to better understand your preferences over time.
- Favourites list: Add items you like to your favourites list, where you can easily access them later.
- Shopping cart: Add items to your cart for purchase and easily check out when you're ready to buy.

## Technology used

[![My Skills](https://skillicons.dev/icons?i=js,react,nodejs,express,postgresql,firebase,git)](https://skillicons.dev)

Swipe Style is built using React Native, a popular JavaScript framework for building cross-platform mobile apps. The app uses Firebase solely for user authentication and management.

For data storage, we have used PostgreSQL, which is hosted on ElephantSQL and accessed through a Node.js API built using Express.js, the repository available [here](https://github.com/Superjim/clothes-backend), hosted on Render. Other technologies used in the development of Swipe Style include:

- Expo for development
- Axios
- React Navigation

## Prerequisites

- NodeJS installed (Latest LTS recommended)
- React Native CLI installed globally (npm install -g react-native-cli)
- Optional: Android Studio or Mac equivalent

## Installation

To install and run Swipe Style on your local machine, follow these steps:

### Back-End and API Setup
- Install and set up the backend for this project available [here](https://github.com/Superjim/clothes-backend).
- Clone this repository to your local machine.
- Install the project dependencies by running the command npm install.
- Navigate to the utils/api.js file and replace the baseURL with http://localhost:3000/api (we didn't actually hide our API key).

### Firebase Auth Setup
- To setup your own firebase authentication please head to firebase website [here](https://github.com/Superjim/clothes-backend)
- Click the following button

<img src="https://i.imgur.com/iDpvlE2.png" alt="Firebase New Project" height=200/>

- Follow project creation and disable google analytics
- Head to authenticaiton card enable email and password authentication as seen below

<img src="https://i.imgur.com/v9wjjdX.png" alt="Email Auth" height=200/>

- Now head back to project overview and add a web app 

<img src="https://i.imgur.com/Ah1jAT8.png" alt="Web App Creation" height=200/>

- After creating app you should see a firebase config code block 
```
apiKey: "XXXXXXXXXXXXXXXXXXXXXX",
authDomain: "XXXXXXXXXXXXXXXXXXXXXX",
projectId: "XXXXXXXXXXXXXXXXXXXXXX",
storageBucket: "XXXXXXXXXXXXXXXXXXXXXX",
messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXX",
appId: "XXXXXXXXXXXXXXXXXXXXXX"
```
- Create a .env file in root of the project you should use your information from above add to following varibles
```
API_KEY=XXXXXXXXXXXXXXXXXXXXXX
AUTH_DOMAIN=XXXXXXXXXXXXXXXXXXXXXX
PROJECT_ID=XXXXXXXXXXXXXXXXXXXXXX
STORAGE_BUCKET=XXXXXXXXXXXXXXXXXXXXXX
MESSAGING_SENDER_ID=XXXXXXXXXXXXXXXXXXXXXX
APP_ID=XXXXXXXXXXXXXXXXXXXXXX
``` 
- Now you should have working authenticaiton 

### Expo

- Start the development server by running the command npx expo start.
- Install the Expo client app on your iOS or Android device or run it virtually using Android Studio.
