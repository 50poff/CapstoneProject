## install mariadb on ubuntu 
apt-get -y update
apt-get -y upgrade
apt-get -y install vim
sudo apt-get install mariadb-server mariadb-client

# configure mariadb security with this command
sudo mysql_secure_installation

## edit end of /etc/mysql/my.cnf to include these lines below 
[mysqld]
skip-networking=0
skip-bind-address