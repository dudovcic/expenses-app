The project includes NestJS API with Postgres database which consists of 2 tables and a React UI application which uses the former API. There's no auth but each expense in linked to a user which can be selected when creating an expense, apart from auth, more ideally a new user should be created if a non-existing username was entered.

Database should be auto synced upond starting the API, but a TODO would be to add migrations instead.

Pre-requisites:

- Make sure you've got yarn installed
- Install and/or run Postgres on port 5432

How to run

- Install all dependencies

UI:

- cd expenses-app/

- Run `yarn`

- Setup Tailwind - `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch` ( https://tailwindcss.com/docs/installation )

- Run `yarn dev`

API:

- cd expenses-api/

- Run `yarn`

- Environment variables are required, check .env.example and create .env file in expenses-api/ accordingly to make sure you can connect to Postgres

- Run `yarn start`

Database seed:

- Make sure seeds.ts config is correctly setup
- Run `yarn db:seed`