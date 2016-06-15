/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-14 21:40:12
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('19', '王婷', 'e10adc3949ba59abbe56e057f20f883e', '10002901669@qq.com', '1', '1465743548');
INSERT INTO `user` VALUES ('20', 'test1', 'e10adc3949ba59abbe56e057f20f883e', '1920366085@qq.com', '1', '1465743722');
INSERT INTO `user` VALUES ('21', 'test2', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', '1', '1465743740');
INSERT INTO `user` VALUES ('22', 'test3', 'e10adc3949ba59abbe56e057f20f883e', '1808146357@qq.com', '1', '1465743767');
INSERT INTO `user` VALUES ('23', 'test3', 'e10adc3949ba59abbe56e057f20f883e', '571963318@qq.coom', '1', '1465829957');
