#!/usr/bin/env bash

# cleanup

kubectl delete -f ./zookeeper/zookeeper.yaml
kubectl delete -f ./kafka/kafka.yaml
kubectl delete -f ./web/web.yaml

eval $(minikube docker-env -u)
minikube stop
minikube delete

exit 0  