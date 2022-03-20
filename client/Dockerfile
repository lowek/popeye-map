FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm install react-scripts@latest -g --silent
EXPOSE 3000
CMD ["npm", "run", "start"]
