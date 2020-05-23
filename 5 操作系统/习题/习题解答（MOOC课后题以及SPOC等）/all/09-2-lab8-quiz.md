#lec22 lab8 文件系统　在线练习
## 选择题

---

ucore实现的文件系统抽象包括（） s1 总体介绍

- [x] 文件
- [x] 目录项
- [x] 索引节点
- [ ] 安装点

> 都是


ucore实现的simple FS（简称SFS）采用的文件分配机制是（） s2 ucore 文件系统架构
- [ ] 连续分配
- [ ] 链式分配
- [x] 索引分配
- [ ] 位图分配

> 索引分配


关于ucore实现的SFS阐述正确的是（） s3 Simple File System分析
- [x] SFS的超级块保存在硬盘上，在加载simple FS时会读入内存中
- [x] SFS的free map结构保存在硬盘上，表示硬盘可用的数据块（扇区）
- [x] SFS的root-dir inode结构保存在硬盘上，表示SFS的根目录的元数据信息
- [ ] 硬盘上的SFS ，除保存上述三种结构外，剩下的都用于保存文件的数据内容

> 除了前三种结构，剩下的用于保存文件的inode, dir/file的data


关于ucore实现的Virtual FS（简称VFS）阐述正确的是() s4 Virtual File System分析
- [x] 已支持磁盘文件系统
- [x] 已支持设备文件系统
- [ ] 已支持网络文件系统
- [ ] 已支持系统状态文件系统

> 后两种可实现，但现在还没实现


关于ucore文件系统支持的I/O 设备包括()  s5 I/O 设备接口分析
- [x] 串口设备
- [x] 并口设备
- [x] CGA设备
- [x] 键盘设备

> 都支持



