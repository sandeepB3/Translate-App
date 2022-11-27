# Translate App
React Native app to translate text conversations, supporting 110+ languages with text-to-speech feature. (Implementing speech-to-text feature as well).


## Features
- Supports translation between any pair of 110+ languages
- Supports accessibility feature - Text-to-Speech
- Helpful tool to learn new languages.
- Cross platform - works on Android & IOS both


## API Reference

#### NLP Translation

Required Header Parameters - Refer Documentation
```http
https://rapidapi.com/gofitech/api/nlp-translation
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `X-RapidAPI-Key` | `enum` | Your API key (**Required**) |
| `X-RapidAPI-Host` | `string` | RapidAPI Host (**Required**)|

Refer the above documentation for code snippets and example response


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`HOST_KEY`

***You will need to make an account with RapidAPI and fill in some credit card details to obtain the API Key. (You will not be charged anything for the same).***

You may also use any other API as per your convenience.


## Run Locally

Clone the project

```bash
  git clone https://github.com/sandeepB3/Translate-App.git
```

Go to the project directory

```bash
  cd Translate-App
```

Install dependencies

```bash
  npm install
```

Create .env file & fill the env variables as shown above

```bash
  touch .env
```

Start the server

```bash
  npm start
```


## Tech Stack

**Client:** React Native, Redux, NLP API

**Server:** Node, Expo CLI


## Screenshots
![WhatsApp Image 2022-11-27 at 2 46 47 PM](https://user-images.githubusercontent.com/107111616/204127695-d7a9cdf7-9a17-43f2-872d-d8e73aca5540.jpeg)






## Lessons Learned

- This was my first project using React Native, having a little experience with React.js was really helpful.
- React itself is platform-agnostic, React Native provides a collection of special React components which can be compiled to native UI elements.
- Learned how React Native works under the hood - Native elements & Javascript thread.
- Initially it was difficult to get used to the new React components, but comparing each components with the conventional React.js components makes it easier to understand. 
- The javascript state management library Redux - was also completely new to me. It was confusing at first due to some scary terms like reducers, actions, store, etc. But, once you get a hold of the fundamental concepts, everything starts making sense.


## Future Scope

- Support for accessibility feature - Speech-to-Text 
- Dark / Light mode - Toggle UI
- Conversation Mode - Provides parallel translation in a conversation format acting as a handy translator between two users.

