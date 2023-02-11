curl -X GET --url "http://localhost:9000/2015-03-31/functions/function/invocations" --header 'Content-Type: application/json' --data '{"queryStringParameters": {"name": "john"}}'

# curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" \
#     -d '{"payload":"hello world!"}'
