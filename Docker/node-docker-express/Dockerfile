# specify an 'alpine' node base image
FROM node:alpine

# the folder application within the container (prevents conflicts with OS folders)
WORKDIR  /usr/app

# install dependencies (copies 'from folder' --> 'destination folder')
COPY ./package.json      
RUN npm install

# copy application files (moved here to make use of Docker's cache machanism)
COPY ./ ./      

# startup command
CMD ["npm", "start"]