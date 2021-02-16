#Start with node base image 
FROM node
#Metadata info on image (optional)
LABEL maintainer="MacKayla programlikeagirl@gmail.com" description="A user manager app and practice for docker" cohort="11" animal="Owl"

EXPOSE 3000/tcp

WORKDIR /app 

COPY . . 

RUN npm install 

CMD ["npm", "start"]