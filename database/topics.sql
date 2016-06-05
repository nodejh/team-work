/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-05 17:29:12
*/

SET FOREIGN_KEY_CHECKS=0;
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
