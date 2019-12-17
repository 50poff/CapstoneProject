FROM node:10

ARG PEM_PASS=pass
ARG API_URL=https://localhost:3000/api/v1
ARG APP_URL=https://localhost:3000
ARG PORT=3000
ARG DB_URL=172.17.0.3
ARG MYSQL_USER=daihire
ARG MYSQL_PASSWORD=daihire

ENV PEM_PASS=${PEM_PASS}
ENV API_URL=${API_URL}
ENV APP_URL=${APP_URL}
ENV PORT=${PORT}
ENV DB_URL=${DB_URL}
ENV DB_USER=${MYSQL_USER}
ENV DB_PASS=${MYSQL_PASSWORD}

EXPOSE ${PORT}

RUN mkdir DaiHire
RUN mkdir /root/.ssh
COPY ./id_rsa ./root/.ssh/
COPY ./id_rsa.pub ./root/.ssh/
RUN chmod 700 ./root/.ssh/id_rsa && chmod 700 ./root/.ssh/id_rsa.pub
RUN  ssh-keyscan -H github.com >> ./root/.ssh/known_hosts
WORKDIR /DaiHire
RUN git init
RUN git pull git@github.com:Jacob-warnes/capstoneProject.git
RUN npm install
COPY ./generateENV.sh ./
RUN awk '{ sub("\r$",""); print }' ./generateENV.sh > genENV.sh
RUN bash genENV.sh
RUN mkdir certificates
RUN apt-get install openssl
WORKDIR /DaiHire/certificates
RUN openssl req -newkey rsa:2048 -x509 -days 3650 -utf8 -subj "/C=CA/ST=BC/L=Victoria/O=camosun/OU=capstone/CN=localhost"  -passout pass:$PEM_PASS -keyout key.pem -out cert.pem
WORKDIR /DaiHire
RUN npm run build
CMD npm run start