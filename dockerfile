# specify the node base image with your desired version node:<version>
FROM node:9

ENV workdir /screenshotjs/
WORKDIR ${workdir}
ADD package.json tensorboard_screenshot.js ${workdir}
RUN npm install