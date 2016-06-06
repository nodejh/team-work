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

 Date: 06/07/2016 00:52:05 AM
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `account`
-- ----------------------------
BEGIN;
INSERT INTO `account` VALUES ('1', '571963318@qq.com', '8a737845c12bb846b35cd9bf72275304', '1464766568'), ('2', '571963318@qq.com', '041982a4c6b4197eebaa208481c8a10f', '1464766597'), ('3', '571963318@qq.com', 'c333f65d121d81b1f0fd73906aef5767', '1464766689'), ('4', '571963318@qq.com', '1465126981268a7A8KLIsK9', '1465126981'), ('5', '571963318@qq.com', '1465127002471QGjjo67rLI', '1465127002'), ('6', '571963318@qq.com', '32fb47f23a449ce1dff38f70e217a6aatBUAO9ufm2yHs41itnfJ', '1465127597'), ('7', '571963318@qq.com', 'dd1a2b45f68e2e995627ac8a310d173cxc8R3fj0gdqAJe6QQ9Wy', '1465216805'), ('8', '571963318@qq.com', 'de5cff268f0cd49bd7e130cbcc78738eQXhkky50Ao9JsN5134jw', '1465226567'), ('9', '571963318@qq.com', '4f64cd2ec59dfa3af388c440831f065bUBEmlwp9r5ttBTJamVj2', '1465228212'), ('10', '571963318@qq.com', '8f71695423119fd022d45cfe660e5da636hLhIsHA2qTGuoyj6iu', '1465230531'), ('11', '571963318@qq.com', '74724fbcb287822fca25fd4db2ed3b24XkNwwB99q1qjJjgUpoyU', '1465230859'), ('12', '571963318@qq.com', '24056e02fa0a12ba16eeed8874b6e2e283SdLWqRtk8VWqQM8uap', '1465231115'), ('13', '571963318@qq.com', 'b02b095f17272b49d6b6158812a92973ulghAoB5j2fr5leyNxcj', '1465231554');
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
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `project`
-- ----------------------------
BEGIN;
INSERT INTO `project` VALUES ('sdsdaaddasads', null, '13', null, '93', '1', '1464748493', 'b5d00867523641eee678e4cf7e623f46'), ('122211212112', null, '13', null, '94', '1', '1464749042', '08df4f79915db28f7bbdc7869a7d4c35'), ('ewqr', null, '19', null, '95', '1', '1465141345', 'ef6721338596cb278abd2fda1f057bdd'), ('达尔文玩儿', null, '19', null, '96', '1', '1465141479', 'e196032f757777cdff8db260ff23b54b');
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
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `project_member`
-- ----------------------------
BEGIN;
INSERT INTO `project_member` VALUES ('93', '13', '1', '83', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '1'), ('93', '14', '0', '84', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '0'), ('93', '16', '0', '85', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '0'), ('93', '18', '0', '86', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '0'), ('94', '13', '1', '87', '122211212112', '08df4f79915db28f7bbdc7869a7d4c35', '1'), ('94', '18', '0', '88', '122211212112', '08df4f79915db28f7bbdc7869a7d4c35', '0'), ('96', '19', '1', '89', '达尔文玩儿', 'e196032f757777cdff8db260ff23b54b', '1');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('13', '12', 'e10adc3949ba59abbe56e057f20f883e', '10002901669@qq.com', '1', '1463823238'), ('14', '123', 'e10adc3949ba59abbe56e057f20f883e', '1808146357@qq.com', '1', '1464266110'), ('15', 'wangting', 'e807f1fcf82d132f9bb018ca6738a19f', '1002901669@qq.com', '1', '1464529870'), ('16', 'wt', 'e10adc3949ba59abbe56e057f20f883e', '378456486@qq.com', '1', '1464703803'), ('17', '12332131', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1', '1464707860'), ('18', '123444', 'e10adc3949ba59abbe56e057f20f883e', '1920366085@qq.com', '1', '1464746835'), ('19', '蒋航', '7fa8282ad93047a4d6fe6111c93b308a', '571963318@qq.com', '1', '1465128497');
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
  `week` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='周报';

-- ----------------------------
--  Records of `weekly`
-- ----------------------------
BEGIN;
INSERT INTO `weekly` VALUES ('2', '19', 'ddddd', 'weekly-1465128585764lMWtk.docx', '1465128585', '12');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
