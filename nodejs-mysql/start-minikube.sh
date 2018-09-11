#!/usr/bin/env bash

minikube start
eval $(minikube docker-env)
cd mysql
docker build -t database:v1 .



# MYSQL

kubectl create -f mysql.yaml

echo "wait for mysql to start"
while ! kubectl logs -l app=mysql | grep "mysqld: ready for connections."
do
 echo "$(date) - still waiting for mysql to start..."
 sleep 3
done
echo "$(date) - mysql connected successfully"



cd ../web
docker build -t web-mysql:v1 .
kubectl create -f web.yaml

cd ../

minikubeIP=$(minikube ip)
echo "ADD the following to your /etc/hosts (if not exists): \n $minikubeIP  minikube.local"
echo "Then open http://minikube.local/ in your browser"
exit 0
