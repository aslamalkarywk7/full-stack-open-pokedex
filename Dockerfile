# Node
FROM node:20-slim

# create a non-root user
RUN useradd --create-home appuser

WORKDIR /app
COPY --chown=appuser:appuser package*.json ./
RUN npm ci --omit=dev

COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 3000
CMD ["node", "app.js"]