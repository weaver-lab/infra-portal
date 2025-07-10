# infra-portal

## About
The Infra Portal consists of a web/frontend application that offers a user interface, and a backend API service.

This repo contains the code bases for the backend and frontend applications for the Infra Portal. The code bases are designed to be run in docker containers; Docker files and a docker-compose file are included in their respective folders.

The backend is written in Python and uses FastAPI to offer an API service for applications and users to make requests. In the process of fulfilling these requests, it interacts with a running mongodb container.

While the backend and db containers are running, the frontend, which is running within its own container, can make API calls to the backend and display retrieved data on a map view.

## Running the applications

### Pre-requisites
1. Docker-engine (or Docker Desktop)
2. Docker compose
3. A MapboxGL API token. The map used in the frontend app utilises the MapboxGL library. A MapboxGL token is required to load the map. This must be added to two .env files, which will explained later. Note, the Mapbox account/token must have sufficient privileges required to make API calls.

### Setup
To run the Infra Portal, the respective .env files must first be created.

1. Clone the repo.

2. Go into the root of the cloned directory: `cd infra-portal`.

3. Copy and rename `.env_example` to `.env`, and replace the default variable values where the values end in `_here`, such as `MONGO_INITDB_ROOT_USERNAME=root_username_here`. Replace the text `your_mapbox_token_here` with your Mapbox token. Change any other values if need be, including the auth code to be used on the frontend's registration page.

4. Navigate to the infra-portal-fe directory with `cd infra-portal-fe`, and then copy and rename `.env_example` to `.env`, and replace the text `your_mapbox_token_here` with your Mapbox token. Change any other values if need be, to match with changes made in the root directory's `.env` file.

5. Go back to the root directory and navigate to infra-portal-be with `cd infra-portal-be`. Then, copy and rename `.env_example` to `.env`, and replace the IDA db username and password values with your own.

6. Back in the root directory, navigate to the mongo directory with `cd mongo`. Copy and rename `.env_example` to `.env`, and replace the root and IDA db username and password values with your own.

7. Finally, navigate to the root of the cloned directory, and run `docker compose up`.