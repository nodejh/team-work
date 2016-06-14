-- phpMyAdmin SQL Dump
-- version 4.4.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2016-06-13 13:01:09
-- 服务器版本： 5.7.7-rc
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `team`
--

-- --------------------------------------------------------

--
-- 表的结构 `account`
--

CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `account`
--

INSERT INTO `account` (`id`, `email`, `token`, `time`) VALUES
(1, '571963318@qq.com', '8a737845c12bb846b35cd9bf72275304', 1464766568),
(2, '571963318@qq.com', '041982a4c6b4197eebaa208481c8a10f', 1464766597),
(3, '571963318@qq.com', 'c333f65d121d81b1f0fd73906aef5767', 1464766689),
(4, '571963318@qq.com', '1465126981268a7A8KLIsK9', 1465126981),
(5, '571963318@qq.com', '1465127002471QGjjo67rLI', 1465127002),
(6, '571963318@qq.com', '32fb47f23a449ce1dff38f70e217a6aatBUAO9ufm2yHs41itnfJ', 1465127597),
(7, '571963318@qq.com', 'dd1a2b45f68e2e995627ac8a310d173cxc8R3fj0gdqAJe6QQ9Wy', 1465216805),
(8, '571963318@qq.com', 'de5cff268f0cd49bd7e130cbcc78738eQXhkky50Ao9JsN5134jw', 1465226567),
(9, '571963318@qq.com', '4f64cd2ec59dfa3af388c440831f065bUBEmlwp9r5ttBTJamVj2', 1465228212),
(10, '571963318@qq.com', '8f71695423119fd022d45cfe660e5da636hLhIsHA2qTGuoyj6iu', 1465230531),
(11, '571963318@qq.com', '74724fbcb287822fca25fd4db2ed3b24XkNwwB99q1qjJjgUpoyU', 1465230859),
(12, '571963318@qq.com', '24056e02fa0a12ba16eeed8874b6e2e283SdLWqRtk8VWqQM8uap', 1465231115),
(13, '571963318@qq.com', 'b02b095f17272b49d6b6158812a92973ulghAoB5j2fr5leyNxcj', 1465231554),
(14, '571963318@qq.com', 'ffca25be0dac3067ad95645bfb0d57e2EOSCvHGOHT5h7rB06aJT', 1465375087),
(15, '571963318@qq.com', 'cf678b980ad49e9646c85f39fcb131b0E55tANST4vNDTckBlh97', 1465375148),
(16, '571963318@qq.com', '079704943c1d831ea56e83a1e8274428mcOwsmgaazlVOkjeHrtz', 1465375246),
(17, '571963318@qq.com', '9a9f0dfd6511052fdcb8238ed27115d7LPGp45hwWJjSb4MkPTyf', 1465375881),
(18, '571963318@qq.com', 'd38b7be43ef490a19dc1d64f77f1a937QbbjVOLlq7qvaTCWse5u', 1465379006),
(19, '571963318@qq.com', '0655f27ca319dcd47b5c51dab4baf5cf24Nb20Vp6lw5jTbCGuDe', 1465379094),
(20, '571963318@qq.com', 'dcb46d10babc2100ace1c2ab8a0a0337BALo8SXwYMeu0yOCp66l', 1465379103),
(21, '571963318@qq.com', '36df29cc7bde60559bf5cb0df1a1606dKoQTrVMgGwXQAI8JOeWn', 1465379126);

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `topic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `time` varchar(200) NOT NULL,
  `content` varchar(10000) NOT NULL,
  `id` int(11) NOT NULL,
  `user_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `file`
--

