/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50707
 Source Host           : localhost
 Source Database       : team

 Target Server Type    : MySQL
 Target Server Version : 50707
 File Encoding         : utf-8

 Date: 06/14/2016 21:39:45 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `account`
-- ----------------------------
BEGIN;
INSERT INTO `account` VALUES ('1', '571963318@qq.com', '8a737845c12bb846b35cd9bf72275304', '1464766568'), ('2', '571963318@qq.com', '041982a4c6b4197eebaa208481c8a10f', '1464766597'), ('3', '571963318@qq.com', 'c333f65d121d81b1f0fd73906aef5767', '1464766689'), ('4', '571963318@qq.com', '1465126981268a7A8KLIsK9', '1465126981'), ('5', '571963318@qq.com', '1465127002471QGjjo67rLI', '1465127002'), ('6', '571963318@qq.com', '32fb47f23a449ce1dff38f70e217a6aatBUAO9ufm2yHs41itnfJ', '1465127597'), ('7', '571963318@qq.com', 'dd1a2b45f68e2e995627ac8a310d173cxc8R3fj0gdqAJe6QQ9Wy', '1465216805'), ('8', '571963318@qq.com', 'de5cff268f0cd49bd7e130cbcc78738eQXhkky50Ao9JsN5134jw', '1465226567'), ('9', '571963318@qq.com', '4f64cd2ec59dfa3af388c440831f065bUBEmlwp9r5ttBTJamVj2', '1465228212'), ('10', '571963318@qq.com', '8f71695423119fd022d45cfe660e5da636hLhIsHA2qTGuoyj6iu', '1465230531'), ('11', '571963318@qq.com', '74724fbcb287822fca25fd4db2ed3b24XkNwwB99q1qjJjgUpoyU', '1465230859'), ('12', '571963318@qq.com', '24056e02fa0a12ba16eeed8874b6e2e283SdLWqRtk8VWqQM8uap', '1465231115'), ('13', '571963318@qq.com', 'b02b095f17272b49d6b6158812a92973ulghAoB5j2fr5leyNxcj', '1465231554'), ('14', '571963318@qq.com', 'ffca25be0dac3067ad95645bfb0d57e2EOSCvHGOHT5h7rB06aJT', '1465375087'), ('15', '571963318@qq.com', 'cf678b980ad49e9646c85f39fcb131b0E55tANST4vNDTckBlh97', '1465375148'), ('16', '571963318@qq.com', '079704943c1d831ea56e83a1e8274428mcOwsmgaazlVOkjeHrtz', '1465375246'), ('17', '571963318@qq.com', '9a9f0dfd6511052fdcb8238ed27115d7LPGp45hwWJjSb4MkPTyf', '1465375881'), ('18', '571963318@qq.com', 'd38b7be43ef490a19dc1d64f77f1a937QbbjVOLlq7qvaTCWse5u', '1465379006'), ('19', '571963318@qq.com', '0655f27ca319dcd47b5c51dab4baf5cf24Nb20Vp6lw5jTbCGuDe', '1465379094'), ('20', '571963318@qq.com', 'dcb46d10babc2100ace1c2ab8a0a0337BALo8SXwYMeu0yOCp66l', '1465379103'), ('21', '571963318@qq.com', '36df29cc7bde60559bf5cb0df1a1606dKoQTrVMgGwXQAI8JOeWn', '1465379126'), ('22', '571963318@qq.com', 'af7464ea891f46192b6e6e4af3ae3a44SPMuM4LdZicIxoOLoPo7', '1465908672'), ('23', '571963318@qq.com', 'bde6bfe073a75827dc968e17690ef65dXHjzDtafUwvVyPoElExj', '1465909075');
COMMIT;

-- ----------------------------
--  Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `topic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time` varchar(200) NOT NULL,
  `content` varchar(10000) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `file`
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `folder_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `path` varchar(255) COLLATE utf8_bin NOT NULL,
  `size` bigint(20) NOT NULL,
  `time` int(11) NOT NULL,
  `modify_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='文件表';

