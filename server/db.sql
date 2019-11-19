DROP TABLE IF EXISTS `demo_table`;
CREATE TABLE `demo_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(200) NOT NULL DEFAULT '',
  `content` text,
  `addtime` bigint(20) DEFAULT '0',
  `updatetime` bigint(20) DEFAULT '0',
  `imagename` char(200) DEFAULT '',
  `creator` char(20) DEFAULT '',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `demo_account`;
CREATE TABLE `demo_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(200) NOT NULL DEFAULT '',
  `password` char(200) NOT NULL DEFAULT '',
  `addtime` bigint(20) DEFAULT '0',
  `logincount` int(11) DEFAULT '0',
  `lasttime` bigint(20) DEFAULT '0',
  `state` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;
INSERT INTO `demo_account` VALUES ('1', 'admin', 'admin', '0', '0', '0', '1');

DROP TABLE IF EXISTS `demo_loginlog`;
CREATE TABLE `demo_loginlog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(200) NOT NULL DEFAULT '',
  `logintime` bigint(20) DEFAULT '0',
  `loginip` char(20) DEFAULT '127.0.0.1',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `demo_skill`;
CREATE TABLE `demo_skill` (
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