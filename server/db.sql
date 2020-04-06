DROP TABLE IF EXISTS `xx_table`;
CREATE TABLE `xx_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(200) NOT NULL DEFAULT '',
  `content` text,
  `addtime` bigint(20) DEFAULT '0',
  `updatetime` bigint(20) DEFAULT '0',
  `imagename` char(200) DEFAULT '',
  `creator` char(20) DEFAULT '',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `xx_account`;
CREATE TABLE `xx_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(200) NOT NULL DEFAULT '',
  `password` char(200) NOT NULL DEFAULT '',
  `addtime` bigint(20) DEFAULT '0',
  `logincount` int(11) DEFAULT '0',
  `lasttime` bigint(20) DEFAULT '0',
  `state` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
INSERT INTO `xx_account` VALUES ('1', 'admin', 'admin', '0', '0', '0', '1');

DROP TABLE IF EXISTS `xx_loginlog`;
CREATE TABLE `xx_loginlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(200) NOT NULL DEFAULT '',
  `logintime` bigint(20) DEFAULT '0',
  `loginip` char(20) DEFAULT '127.0.0.1',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `xx_skill`;
CREATE TABLE `xx_skill` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `author` varchar(20) NOT NULL,
  `type` int(5) NOT NULL,
  `tag` int(5) NOT NULL,
  `click` int(11) DEFAULT '0',
  `sort` int(11) DEFAULT '0',
  `content` text,
  `updatetime` int(10) NOT NULL DEFAULT '0',
  `addtime` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `tag` (`tag`),
  KEY `sort` (`sort`),
  KEY `click` (`click`)
) DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `xx_special`;
CREATE TABLE `xx_special` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `subtitle` varchar(50) NOT NULL,
  `img` varchar(128) NOT NULL DEFAULT '',
  `color` varchar(32) NOT NULL DEFAULT '',
  `type` int(5) NOT NULL,
  `sort` int(11) DEFAULT '0',
  `click` int(11) DEFAULT '0',
  `url` varchar(255) DEFAULT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0-no,1-yes',
  `content` text,
  `updatetime` int(10) NOT NULL DEFAULT '0',
  `addtime` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `click` (`click`),
  KEY `sort` (`sort`)
) DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `xx_works`;
CREATE TABLE `xx_works` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL DEFAULT '',
  `url` varchar(255) DEFAULT NULL,
  `img` varchar(128) NOT NULL DEFAULT '',
  `type` int(5) NOT NULL,
  `tag` varchar(50) NOT NULL DEFAULT '',
  `click` int(11) DEFAULT '0',
  `sort` int(11) DEFAULT '0',
  `good` int(11) DEFAULT '0',
  `content` text,
  `addtime` int(10) NOT NULL,
  `updatetime` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

