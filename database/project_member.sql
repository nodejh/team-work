/*
Navicat MySQL Data Transfer

Source Server         : wt
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : nucleus

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2016-06-14 21:39:52
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
