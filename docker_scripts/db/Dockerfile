FROM mariadb/server:10.1

ENV MYSQL_ROOT_PASSWORD=pass
ENV MYSQL_USER=daihire
ENV MYSQL_PASSWORD=daihire
EXPOSE 3306/tcp
COPY ./generate.sql ./docker-entrypoint-initdb.d