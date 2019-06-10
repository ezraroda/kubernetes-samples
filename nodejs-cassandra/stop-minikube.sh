#!/usr/bin/env bash

# cleanup

echo "stoping minikube cluster..."

#grace=$(kubectl get po cassandra-0 -o=jsonpath='{.spec.terminationGracePeriodSeconds}')
#sleep $grace

kubectl delete -f ./cassandra/cassandra.yaml
kubectl delete -f ./web/web.yaml

eval $(minikube docker-env -u)
minikube stop
minikube delete

exit 0  
