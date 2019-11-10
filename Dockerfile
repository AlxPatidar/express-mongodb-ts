FROM node:10.16.3

# Create app directory
WORKDIR /app

# Copy package file and src folder
COPY package.json /app/
COPY src /app/src

# Copy enviroment variable data
COPY .babelrc /app/.babelrc
COPY .env /app/.env


# Install application dependencies
RUN yarn install

RUN yarn --pure-lockfile

EXPOSE 4000

CMD ["yarn", "start"]