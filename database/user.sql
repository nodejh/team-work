/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-05 17:29:06
*/

SET FOREIGN_KEY_CHECKS=0;
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
