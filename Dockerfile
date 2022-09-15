# This stage installs our modules
FROM mhart/alpine-node:16 AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM mhart/alpine-node:16 AS serverdeps
WORKDIR /app
COPY package.json yarn.lock ./
RUN NODE_ENV=production yarn install --frozen-lockfile

FROM deps AS builder
COPY . .
RUN yarn build

FROM serverdeps AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/bootstrap.js .

ENV NODE_ENV=production
ENV BASE_PATH=/egg-midway-next
CMD ["npm","run", "start"]