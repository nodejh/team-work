/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-05 17:28:54
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `comment`
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
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for `project`
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
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('sdsdaaddasads', null, '13', null, '93', '1', '1464748493', 'b5d00867523641eee678e4cf7e623f46');
INSERT INTO `project` VALUES ('122211212112', null, '13', null, '94', '1', '1464749042', '08df4f79915db28f7bbdc7869a7d4c35');

-- ----------------------------
-- Table structure for `project_member`
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
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project_member
-- ----------------------------
INSERT INTO `project_member` VALUES ('93', '13', '1', '83', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '1');
INSERT INTO `project_member` VALUES ('93', '14', '0', '84', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '0');
INSERT INTO `project_member` VALUES ('93', '16', '0', '85', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '0');
INSERT INTO `project_member` VALUES ('93', '18', '0', '86', 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', '0');
INSERT INTO `project_member` VALUES ('94', '13', '1', '87', '122211212112', '08df4f79915db28f7bbdc7869a7d4c35', '1');
INSERT INTO `project_member` VALUES ('94', '18', '0', '88', '122211212112', '08df4f79915db28f7bbdc7869a7d4c35', '0');

-- ----------------------------
-- Table structure for `topics`
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
-- Records of topics
-- ----------------------------

-- ----------------------------
-- Table structure for `user`
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('13', '12', 'e10adc3949ba59abbe56e057f20f883e', '10002901669@qq.com', '1', '1463823238');
INSERT INTO `user` VALUES ('14', '123', 'e10adc3949ba59abbe56e057f20f883e', '1808146357@qq.com', '1', '1464266110');
INSERT INTO `user` VALUES ('15', 'wangting', 'e807f1fcf82d132f9bb018ca6738a19f', '1002901669@qq.com', '1', '1464529870');
INSERT INTO `user` VALUES ('16', 'wt', 'e10adc3949ba59abbe56e057f20f883e', '378456486@qq.com', '1', '1464703803');
INSERT INTO `user` VALUES ('17', '12332131', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1', '1464707860');
INSERT INTO `user` VALUES ('18', '123444', 'e10adc3949ba59abbe56e057f20f883e', '1920366085@qq.com', '1', '1464746835');

-- ----------------------------
-- Table structure for `weekly`
-- ----------------------------
DROP TABLE IF EXISTS `weekly`;
CREATE TABLE `weekly` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_bin NOT NULL,
  `file` varchar(255) COLLATE utf8_bin NOT NULL,
  `time` int(11) NOT NULL,
  `poject_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='周报';

-- ----------------------------
-- Records of weekly
-- ----------------------------
