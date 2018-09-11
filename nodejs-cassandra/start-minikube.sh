#!/usr/bin/env bash

minikube start --memory 5120 --cpus=4
sleep 50
kubectl create -f ./cassandra/cassandra.yaml


# wait for cassandra

echo "wait for cassandra to start"
while ! kubectl logs cassandra-0 | grep "is now UP"
do
 echo "$(date) - still waiting for cassandra to start..."
 sleep 3
done
echo "$(date) - cassandra connected successfully"

kubectl exec cassandra-0 -- nodetool status
sleep 100
echo "Initilizing demodb keyspace..."
# set keyspace and table
kubectl cp ./cassandra/init.sql cassandra-0:/tmp/init.sql
sleep 30
kubectl exec cassandra-0 -- cqlsh -f /tmp/init.sql
sleep 30
kubectl exec cassandra-0 -- rm -f /tmp/init.sql

# set web
eval $(minikube docker-env)
cd web
docker build -t web-cassandra:v1 .
kubectl create -f web.yaml
cd ../
minikubeIP=$(minikube ip)
echo "ADD the following to your /etc/hosts (if not exists): \n $minikubeIP  minikube.local"
echo "Then open http://minikube.local/ in your browser"
exit 0
