# take-home-starter

## Setup

To Install

- Java Version Manager: https://sdkman.io/
- Node Version Manager: https://github.com/nvm-sh/nvm
- Docker: https://docs.docker.com/desktop/

### MongoDB

```bash
docker pull mongo
docker run -d --name my-mongodb-container -p 27017:27017 mongo
```

### Java

```bash
sdk list java
sdk install java 17.0.7-tem
sdk use java 17.0.7-tem
sdk default java 17.0.7-tem
```

After the successful installation of the JDK go into the backend directory and run.

```bash
cd backend
./gradlew build
./gradlew bootRun
```

### NodeJS

```bash
nvm list
nvm install v18.12.1
nvm use v18.12.1
nvm alias default v18.12.1
```

Then, go into the frontend directory and run

```bash
cd frontend
pnpm install
npm run dev
```
