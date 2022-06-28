FROM node 
# from says what immage that we are starting with what OS and language bindings

WORKDIR /app
# what we coppy stuff into this is the starting derectory

COPY package.json ./
# copy package.json file into the immage copyied first so that thre is no conflict with node modules derectory

RUN npm install
# this donlowds the nodes modules

COPY . ./

CMD npm start
# tells the immage what to do at the end. it should start the server running