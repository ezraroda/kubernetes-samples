#!/bin/bash
eval $(minikube docker-env -u)
minikube stop
minikube delete
exit 0




