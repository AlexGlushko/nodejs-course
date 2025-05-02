FROM node:18-alpine

# Set in the docekr-compose file
# ARG uid=1000

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000
# Set the user to app

# Command to run the application
CMD ["npm", "run", "dev"]