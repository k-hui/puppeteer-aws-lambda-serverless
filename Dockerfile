FROM public.ecr.aws/lambda/nodejs:16-x86_64 as development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./

# skips puppeteer installing chrome and points to correct binary
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm ci

COPY src/ src/

RUN npm run build

FROM public.ecr.aws/lambda/nodejs:16-x86_64 as production

# Install Chrome to get all of the dependencies installed
RUN yum install -y amazon-linux-extras
RUN amazon-linux-extras install epel -y
RUN yum install -y chromium

WORKDIR /app

COPY package*.json ./

# skips puppeteer installing chrome and points to correct binary
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm ci --omit=dev

COPY --from=development /app/dist/ ./dist/

EXPOSE 3000

CMD [ "/app/dist/lambda.handler" ]