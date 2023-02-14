docker rmi puppeteer-aws-lambda-serverless
# docker build --no-cache --tag puppeteer-aws-lambda-serverless .
# for M1 MacOS
docker buildx build --platform linux/arm/v7 --no-cache --tag puppeteer-aws-lambda-serverless .
