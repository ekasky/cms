FROM node:22

# Set the working directory for the app
WORKDIR /app

# Copy the packagejson and package-lock.json to the working dir
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the reset of the applications code to the working dir
COPY . . 

# Command to run the application in development mode
CMD ["npm", "run", "dev"]