-- ----------------------------
--  Records of `file`
-- ----------------------------
BEGIN;
INSERT INTO `file` VALUES ('6', '1', 'error.log', 'upload_4a00dc15ad25d9a46406586a8ad0ea5b.log', '14192', '1465898016', '1465898016'), ('7', '1', '1.doc', 'upload_2160412be912824421346a3b0e0a395b.doc', '544768', '1465898047', '1465898047'), ('8', '1', '1.doc', 'upload_abe1135aa1db8fb9fe5d465f8f1c6427.doc', '544768', '1465911427', '1465911427'), ('9', '1', '1.doc', 'upload_a76a254e9cb77f660e1f760b4c05d0bf.doc', '544768', '1465911434', '1465911434');
COMMIT;

-- ----------------------------
--  Table structure for `folder`
-- ----------------------------
DROP TABLE IF EXISTS `folder`;
CREATE TABLE `folder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `time` int(11) NOT NULL,
  `modify_time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='文件夹名称';

-- ----------------------------
--  Records of `folder`
-- ----------------------------
BEGIN;
INSERT INTO `folder` VALUES ('1', '19', '我的文件夹', '1465806727', '0'), ('2', '19', '小木', '1465806796', '0'), ('7', '20', '设计图', '1465812687', '0'), ('8', '20', '参考资料', '1465812858', '0'), ('9', '20', '需求文档', '1465813319', '0'), ('10', '19', '需求文档', '1465872437', '1465872437');
COMMIT;

-- ----------------------------
--  Table structure for `project`
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `name` varchar(20) NOT NULL,
  `description` text,
  `manager_id` int(11) DEFAULT NULL,
  `member` varchar(0) DEFAULT NULL,
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `checkbox` int(11) DEFAULT '0',
  `time` int(11) DEFAULT NULL,
  `ss` varchar(100) NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `project`
-- ----------------------------
BEGIN;
INSERT INTO `project` VALUES ('sdsdaaddasads', null, '13', null, '93', '1', '1464748493', 'b5d00867523641eee678e4cf7e623f46'), ('122211212112', null, '13', null, '94', '1', '1464749042', '08df4f79915db28f7bbdc7869a7d4c35'), ('ewqr', null, '19', null, '95', '1', '1465141345', 'ef6721338596cb278abd2fda1f057bdd'), ('达尔文玩儿', null, '19', null, '96', '1', '1465141479', 'e196032f757777cdff8db260ff23b54b'), ('eee', null, '19', null, '97', '1', '1465379371', '7f4920fb41fc24e43955e456b6038bf0'), ('test', null, '19', null, '98', '1', '1465379414', '45357a5c731751a44000d1ba2c0e25fb'), ('test', null, '20', null, '99', '1', '1465589092', 'b428cbb02358afc32cf32f9bdb725a51'), ('234234', null, '19', null, '100', '1', '1465660573', '9ea46a76bd031a9b19bca260ca6b6e01'), ('dfhghfghjj', '124345564', '19', null, '101', '1', '1465872555', '2a2726b611c877aaf5afd005592e2995'), ('项目名称', '当发生的发生发撒地方', '19', null, '102', '1', '1465892522', '69f72c61936eb1a797993c9e200f3ab9'), ('项目管理系统', '研究开发与实践 项目管理系统', '21', null, '103', '1', '1465892622', '32e7e3e1234ecd8d5e8d825ecbeaa7c0');
COMMIT;

