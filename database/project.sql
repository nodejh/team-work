/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-05 17:29:23
*/

SET FOREIGN_KEY_CHECKS=0;
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
