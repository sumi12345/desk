# LNMP 安装笔记

tags: install
date: 2018-01-14
week: 201802

---
12345678901234567890123456789012345678901234567890123456789012345678901234567890
## day 1 双系统

### fedora 启动盘刻录/校验/安装

### refind 安装

### UEFI 启动顺序调整无效，禁用refind之前的选项

### refind 主题设置 refind-minimal

### google 拼音(失败)

## day 2 LNMP环境

### 代理设置

### yum 配置源为 sohu / 163
```
cd /etc/yum.repos.d
wget http://mirrors.163.com/.help/fedora-163.repo
wget http://mirrors.163.com/.help/fedora-updates-163.repo
yum clean all
yum makecache
```

### emacs 安装，prelude 配置
```
yum install emacs
curl -L https://git.io/epre | sh
emacs
```

### phpstorm 下载，注册

### nodejs 安装并启用淘宝镜像 cnpm (改 ~/.zshrc)

### composer 安装并启用国内源

### php 安装
```
yum install libxml2-devel
./configure --enable-fpm --enable-pdo --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd
make
make install
cp ./php.ini-development /usr/local/lib/php.ini
```

### nginx 安装
```
yum install pcre-devel
yum install zlib-devel
yum install openssl-devel
./configure
make
make install
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/nginx
```

### mysql 安装
```
groupadd mysql
useradd -g mysql mysql
yum install cmake gcc-c++ ncurses-devel bison
tar -xvf mysql-5.6.30-linux-glibc2.5-x86_64.tar.gz
mv mysql-5.6.30-linux-glibc2.5-x86_64 /usr/local/mysql
cd /usr/local/mysql
./scripts/mysql_install_db --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
cp support-files/mysql.server /etc/init.d/mysql
chkconfig --add mysql
service mysql start
```

### php-fpm 和 nginx
```
cp /usr/local/php/etc/sapi/fpm/php-fpm.conf /usr/local/etc/
emacs /usr/local/nginx/conf/nginx.conf
nginx -s reload
emacs /usr/local/etc/php-fpm.conf
cd /usr/local/etc/php-fpm.d
cp www.conf.default www.conf
```
修改 nginx.conf 的 user 为 sumi
修改 www.conf 的 user 为 sumi ***** (primary script not found)
配置 nginx.conf 的 2221 端口站点为 laravel-5.1/public
创建一个软连接指向 /usr/local/nginx/laravel-5.1
重启 php-fpm 和 nginx
查看 nginx 错误日志 tail /usr/local/nginx/logs/error.log

### php 扩展安装
```
cd php-7.0.27/ext/gd
yum install libmcrypt-devel
yum install libvpx-devel libjpeg-devel libpng-devel libXpm-devel freetype-devel
yum install autoconf
phpize
./configure --with-php-config=/usr/local/bin/php-config --with-freetype-dir --with-png-dir --with-jpeg-dir
make
make install

cd php-7.0.27/ext/mbstring
phpize
./configure
make
make install

cd php-7.0.27/ext/openssl
yum install openssl openssl-devel
mv config0.m4 config.m4
phpize
./configure --with-php-config=/usr/local/bin/php-config
make
make install

ls /usr/local/lib/php/extensions/no-debug-non-zts-20151012/
php --ini
emacs /usr/local/lib/php.ini

ps aux |grep php-fpm
kill 15568
php-fpm

```

## day 3 mplayer(失败)
## day 4 laracasts forum

补全代码

```
git clone https://github.com/sumi12345/laracasts_forum.git
mv laracasts_forum laravel-5.1
cd laravel-5.1
composer install
```

启动服务

```
sudo /usr/local/bin/nginx
sudo /usr/local/sbin/php-fpm
sudo service mysql start
```

连接数据库

```
cd /usr/local/mysql
./bin/mysql -uroot -p
```

创建数据库(mysql下)

```
show databases;
create database laracasts_forum_test;
create user 'laracasts'@'localhost' identified by 'laracasts';
grant all on laracasts_forum_test.* to 'laracasts'@'localhost';
```

补全 js 依赖

```
echo 'alias cnpm="npm --registry=https://registry.npm.taobao.org \
  --cache=$HOME/.npm/.cache/cnpm \
  --disturl=https://npm.taobao.org/dist \
  --userconfig=$HOME/.cnpmrc"' >> ~/.zshrc && source ~/.zshrc

cnpm install
```

初始化

```
cp .env.example .env
# 配置数据库和密码

php artisan key:generate
php artisan migrate

PATH=$PATH:$HOME/laravel-5.1/vendor/bin
export PATH

npm run dev
```

## day 5 oh-my-zsh
[laracasts - setup a mac dev machine](https://laracasts.com/series/setup-a-mac-dev-machine-from-scratch)
[oh-my-zsh github](https://github.com/robbyrussell/oh-my-zsh)
[oh-my-zsh.sh 编译错误](https://github.com/robbyrussell/oh-my-zsh/issues/4069#issue-89607351)

### mount ntfs file system

```
fdisk -l
mount -t ntfs-3g /dev/nvme0n1p4 /mnt/kdata
```
