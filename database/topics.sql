/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-14 21:40:07
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
  `user_name` varchar(200) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of topics
-- ----------------------------
INSERT INTO `topics` VALUES ('1231212', '<p>1232112<br></p>', '173', '王婷', '19', '26', '1465796720');
INSERT INTO `topics` VALUES ('mdzz', '', '173', '王婷', '19', '27', '1465815567');
INSERT INTO `topics` VALUES ('mdzz', '<blockquote><p><br></p><p>skjsfdsldfsdffsdfdsfdfssfdsfdsfdsdffdssdfdfsdfsdsffdsdsfdsfdsfd</p><p><br></p></blockquote>', '173', '王婷', '19', '28', '1465906743');
