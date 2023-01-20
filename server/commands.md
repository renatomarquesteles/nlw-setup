Terminal commands used to develop this application

`npm init -y`
Initializes the default configuration for the application

`npm i fastify`
Installs Fastify which is a web framework to create apps with NodeJS

`npm i typescript`
Installs TypeScript

`npx tsc --init`
Creates TypeScript configuration file tsconfig.json

`npm i tsx -D`
Installs tsx to run the application with TypeScript

`npm run dev`
Runs the application

`npm i -D prisma`
`npm i @prisma/client`
Installs Prisma which is a Node.js and TypeScript ORM to work with databases

`npx prisma init --datasource-provider SQLite`
Initializes prisma using SQLite database

`npx prisma migrate dev`
Reads "prisma/schema.prisma" and create a new migration to update the database

`npx prisma studio`
Opens database interface on the browser

`npm i @fastify/cors`
Installs CORS library to enable front-end connections to our server

