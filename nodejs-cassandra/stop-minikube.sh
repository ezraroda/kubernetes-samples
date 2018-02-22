#!/bin/bash

# cleanup

grace=$(kubectl get po cassandra-0 -o=jsonpath='{.spec.terminationGracePeriodSeconds}') \
  && kubectl delete statefulset -l app=cassandra \
  && echo "Sleeping $grace" \
  && sleep $grace \
  && kubectl delete pvc -l app=cassandra

# delete all services
kubectl delete service -l app=cassandra

eval $(minikube docker-env -u)
minikube stop
sleep $grace
minikube delete

exit 0  