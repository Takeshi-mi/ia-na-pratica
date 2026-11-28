FROM node:24-alpine
WORKDIR /app
COPY server.js package.json ./
COPY public ./public
ENV NODE_ENV=production PORT=3000 DATA_DIR=/dados
RUN mkdir -p /dados && chown node:node /dados
USER node
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=3s --start-interval=2s --start-period=10s CMD wget -qO- http://127.0.0.1:3000/saude || exit 1
CMD ["node", "server.js"]
