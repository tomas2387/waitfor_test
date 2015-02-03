wget http://download.redis.io/releases/redis-2.8.19.tar.gz
ls
tar xvf redis-2.8.19.tar.gz 
cd redis-2.8.19/
ls
sudo apt-get install make
make
make test
cd  src/
./redis-cli ping
./redis-server &