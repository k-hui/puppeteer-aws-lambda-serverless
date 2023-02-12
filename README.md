# puppeteer-aws-lambda-serverless

## References

- https://aws.amazon.com/blogs/architecture/field-notes-scaling-browser-automation-with-puppeteer-on-aws-lambda-with-container-image-support/

## Getting Started

```
npm install
npm run start
```

## Deploy

```
sls deploy
```

## Test with docker

```
sh docker-build.sh
sh docker-run.sh
sh docker-test.sh
```

## Clean docker image

```
docker system prune -f
```
