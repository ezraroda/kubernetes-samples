#!/usr/bin/env bash

# cleanup

kubectl delete -f ./mysql/mysql.yaml
kubectl delete -f ./web/web.yaml

eval $(minikube docker-env -u)
minikube stop
minikube delete

exit 0  
