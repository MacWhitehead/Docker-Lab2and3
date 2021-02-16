<!-- 
Lab 2 instructions: 
Run the docker build command to build the image:
docker build -t myapp:latest  . 
Now you can create a container from our new image
docker run -d --rm --name createContainer -p 8080:3000 myapp:latest 
open localhost://8080 to access the website
-->

<!-- 
Lab 3 instructions: 
Check to see if docker has Swarm mode active
docker system info
Should see swarm section in your output
    …
    Swarm: active
        NodeID: kv2382glqijzdmxm5khn217az
        Is Manager: true
        ClusterID: 44yqf6rfbdqh0woj95tfvsnji
                …
If it is not active then initialize a swarm mode (one node cluster)
$> docker swarm init

To start stack: 
docker stack deploy -c docker-stack.yaml myapp-stack

List active containers: 
docker ps

Stop the running container
docker stop <container-id>

View replicas: 
docker stack services myapp-stack

Scale out first stack to 7 instances/replicas:
docker service scale myapp-stack_mywebsite1=7

Remove the stack (including all containers):
docker stack rm myapp-stack

-->
