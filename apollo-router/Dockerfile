FROM ghcr.io/apollographql/router:v1.37.0

COPY supergraph-schema.gql .
COPY router.yml .

CMD ["--config", "router.yml", "--supergraph", "supergraph-schema.gql"]
