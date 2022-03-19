FROM node:alpine
WORKDIR /app
COPY ./ ./
EXPOSE 8880
RUN npm i
RUN npm install nodemon@latest -g --silent
CMD ["npm", "run", "start"]


