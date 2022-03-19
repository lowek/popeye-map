FROM node:alpine
WORKDIR /app

COPY ./ ./
EXPOSE 3000
RUN npm i
RUN npm install react-scripts@latest -g --silent
CMD ["npm", "run", "start"]
