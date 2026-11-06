FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY public ./public

ENV HOST=0.0.0.0
ENV PORT=4870
ENV ALLOWED_ROOTS=/data

EXPOSE 4870

USER node

CMD ["node", "server/index.js"]
