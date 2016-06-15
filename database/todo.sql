/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-14 21:40:02
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `todo`
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo` (
  `project_id` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `finish_time` date NOT NULL,
  `member_id` int(11) NOT NULL,
  `start_time` int(11) NOT NULL,
  `finished` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  PRIMARY KEY (`todo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of todo
-- ----------------------------
INSERT INTO `todo` VALUES ('170', '6', '我是', '22', '2016-06-29', '22', '1465743939', '1', 'test3');
INSERT INTO `todo` VALUES ('173', '7', 'mdzz', '19', '2016-06-29', '19', '1465817999', '1', '王婷');
INSERT INTO `todo` VALUES ('173', '8', '恶恶热人', '19', '2016-06-28', '19', '1465907105', '0', '王婷');
