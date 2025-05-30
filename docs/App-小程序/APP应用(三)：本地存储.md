---
title: 本地存储
---

# APP测试应用：本地存储

### 本地存储

- 本地存储做了两套，一套是H5+的IO模块管理本地文件系统，另一套是SQLite存储

### 本地文件系统

- H5+的 [IO模块管理本地文件系统](https://www.html5plus.org/doc/zh_cn/io.html) 与 [原生小程序中的文件系统](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/file-system.html) 类似，使用方式也相似

<img src="/小程序/App本地存储.png" width="600" height="600">

### 本地存储封装

```js
/**
 * author: wangkaibing
 * time: 2024-12-10 21:09:27
 * 
 * 写入本地文件
 * @param {string} fileName - 文件名，不包括扩展名
 * @param {array} jsonData - 要写入的数据
 */
function writeFile(filename, jsonData) {
	return new Promise((resolve, reject) => {
		// 将 JavaScript 对象转换为JSON字符串
		const jsonString = JSON.stringify(jsonData);
		// 获取文件系统对象
		plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => {
			// 获取文件对象，如果文件不存在则创建它
			fs.root.getFile(filename, { create: true, exclusive: false }, fileEntry => {
				// 获取文件写入器
				fileEntry.createWriter(fileWriter => {
					// 写入数据到文件
					fileWriter.write(jsonString);
					// 写入完成后的回调
					fileWriter.onwriteend = () => {
						// 获取文件的完整路径并返回
						const filePath = fileEntry.fullPath;
						resolve({ status: true, message: filePath });
					};
					// 错误回调
					fileWriter.onerror = error => {
						reject({ status: false, message: error});
					};
				}, error => {
					reject({ status: false, message: `创建文件写入器失败: ${error}`});
				});
			}, error => {
				reject({ status: false, message: `获取文件对象失败: ${error}`});
			});
		}, error => {
			reject({ status: false, message: `请求文件系统失败: ${error}`});
		});
	});
}


/**
 * 读取本地文件
 * @param {string} fileName - 文件名，不包括扩展名
 */
function readFile(filename) {
	return new Promise((resolve, reject) => {
		// 获取文件系统对象
		plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => {
			// 获取文件对象
			fs.root.getFile(filename, { create: false}, fileEntry => {
				// 获取文件读取器
				fileEntry.file(file => {
					let fileReader = new plus.io.FileReader();
					//以文本格式读取文件数据内容
					fileReader.readAsText(file, 'utf-8');
					//文件读取操作完成时的回调函数
					fileReader.onloadend = (evt) => {
						resolve(JSON.parse(evt.target.result || []))
					};
				}, error => {
					console.log('🚀 ~ [获取文件失败]', error)
					reject('获取文件失败');
				});
			}, error => {
				console.log('🚀 ~ [文件不存在]', error)
				resolve([])
			});
		}, error => {
			console.log('🚀 ~ [请求文件系统失败]', error)
			reject('请求文件系统失败');
		});
	});
}

/**
 * 删除本地文件
 * @param {string} fileName - 文件名，不包括扩展名
 */
function deleteFile(filename) {
	return new Promise((resolve, reject) => {
		// 获取文件系统对象
		plus.io.requestFileSystem(plus.io.PRIVATE_DOC, fs => {
			// 获取文件对象
			fs.root.getFile(filename, { create: false }, fileEntry => {
				// 删除文件
				fileEntry.remove(() => {
					resolve('文件删除成功');
				}, error => {
					reject('文件删除失败: ' + error.message);
				});
			}, error => {
				reject('文件不存在: ' + error.message);
			});
		}, error => {
			console.log('🚀 ~ [请求文件系统失败]', error)
			reject('请求文件系统失败');
		});
	});
}

export {
	writeFile,
	readFile,
	deleteFile
}
```

### 使用方式

```js
<script setup>
  import { writeFile, readFile } from '@/utils/fileSystem'

  // 写入
  writeFile('localForm', localList).then(res => {
    if(res.status) {
        message.alert({
            title: '保存成功',
            msg: `文件保存至: ${res.message}`
        }).then(() => {
            uni.navigateBack();
        })
    }
    }).catch(err => {
        title: '保存失败',
        message.alert({
            msg: err.msg
        })
    })

    // 读取
    const result = await readFile('localForm')

    // 删除
    function deleteLocal() {
		message.confirm({
			title: '提示',
			msg: '确认删除本地文件(localForm)吗?'
		})
		.then(() => {
			deleteFile('localForm').then(res => {
				message.alert({
					title: '提示',
					msg: res
				})
				.then(() => {
					readLocal()
				})
			})
			.catch(err => {
				message.alert({
					title: '提示',
					msg: err
				})
			});
		})
	}
```

### SQLite数据库

- [SQLite本地关系型数据库](https://www.sqlite.org/) 相较于文件管理系统有一点学习成本，需要学习 [SQLite语句](https://www.runoob.com/sqlite/sqlite-tutorial.html)，（业务如果复杂，也许还要思考表结构的设计）

<img src="/小程序/App模块配置数据库.png" width="600" height="600">

### SQLite写入读取封装

<img src="/小程序/sqLite存储轨迹.png" width="600" height="600">

```js
export const openSQL = (name) => {
	//如果数据库存在则打开，不存在则创建。
	return new Promise((resolve, reject) => {
		plus.sqlite.openDatabase({
			name: name, //数据库名称
			path: `_doc/${name}.db`, //数据库地址
			success(e) {
				resolve(e);
			},
			fail(e) {
				uni.showModal({
					title: '数据库创建失败',
					content: `${e.message}`,
				})
				reject(e);
			}
		})
	})
}

//监听数据库是否开启
export const isOpen = (name) => {
	let open = plus.sqlite.isOpenDatabase({
		name: name,
		path: `_doc/${name}.db`,
	})
	return open;
}

//关闭数据库
export const closeSQL = (name) => {
	return new Promise((resolve, reject) => {
		plus.sqlite.closeDatabase({
			name: name,
			success(e) {
				resolve(e);
			},
			fail(e) {
				uni.showModal({
					title: '数据库关闭失败',
					content: `${e.message}`,
				})
				reject(e);
			}
		})
	})
}

// 创建表
export const addTab = (name,tabName) => {
	// tabName不能用数字作为表格名的开头
	return new Promise((resolve, reject) => {
		plus.sqlite.executeSql({
			name: name,
			sql: `create table if not exists ${tabName}("id" INTEGER PRIMARY KEY AUTOINCREMENT,"location" TEXT,"saveTime" TEXT)`,
			success(e) {
				resolve(e);
			},
			fail(e) {
				uni.showModal({
					title: '表创建失败',
					content: `${e.message}`,
				})
				reject(e);
			}
		})
	})
}

// 添加数据
export const addTabItem = (name,tabName,obj) => {
	if (obj) {
		let keys = Object.keys(obj)
		let keyStr = keys.toString()
		let valStr = ''
		keys.forEach((item, index) => {
			if (Array.isArray(obj[item])) {
					obj[item] = JSON.stringify(obj[item]);
			}
			if (keys.length - 1 === index) {
				valStr += ('"' + obj[item] + '"')
			} else {
				valStr += ('"' + obj[item] + '",')
			}
		})
		let sqlStr = `insert into ${tabName}(${keyStr}) values(${valStr})`
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: name,
				sql: sqlStr,
				success(e) {
					resolve(e);
				},
				fail(e) {
					uni.showModal({
						title: '数据添加失败',
						content: `${e.message}`,
					})
					console.log('🚀 ~ [数据添加失败]', e)
					reject(e);
				}
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			reject("错误")
		})
	}
}

//查询数据库数据
export const getDataList = (name,tabName,id = '',sort='asc') => {
	if (tabName !== undefined) {
		return new Promise((resolve, reject) => {
			let sql = '';
			if (id !== '') {
					sql = `select * from ${tabName} where id = ${id}`;
			} else {
					sql = `select * from ${tabName} ORDER BY id ${sort}`;
			}
			plus.sqlite.selectSql({
				name: name,
				sql: sql,
				success(e) {
					resolve(e);
				},
				fail(e) {
					uni.showModal({
						title: '数据读取失败',
						content: `${e.message}`,
					})
					reject(e);
				}
			})
		})
	} else {
		return new Promise((resolve, reject) => {
			reject("错误")
		});
	}
}

//清空表数据
export const deleteTable = (name,tabName) => {
	return new Promise((resolve, reject) => {
		plus.sqlite.executeSql({
			name: name,
			sql: `delete from ${tabName}`,
			success(e) {
				resolve(e);
			},
			fail(e) {
				uni.showModal({
					title: '表删除失败',
					content: `${e.message}`,
				})
				reject(e);
			}
		})
	})
}
```

### 使用方式

```js
<script setup>
    import { openSQL, closeSQL, isOpen, addTab, addTabItem, getDataList, deleteTable } from '@/utils/sqlite.js'

    // 开启
	function openDb() {
		if (isOpen(SQLName.value)) return
		openSQL(SQLName.value).then(res => {
			addDbTable()
            console.log('🚀 ~ [已开启数据库]')
		})
	}

    // 关闭
	function closeDb() {
		closeSQL(SQLName.value).then(res => {
            console.log('🚀 ~ [已关闭数据库]')
		})
	}

    // 创建表
	function addDbTable() {
		addTab(SQLName.value, TabName.value).then(res => {
            console.log('🚀 ~ [表创建成功]')
		})
	}

    // 读取表数据
	function getDbTable() {
		getDataList(SQLName.value, TabName.value,'', 'desc').then(res => {
			res.forEach(item => {
				if (item.location) {
					item.location = JSON.parse(item.location);
				}
			});
			listData.value = res
		})
	}

	// 清空表数据
	function deleteDbTable() {
		deleteTable(SQLName.value, TabName.value).then(res => {
			listData.value = []
		})
	}
```

### Navicat Premium

- 通过https://drive.weixin.qq.com/s?k=AOQAlgfWAAkNpl7wtyAMkAOgZFAII 等数据库工具，可查看表中的数据

<img src="/小程序/查看数据库表.png" width="600" height="600">
