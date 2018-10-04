#!/usr/bin/env bash

minikube start --memory 5120 --cpus=4

# set web
eval $(minikube docker-env)
cd loopback-server
docker build -t lookback-server:v1 .
cd ../

kubectl create -f ./loopback-server/web.yaml

minikubeIP=$(minikube ip)
echo "ADD the following to your /etc/hosts (if not exists): \n $minikubeIP  minikube.local"
echo "Then open http://minikube.local/ in your browser"
exit 0
