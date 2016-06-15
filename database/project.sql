/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-14 21:39:46
*/

SET FOREIGN_KEY_CHECKS=0;
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
