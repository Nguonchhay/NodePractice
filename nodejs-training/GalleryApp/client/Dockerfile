FROM node:lts-alpine3.16

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json .
RUN npm install
COPY . ./

EXPOSE 3001

RUN addgroup app && adduser -S -G app app
RUN mkdir node_modules/.cache
RUN chown app:app node_modules/.cache
USER app

CMD ["npm", "run", "serve"]
