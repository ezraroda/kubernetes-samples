# Kubernetes-loopback server  
## Node-js web app with kafka cluster on k8s

## Pre-requisits
* [minikube](https://github.com/kubernetes/minikube)
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Setup
*Setup scripts are supported on Linux and MacOS*
* Enable ingrees addon in minikube
```
$ minikube addons list
- addon-manager: enabled
- coredns: enabled
- dashboard: enabled
- default-storageclass: enabled
- efk: disabled
- freshpod: disabled
- heapster: disabled
- ingress: disabled
- kube-dns: disabled
- metrics-server: disabled
- nvidia-driver-installer: disabled
- nvidia-gpu-device-plugin: disabled
- registry: disabled
- registry-creds: disabled
- storage-provisioner: enabled
```
To enable ingress, run:
```
$ minikube addons enable ingress
ingress was successfully enabled
```
* clone the repo
* Open terminal and run: ``./start-minikube.sh``
* To stop run: ``./stop-minikube.sh``
    
    *Stop will remove ALL resources including the minikube VM.* 

## Testing the API
* Update /etc/hosts according to the start prompt
* Open [http://minikube.local/](http://minikube.local/) to find more.

#### Testing with [Postman](https://www.getpostman.com/)
* Open [Postman](https://www.getpostman.com/) and import ./postman/minikube.postman_collection.json

## LoopBack 4 info
* Check Getting started [@LoopBack 4](https://loopback.io/doc/en/lb4/)

