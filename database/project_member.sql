/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-05 17:29:17
*/

SET FOREIGN_KEY_CHECKS=0;
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
