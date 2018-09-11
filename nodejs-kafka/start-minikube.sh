#!/usr/bin/env bash

minikube start --memory 5120 --cpus=4
sleep 50
kubectl create -f ./zookeeper/zookeeper.yaml

# wait for zookeeper

echo "wait for zookeeper to start"
while ! kubectl logs -l 'name in (zookeeper)' | grep "binding to port 0.0.0.0/0.0.0.0:2181"
do
 echo "$(date) - still waiting for zookeeper to start..."
 sleep 3
done
echo "$(date) - zookeeper connected successfully"


# KAFKA

kubectl create -f ./kafka/kafka.yaml

echo "wait for kafka to start"
while ! kubectl logs -l 'name in (kafka)' | grep "started (kafka.server.KafkaServer)"
do
 echo "$(date) - still waiting for kafka to start..."
 sleep 3
done
echo "$(date) - kafka connected successfully"




kubectl get pods


# set web
eval $(minikube docker-env)
cd web
docker build -t web-kafka:v1 .
kubectl create -f web.yaml
cd ../

minikubeIP=$(minikube ip)
echo "ADD the following to your /etc/hosts (if not exists): \n $minikubeIP  minikube.local"
echo "Then open http://minikube.local/ in your browser"
exit 0
