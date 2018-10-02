# Kubernetes-node-cassandra 
## Node-js web app with cassandra cluster storage on k8s

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

## Testing the App
* Update /etc/hosts according to the start prompt
* Open [http://minikube.local/index.html](http://minikube.local/index.html)
#### Testing with curl
* Add customer
```
curl --request POST \
  --url http://minikube.local/api/customers \
  --header 'Cache-Control: no-cache' \
  --header 'Content-Type: application/json' \
  --data '{"name":"Company 1","address":"Highway 1"}' 
```
* Get customers
```
curl -X GET \
  http://minikube.local/api/customers \
  -H 'Cache-Control: no-cache'
```

#### Testing with [Postman](https://www.getpostman.com/)
* Open postman and import ./postman/minikube.postman_collection.json

#### Testing with [newman](https://www.npmjs.com/package/newman)
* install newman
```
node install newman --global
``` 
* from ./postman run:
```
newman run minikube.postman_collection.json -n 2
```