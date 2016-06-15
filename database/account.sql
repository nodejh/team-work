/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-14 21:39:27
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `account`
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `time` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of account
-- ----------------------------
INSERT INTO `account` VALUES ('15', '10002901669@qq.com', 'caadd9cc86467af769c87f5660c4a1e4QM2okVlrCGlEUjANDAvG', '1465831009');
INSERT INTO `account` VALUES ('16', '1920366085@qq.com', 'e8d8d6687506916bc34d478beda7f4abHtabxuX1sQMY9QKCKaK2', '1465887910');
INSERT INTO `account` VALUES ('17', '1920366085@qq.com', 'a74a581b67c8b430791573025999414bXlJD3qhC9ddX2Ag6fgkO', '1465888048');

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

-- ----------------------------
-- Table structure for `project`
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `name` varchar(10000) NOT NULL,
  `description` varchar(10000) DEFAULT NULL,
  `manager_id` int(11) NOT NULL,
  `member` varchar(0) DEFAULT NULL,
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `checkbox` int(11) NOT NULL DEFAULT '0',
  `time` int(11) NOT NULL,
  `ss` varchar(100) NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('test1', 'xm04', '19', null, '173', '1', '1465796267', 'b42a86db0221aa3e38893aa52675407b');
INSERT INTO `project` VALUES ('项目管理子系统', 'XM04', '19', null, '174', '1', '1465829982', 'e1b4b344592444e8563a2bc995965d83');
INSERT INTO `project` VALUES ('微信警务', 'XM01', '19', null, '175', '1', '1465830428', '0eb5f3b44e1c97a7d858ca345f7f4576');
INSERT INTO `project` VALUES ('teat', '22e', '19', null, '176', '1', '1465830746', '2cf0ac9bead114c14dca34aa1bdfa332');
INSERT INTO `project` VALUES ('123122', '121233', '19', null, '177', '1', '1465830898', '87707d48abc9211913774a9c272d15f9');
INSERT INTO `project` VALUES ('19830103321233232', '321232123dffdssf', '19', null, '178', '1', '1465887736', '7cc3c4b7998d862f73e0f757cf55dc37');
INSERT INTO `project` VALUES ('dsasdasdasda', 'dasssaddssda1', '19', null, '179', '1', '1465888097', '19a7cb911d36712e293c06b91130227f');
INSERT INTO `project` VALUES ('112w121212c', 'wedfs', '19', null, '180', '1', '1465888683', '53bf74419cdcc6a02de7e57b291892ec');
INSERT INTO `project` VALUES ('23op2o2332', 'dfssdfsdfsfd', '19', null, '181', '1', '1465892255', '79a8c721dc885712319fbddf70073a5e');

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
  `user_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=311 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of project_member
-- ----------------------------
INSERT INTO `project_member` VALUES ('173', '19', '1', '279', 'test1', 'b42a86db0221aa3e38893aa52675407b', '1', '王婷');
INSERT INTO `project_member` VALUES ('173', '20', '0', '280', 'test1', 'b42a86db0221aa3e38893aa52675407b', '0', 'test1');
INSERT INTO `project_member` VALUES ('173', '22', '0', '281', 'test1', 'b42a86db0221aa3e38893aa52675407b', '0', 'test3');
INSERT INTO `project_member` VALUES ('173', '21', '0', '282', 'test1', 'b42a86db0221aa3e38893aa52675407b', '0', 'test2');
INSERT INTO `project_member` VALUES ('174', '19', '1', '283', '项目管理子系统', 'e1b4b344592444e8563a2bc995965d83', '1', '王婷');
INSERT INTO `project_member` VALUES ('174', '22', '0', '284', '项目管理子系统', 'e1b4b344592444e8563a2bc995965d83', '0', 'test3');
INSERT INTO `project_member` VALUES ('175', '19', '1', '285', '微信警务', '0eb5f3b44e1c97a7d858ca345f7f4576', '1', '王婷');
INSERT INTO `project_member` VALUES ('175', '20', '0', '286', '微信警务', '0eb5f3b44e1c97a7d858ca345f7f4576', '0', 'test1');
INSERT INTO `project_member` VALUES ('176', '19', '1', '287', 'teat', '2cf0ac9bead114c14dca34aa1bdfa332', '1', '王婷');
INSERT INTO `project_member` VALUES ('176', '22', '0', '288', 'teat', '2cf0ac9bead114c14dca34aa1bdfa332', '0', 'test3');
INSERT INTO `project_member` VALUES ('176', '20', '0', '289', 'teat', '2cf0ac9bead114c14dca34aa1bdfa332', '0', 'test1');
INSERT INTO `project_member` VALUES ('176', '21', '0', '290', 'teat', '2cf0ac9bead114c14dca34aa1bdfa332', '0', 'test2');
INSERT INTO `project_member` VALUES ('177', '19', '1', '291', '123122', '87707d48abc9211913774a9c272d15f9', '1', '王婷');
INSERT INTO `project_member` VALUES ('177', '20', '0', '292', '123122', '87707d48abc9211913774a9c272d15f9', '0', 'test1');
INSERT INTO `project_member` VALUES ('177', '21', '0', '293', '123122', '87707d48abc9211913774a9c272d15f9', '0', 'test2');
INSERT INTO `project_member` VALUES ('177', '22', '0', '294', '123122', '87707d48abc9211913774a9c272d15f9', '0', 'test3');
INSERT INTO `project_member` VALUES ('178', '19', '1', '295', '19830103321233232', '7cc3c4b7998d862f73e0f757cf55dc37', '1', '王婷');
INSERT INTO `project_member` VALUES ('178', '20', '0', '296', '19830103321233232', '7cc3c4b7998d862f73e0f757cf55dc37', '0', 'test1');
INSERT INTO `project_member` VALUES ('178', '22', '0', '297', '19830103321233232', '7cc3c4b7998d862f73e0f757cf55dc37', '0', 'test3');
INSERT INTO `project_member` VALUES ('178', '21', '0', '298', '19830103321233232', '7cc3c4b7998d862f73e0f757cf55dc37', '0', 'test2');
INSERT INTO `project_member` VALUES ('179', '19', '1', '299', 'dsasdasdasda', '19a7cb911d36712e293c06b91130227f', '1', '王婷');
INSERT INTO `project_member` VALUES ('179', '20', '0', '300', 'dsasdasdasda', '19a7cb911d36712e293c06b91130227f', '0', 'test1');
INSERT INTO `project_member` VALUES ('179', '22', '0', '301', 'dsasdasdasda', '19a7cb911d36712e293c06b91130227f', '1', 'test3');
INSERT INTO `project_member` VALUES ('179', '21', '0', '302', 'dsasdasdasda', '19a7cb911d36712e293c06b91130227f', '0', 'test2');
INSERT INTO `project_member` VALUES ('180', '19', '1', '303', '112w121212c', '53bf74419cdcc6a02de7e57b291892ec', '1', '王婷');
INSERT INTO `project_member` VALUES ('180', '20', '0', '304', '112w121212c', '53bf74419cdcc6a02de7e57b291892ec', '0', 'test1');
INSERT INTO `project_member` VALUES ('180', '22', '0', '305', '112w121212c', '53bf74419cdcc6a02de7e57b291892ec', '1', 'test3');
INSERT INTO `project_member` VALUES ('180', '21', '0', '306', '112w121212c', '53bf74419cdcc6a02de7e57b291892ec', '0', 'test2');
INSERT INTO `project_member` VALUES ('181', '19', '1', '307', '23op2o2332', '79a8c721dc885712319fbddf70073a5e', '1', '王婷');
INSERT INTO `project_member` VALUES ('181', '20', '0', '308', '23op2o2332', '79a8c721dc885712319fbddf70073a5e', '0', 'test1');
INSERT INTO `project_member` VALUES ('181', '22', '0', '309', '23op2o2332', '79a8c721dc885712319fbddf70073a5e', '0', 'test3');
INSERT INTO `project_member` VALUES ('181', '21', '0', '310', '23op2o2332', '79a8c721dc885712319fbddf70073a5e', '0', 'test2');

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
  `project_id` int(11) NOT NULL,
  `project_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `week` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='周报';

-- ----------------------------
-- Records of weekly
-- ----------------------------
