#!/usr/bin/env bash

# cleanup

kubectl delete -f ./conf/web.yaml

eval $(minikube docker-env -u)
minikube stop
minikube delete

exit 0  