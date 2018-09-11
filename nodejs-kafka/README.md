# Kubernetes-node-kafka 
## Node-js web app with kafka cluster on k8s

## Pre-requisits
* [minikube](https://github.com/kubernetes/minikube)
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

## Kafka configuration
See [http://strimzi.io/ version @0.5.0](http://strimzi.io/docs/0.5.0/)


## Setup
*Setup scripts are supported on Linux and MacOS*
* Enable ingrees addon in minikube
```
$ minikube addons list
- addon-manager: enabled
- coredns: disabled
- dashboard: enabled
- default-storageclass: enabled
- efk: disabled
- freshpod: disabled
- heapster: disabled
- ingress: disabled
- kube-dns: enabled
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
* Open [http://minikube.local](http://minikube.local/)

#### Testing (from cluster) with [kafkacat] (https://github.com/edenhill/kafkacat) 
* Add customer
```
echo '{"name":"Company 1","address":"Highway 1"}' | kafkacat -P -b ${KAFKA_SERVICE_HOST}:${KAFKA_SERVICE_PORT} -t nodejs-topic

Or with base64 encoding
echo $(echo '{"name":"Company 1","address":"Highway 1"}' | base64) | kafkacat -P -b ${KAFKA_SERVICE_HOST}:${KAFKA_SERVICE_PORT} -t nodejs-topic

```
* Get customers
```
kafkacat -C -b ${KAFKA_SERVICE_HOST}:${KAFKA_SERVICE_PORT} -t nodejs-topic -o beginning -e -q
```

