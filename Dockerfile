FROM node:20-alpine AS build
WORKDIR /build
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian11
COPY --from=build /build/dist .
CMD ["node", "src/entrypoints/server.js"]
EXPOSE 3000