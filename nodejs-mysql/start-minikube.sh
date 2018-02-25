#!/bin/bash
minikube start
eval $(minikube docker-env)
cd mysql
docker build -t database:v1 .
kubectl create -f mysql-deployment.yaml
cd ../web
docker build -t web:v1 .
kubectl create -f web-deployment.yaml
minikubeIP=$(minikube ip)
echo "ADD the following to your /etc/hosts (if not exists): \n $minikubeIP  minikube.local"
echo "Then open http://minikube.local/ in your browser"
exit 0
