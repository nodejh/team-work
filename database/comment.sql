/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-14 21:39:38
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('26', '19', '1465904553', '<p>sfdkfsdlkfsdljdfkjs mdsfd<br></p>', '9', '王婷');
INSERT INTO `comment` VALUES ('26', '19', '1465904566', '<p>ajds;adsldla;ksdkaslda;sdas<br></p>', '10', '王婷');
INSERT INTO `comment` VALUES ('26', '19', '1465904971', '<p>jfkkjfdsfdsjksdflksfdjkl<br></p>', '11', '王婷');
INSERT INTO `comment` VALUES ('28', '19', '1465906754', '<p>weeewer<br></p>', '12', '王婷');
