#!/bin/bash
minikube start --memory 5120 --cpus=4 \
    && kubectl create -f ./cassandra/cassandra-service.yaml \
    && sleep 30 \
    && kubectl create -f ./cassandra/cassandra-statefulset.yaml
sleep 30
kubectl get statefulset cassandra
sleep 30
kubectl get pods -l="app=cassandra"
sleep 30
kubectl exec cassandra-0 -- nodetool status
sleep 30
echo "Initilizing demodb keyspace..."
# set keyspace and table
kubectl cp ./cassandra/init.sql cassandra-0:/tmp/init.sql
kubectl exec cassandra-0 -- cqlsh -f /tmp/init.sql
kubectl exec cassandra-0 -- rm -f /tmp/init.sql
# set web
eval $(minikube docker-env)
cd web
docker build -t web-cassandra:v1 .
kubectl create -f web-deployment.yaml
cd ../
minikubeIP=$(minikube ip)
echo "ADD the following to your /etc/hosts (if not exists): \n $minikubeIP  minikube.local"
echo "The open http://minikube.local/ in your browser"
exit 0