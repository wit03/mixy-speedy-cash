# Use the official Node.js 22 image as the base image
FROM node:21.7.3

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies using PNPM
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose the default Next.js port
EXPOSE 8080

# Start the Next.js application
CMD ["pnpm", "start"]