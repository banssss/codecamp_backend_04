FROM node:14

WORKDIR /hwfolder/
COPY ./package.json /hwfolder/
COPY ./yarn.lock /hwfolder/
RUN yarn install

COPY . /hwfolder/
CMD yarn dev
