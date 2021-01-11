# react-native-mind-plugin

这是一个 ReactNative 思维导图插件，支持 iOS 14.3 和 Android 11 (其他版本待测试)。

![](https://raw.githubusercontent.com/zouzonghua/ImageHosting/main/img/20210111172339.png)

## 声明

- 代码来自于 [`react-native-mind`
  ](https://github.com/zjfjiayou/react-native-mind) ，本人只是做了一些微小的修改使其支持运行在 ReactNative 0.63.3 版本， 对 [`zjfjiayou`](https://github.com/zjfjiayou) 在此表示感谢！
- 项目基础文件使用 [`create-react-native-module`](https://github.com/brodybits/create-react-native-module) 脚手架进行搭建，对 [`brodybits`](https://github.com/brodybits) 在此表示感谢！
- 同时欢迎感兴趣同学贡献代码，互相交流，互相帮助，互相进步！

## 安装

`$ npm install react-native-mind-plugin`

或者

`$ yarn add react-native-mind-plugin`

## 链接

`$ react-native link react-native-mind-plugin`

## pod 安装

`$ cd ios && pod install`

## 使用说明

### 初始化

```javascript
import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
const { Minder } = require('react-native-mind-plugin');
const TOTAL_WIDTH = Dimensions.get('window').width;
const TOTAL_HEIGHT = Dimensions.get('window').height;

const Example = () => {
  const [minderData, setMinderData] = useState({
    data: {
      node_id: '522bbeef44ec',
      title: '如何阅读一本书',
      content_type: 'content.builtin.title',
      content: '',
    },
    children: [
      {
        data: {
          node_id: '3F79F4D44553D7B3EF12DB0DEF92DB7F',
          title: '第一部分',
          content_type: 'content.builtin.title',
          content: '',
        },
        parentId: '522bbeef44ec',
        children: [
          {
            data: {
              node_id: 'E225DEEACBBE16687493058DEFE2A17C',
              title: '基础阅读',
              content_type: 'content.builtin.title',
              content: '',
            },
            parentId: '3F79F4D44553D7B3EF12DB0DEF92DB7F',
          },
          {
            data: {
              node_id: 'B049F433F696EEE7294CB801BCC994DC',
              title: '初级阅读 基本阅读 初步阅读',
              content_type: 'content.builtin.title',
              content: '',
            },
            parentId: '3F79F4D44553D7B3EF12DB0DEF92DB7F',
          },
        ],
      },
      {
        data: {
          node_id: 'B8C091C3E756A1E39D66479B4DE0B162',
          title: '第二部分',
          content_type: 'content.builtin.title',
          content: '',
        },
        parentId: '522bbeef44ec',
        children: [
          {
            data: {
              node_id: '61BCD18E9B22103AECAEA8BA9FA0EE08',
              title: '检视阅读',
              content_type: 'content.builtin.title',
              content: '',
            },
            parentId: 'B8C091C3E756A1E39D66479B4DE0B162',
          },
        ],
      },
      {
        data: {
          node_id: 'BCA8E0C3FFE324EEDF526CA184C1FBE8',
          title: '第三部分',
          content_type: 'content.builtin.title',
          content: '',
        },
        parentId: '522bbeef44ec',
        children: [
          {
            data: {
              node_id: '2913E2113016BE6C56642694B68400DA',
              title: '分析阅读',
              content_type: 'content.builtin.title',
              content: '',
            },
            parentId: 'BCA8E0C3FFE324EEDF526CA184C1FBE8',
          },
        ],
      },
      {
        data: {
          node_id: 'B73F84E09A17D29F653B66B632ED8A66',
          title: '第四部分',
          content_type: 'content.builtin.title',
          content: '',
        },
        parentId: '522bbeef44ec',
        children: [
          {
            data: {
              node_id: '017B909351CC932791264520576151D3',
              title: '阶段目标',
              content_type: 'content.builtin.title',
              content: '',
            },
            parentId: 'B73F84E09A17D29F653B66B632ED8A66',
          },
        ],
      },
    ],
    parentId: null,
  });

  return (
    <View style={styles.container}>
      <Minder
        data={minderData}
        onSelect={(e) => console.log('onSelect Event', e)}
        onExpand={(e) => console.log('onExpand Event', e)}
        onMove={() => console.log('onMove Event')}
        height={TOTALHEIGHT - 40}
        width={TOTALWIDTH}
      ></Minder>
    </View>
  );
};
```

### 命令

```javascript
// 重新渲染
command.exec('render', rootId);

// 获取节点
command.exec('getNode', nodeId);
```

### 事件

```javascript

  // 选择节点时触发
  onSelect={(e) => console.log('onSelect Event', e)}

  // 展开/收起节点时触发
  onExpand={(e) => console.log('onExpand Event', e)}

  // 移动节点时触发
  onMove={() => console.log('onMove Event')}

```

## Props

| Prop     | Type     | Optional | Default | Description         |
| -------- | -------- | -------- | ------- | ------------------- |
| height   | number   | Yes      |         | 高度                |
| width    | number   | Yes      |         | 宽度                |
| data     | object   | Yes      |         | 数据                |
| onSelect | function | Yes      |         | 选择节点时触发      |
| onExpand | function | Yes      |         | 展开/收起节点时触发 |
| onMove   | function | Yes      |         | 移动节点时触发      |

## 致谢

- [`react-native-mind`
  ](https://github.com/zjfjiayou/react-native-mind) - 本项目的原始代码
- [`create-react-native-module`](https://github.com/brodybits/create-react-native-module) - 本项目使用的插件脚手架

## 更新记录

[CHANGELOG.md](./CHANGELOG.md)

## License

[MIT](./LICENSE)
