## Run Locally

Clone the entire repository

```bash
  git clone https://github.com/lucasfsn/pig-game
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Create .env file

```bash
  touch .env
```

.env must contain the following variables:

- MONGO_CONNECTION_STRING
- PORT
- JWT_SECRET

You also need to provide mqtt broker in the mqtt.js file

Start the server

```bash
  npm run start:dev
```