CREATE TABLE IF NOT EXISTS `file` (
  `id` int(11) NOT NULL,
  `folder_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `path` varchar(255) COLLATE utf8_bin NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='文件表';

-- --------------------------------------------------------

--
-- 表的结构 `folder`
--

CREATE TABLE IF NOT EXISTS `folder` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='文件夹名称';

--
-- 转存表中的数据 `folder`
--

INSERT INTO `folder` (`id`, `user_id`, `name`, `time`) VALUES
(1, 19, '我的文件夹', 1465806727),
(2, 19, '小木', 1465806796),
(7, 20, '设计图', 1465812687),
(8, 20, '参考资料', 1465812858),
(9, 20, '需求文档', 1465813319);

-- --------------------------------------------------------

--
-- 表的结构 `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `name` varchar(20) NOT NULL,
  `description` text,
  `manager_id` int(11) DEFAULT NULL,
  `member` varchar(0) DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  `checkbox` int(11) DEFAULT '0',
  `time` int(11) DEFAULT NULL,
  `ss` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `project`
--

INSERT INTO `project` (`name`, `description`, `manager_id`, `member`, `project_id`, `checkbox`, `time`, `ss`) VALUES
('sdsdaaddasads', NULL, 13, NULL, 93, 1, 1464748493, 'b5d00867523641eee678e4cf7e623f46'),
('122211212112', NULL, 13, NULL, 94, 1, 1464749042, '08df4f79915db28f7bbdc7869a7d4c35'),
('ewqr', NULL, 19, NULL, 95, 1, 1465141345, 'ef6721338596cb278abd2fda1f057bdd'),
('达尔文玩儿', NULL, 19, NULL, 96, 1, 1465141479, 'e196032f757777cdff8db260ff23b54b'),
('eee', NULL, 19, NULL, 97, 1, 1465379371, '7f4920fb41fc24e43955e456b6038bf0'),
('test', NULL, 19, NULL, 98, 1, 1465379414, '45357a5c731751a44000d1ba2c0e25fb'),
('test', NULL, 20, NULL, 99, 1, 1465589092, 'b428cbb02358afc32cf32f9bdb725a51'),
('234234', NULL, 19, NULL, 100, 1, 1465660573, '9ea46a76bd031a9b19bca260ca6b6e01');

-- --------------------------------------------------------

--
-- 表的结构 `project_member`
--

CREATE TABLE IF NOT EXISTS `project_member` (
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `member_type` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `ss` varchar(100) NOT NULL,
  `accept` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `project_member`
--

INSERT INTO `project_member` (`project_id`, `user_id`, `member_type`, `id`, `project_name`, `ss`, `accept`) VALUES
(93, 13, 1, 83, 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', 1),
(93, 14, 0, 84, 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', 0),
(93, 16, 0, 85, 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', 0),
(93, 18, 0, 86, 'sdsdaaddasads', 'b5d00867523641eee678e4cf7e623f46', 0),
(94, 13, 1, 87, '122211212112', '08df4f79915db28f7bbdc7869a7d4c35', 1),
(94, 18, 0, 88, '122211212112', '08df4f79915db28f7bbdc7869a7d4c35', 0),
(96, 19, 1, 89, '达尔文玩儿', 'e196032f757777cdff8db260ff23b54b', 1),
(97, 19, 1, 90, 'eee', '7f4920fb41fc24e43955e456b6038bf0', 1),
(98, 19, 1, 91, 'test', '45357a5c731751a44000d1ba2c0e25fb', 1),
(98, 19, 0, 92, 'test', '45357a5c731751a44000d1ba2c0e25fb', 0),
(98, 19, 0, 93, 'test', '45357a5c731751a44000d1ba2c0e25fb', 0),
(98, 19, 0, 94, 'test', '45357a5c731751a44000d1ba2c0e25fb', 0),
(99, 20, 1, 95, 'test', 'b428cbb02358afc32cf32f9bdb725a51', 1),
(100, 19, 1, 96, '234234', '9ea46a76bd031a9b19bca260ca6b6e01', 1),
(100, 19, 0, 97, '234234', '9ea46a76bd031a9b19bca260ca6b6e01', 0),
(100, 19, 0, 98, '234234', '9ea46a76bd031a9b19bca260ca6b6e01', 0),
(100, 19, 0, 99, '234234', '9ea46a76bd031a9b19bca260ca6b6e01', 0);

-- --------------------------------------------------------

--
-- 表的结构 `topics`
--

CREATE TABLE IF NOT EXISTS `topics` (
  `title` varchar(200) NOT NULL,
  `content` varchar(10000) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `time` varchar(200) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `topics`
--

INSERT INTO `topics` (`title`, `content`, `project_id`, `user_id`, `id`, `time`) VALUES
('eee', '<p>ee</p>', 96, 19, 1, '1465375644');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL COMMENT '邮箱',
  `type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '用户类型,0为禁用，1为普通用户，2为管理员',
  `time` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `email`, `type`, `time`) VALUES
(13, '12', 'e10adc3949ba59abbe56e057f20f883e', '10002901669@qq.com', 1, 1463823238),
(14, '123', 'e10adc3949ba59abbe56e057f20f883e', '1808146357@qq.com', 1, 1464266110),
(15, 'wangting', 'e807f1fcf82d132f9bb018ca6738a19f', '1002901669@qq.com', 1, 1464529870),
(16, 'wt', 'e10adc3949ba59abbe56e057f20f883e', '378456486@qq.com', 1, 1464703803),
(17, '12332131', 'e10adc3949ba59abbe56e057f20f883e', '123@qq.com', 1, 1464707860),
(18, '123444', 'e10adc3949ba59abbe56e057f20f883e', '1920366085@qq.com', 1, 1464746835),
(19, '蒋航', '96e79218965eb72c92a549dd5a330112', '571963318@qq.com', 1, 1465128497),
(20, '蒋航', '96e79218965eb72c92a549dd5a330112', '111111@qq.com', 1, 1465586188);

-- --------------------------------------------------------

--
-- 表的结构 `weekly`
--

CREATE TABLE IF NOT EXISTS `weekly` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_bin NOT NULL,
  `file` varchar(255) COLLATE utf8_bin NOT NULL,
  `time` int(11) NOT NULL,
  `week` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='周报';

--
-- 转存表中的数据 `weekly`
--

INSERT INTO `weekly` (`id`, `user_id`, `title`, `file`, `time`, `week`) VALUES
(2, 19, 'ddddd', 'weekly-1465128585764lMWtk.docx', 1465128585, 12),
(3, 19, '项目管理子系统第14周周报', 'weekly-1465375946965dp4qm.docx', 1465375946, 14);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `folder`
--
ALTER TABLE `folder`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `project_member`
--
ALTER TABLE `project_member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`,`email`);

--
-- Indexes for table `weekly`
--
ALTER TABLE `weekly`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `folder`
--
ALTER TABLE `folder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `project_member`
--
ALTER TABLE `project_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=100;
--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `weekly`
--
ALTER TABLE `weekly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