-- ----------------------------
--  Table structure for `project_member`
-- ----------------------------
DROP TABLE IF EXISTS `project_member`;
CREATE TABLE `project_member` (
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `member_type` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(100) NOT NULL,
  `ss` varchar(100) NOT NULL,
  `accept` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `project_member`
-- ----------------------------
BEGIN;
INSERT INTO `project_member` VALUES ('93', '13', '1', '83', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '1'), ('93', '14', '0', '84', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '0'), ('93', '16', '0', '85', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '0'), ('93', '18', '0', '86', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '0'), ('94', '13', '1', '87', '122211212112', '08df4f79915db28f7bbdc7869a7d4c35', '1'), ('94', '18', '0', '88', '122211212112', '08df4f79915db28f7bbdc7869a7d4c35', '0'), ('96', '19', '1', '89', '达尔文玩儿', 'e196032f757777cdff8db260ff23b54b', '1'), ('97', '19', '1', '90', 'eee', '7f4920fb41fc24e43955e456b6038bf0', '1'), ('98', '19', '1', '91', 'test', '45357a5c731751a44000d1ba2c0e25fb', '1'), ('98', '19', '0', '92', 'test', '45357a5c731751a44000d1ba2c0e25fb', '0'), ('98', '19', '0', '93', 'test', '45357a5c731751a44000d1ba2c0e25fb', '0'), ('98', '19', '0', '94', 'test', '45357a5c731751a44000d1ba2c0e25fb', '0'), ('99', '20', '1', '95', 'test', 'b428cbb02358afc32cf32f9bdb725a51', '1'), ('100', '19', '1', '96', '234234', '9ea46a76bd031a9b19bca260ca6b6e01', '1'), ('100', '19', '0', '97', '234234', '9ea46a76bd031a9b19bca260ca6b6e01', '0'), ('100', '19', '0', '98', '234234', '9ea46a76bd031a9b19bca260ca6b6e01', '0'), ('100', '19', '0', '99', '234234', '9ea46a76bd031a9b19bca260ca6b6e01', '0');
COMMIT;

-- ----------------------------
--  Table structure for `topics`
-- ----------------------------
DROP TABLE IF EXISTS `topics`;
CREATE TABLE `topics` (
  `title` varchar(200) NOT NULL,
  `content` varchar(10000) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `topics`
-- ----------------------------
BEGIN;
INSERT INTO `topics` VALUES ('eee', '<p>ee</p>', '96', '19', '1', '1465375644');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '邮箱',
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '用户类型,0为禁用，1为普通用户，2为管理员',
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('13', '12', 'e10adc3949ba59abbe56e057f20f883e', '10002901669@qq.com', '1', '1463823238'), ('14', '123', 'e10adc3949ba59abbe56e057f20f883e', '1808146357@qq.com', '1', '1464266110'), ('15', 'wangting', 'e807f1fcf82d132f9bb018ca6738a19f', '1002901669@qq.com', '1', '1464529870'), ('16', 'wt', 'e10adc3949ba59abbe56e057f20f883e', '378456486@qq.com', '1', '1464703803'), ('17', '12332131', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1', '1464707860'), ('18', '123444', 'e10adc3949ba59abbe56e057f20f883e', '1920366085@qq.com', '1', '1464746835'), ('19', '蒋航', '96e79218965eb72c92a549dd5a330112', '571963318@qq.com', '1', '1465128497'), ('20', '蒋航', '96e79218965eb72c92a549dd5a330112', '111111@qq.com', '1', '1465586188'), ('21', '蒋航', '96e79218965eb72c92a549dd5a330112', '0000@qq.com', '1', '1465892570');
COMMIT;

-- ----------------------------
--  Table structure for `weekly`
-- ----------------------------
DROP TABLE IF EXISTS `weekly`;
CREATE TABLE `weekly` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_bin NOT NULL,
  `file` varchar(255) COLLATE utf8_bin NOT NULL,
  `time` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `project_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `week` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='周报';

-- ----------------------------
--  Records of `weekly`
-- ----------------------------
BEGIN;
INSERT INTO `weekly` VALUES ('1', '19', '121', 'weekly-1465911249024xf4vv.png', '1465911249', '96', '达尔文玩儿', '12');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
