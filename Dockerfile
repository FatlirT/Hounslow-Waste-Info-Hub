# use node version 18.15.0 for this image
FROM node:18.15.0

# set working directory of container
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy files in curr dir to container work dir
COPY . /app

# expose container port 3000 (Next.js app runs on 3000)
EXPOSE 3000

# start app
CMD ["npm", "run", "dev"]
