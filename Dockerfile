FROM node:20-alpine AS build
WORKDIR /build
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /aoc2023
COPY --from=build /build/dist ./dist/
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
CMD ["npm", "run", "server"]
EXPOSE 3000