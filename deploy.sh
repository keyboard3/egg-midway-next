export PROJECT_NAME=egg-midway-next
cat deploy/deployment.yml | envsubst | kubectl apply -f -
cat deploy/service.yml | envsubst | kubectl apply -f -