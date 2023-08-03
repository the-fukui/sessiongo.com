#!/bin/bash

# SIGINT (Ctrl+C) をトラップして、docker-compose downを実行する
trap "docker-compose down" INT

docker-compose up -d
wait
sleep 1; # docker compose up直後だとhasura consoleが失敗する
hasura console
