# This stage installs our modules
FROM mhart/alpine-node:14
WORKDIR /app
COPY package.json yarn.lock ./

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python3
RUN yarn
COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV BASE_PATH=/egg-midway-next
CMD ["npm","run", "start"]