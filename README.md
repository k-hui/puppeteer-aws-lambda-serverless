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

## Test

```
sh test.sh
```

### PDF

- http://localhost:3000/pdf?url=https://news.yahoo.com/
- http://localhost:3000/pdf?url=https://news.google.com/

### Image

- http://localhost:3000/image?url=https://news.yahoo.com/
- http://localhost:3000/image?url=https://news.google.com/

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
