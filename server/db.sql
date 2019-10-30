CREATE TABLE `demotable` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(200) NOT NULL DEFAULT '',
  `content` text,
  `addtime` bigint(20) DEFAULT '0',
  `creator` char(20) DEFAULT '',
  `type` char(20) DEFAULT '',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;