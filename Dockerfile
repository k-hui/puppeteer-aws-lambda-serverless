FROM public.ecr.aws/lambda/nodejs:16 as development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./

RUN npm ci

COPY src/ src/

RUN npm run build

FROM public.ecr.aws/lambda/nodejs:16 as production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=development /app/dist/ ./dist/

# test only
COPY app.js ./dist/

EXPOSE 3000

# You can overwrite command in `serverless.yml` template
CMD [ "/app/dist/lambda.handler" ]
# CMD [ "/app/dist/app.handler" ]