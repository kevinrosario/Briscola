#!/bin/bash

curl "http://localhost:4741/games" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}"

echo
