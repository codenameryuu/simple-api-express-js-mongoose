# Simple API Mongoose

## Features

- NoSQL database: MongoDB object data modeling using Mongoose
- Validation: request data validation using Joi
- Logging: using winston and morgan
- API documentation: with swagger-autogen and swagger-ui-express
- Dependency management: with Yarn
- Environment variables: using dotenv
- CORS: Cross-Origin Resource-Sharing enabled using cors

## Running the application

Clone the repo

```bash
git clone https://github.com/codenameryuu/simple-api-mongoose.git
```

Install the dependencies

```bash
yarn install or yarn
```

Set the environment variables

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Env Example

```bash
MONGODB_URL="mongodb://fikrisabriansyah:fikrisabriansyah@localhost:27017/simple_api_mongoose?authSource=admin" #Your MONGODB URL
SERVER_PORT=8000 # Your Application will Running on PORT
```

## Commands

Running directly on your local

```bash
yarn dev
```

Running for production

```bash
yarn build && yarn start
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--helpers\        # Custom helpers
 |--libraries\      # Custom libraries
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--public\         # Static folder
 |--routes\         # Routes
 |--services\       # Service classes
 |--traits\         # Trait classes
 |--validations\    # Validation classes
 |--app.js          # Express app
 |--server.js       # App entry point
```
