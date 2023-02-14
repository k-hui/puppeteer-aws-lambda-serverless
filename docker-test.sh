# curl -X POST "http://localhost:9000/2015-03-31/functions/function/invocations" \
#     -H 'Content-Type: application/json' \
#     -d '{"path":"/","httpMethod":"GET","requestContext":{}}'

curl -X POST "http://localhost:9000/2015-03-31/functions/function/invocations" \
    -H 'Content-Type: application/json' \
    -d '{"path":"/pdf","queryStringParameters":{"url":"https://news.google.com/"},"httpMethod":"GET","requestContext":{}}'
