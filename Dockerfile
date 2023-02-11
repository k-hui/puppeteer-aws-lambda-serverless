FROM public.ecr.aws/lambda/nodejs:18

COPY app.js ./

# You can overwrite command in `serverless.yml` template
CMD ["app.handler"]