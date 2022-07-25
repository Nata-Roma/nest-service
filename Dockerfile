FROM node:18-alpine  As build

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./
COPY --chown=node:node prisma ./prisma/
COPY --chown=node:node .env ./

# Install app dependencies
RUN npm ci

RUN npx prisma generate

COPY --chown=node:node . .

RUN npm run build
RUN npm prune --production

USER node

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma

#CMD [ "node", "dist/main.js" ]
CMD [  "npm", "run", "start:migrate:prod" ]
