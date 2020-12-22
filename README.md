# react-native-mind-plugin

## Getting started

`$ npm install react-native-mind-plugin --save`

### Mostly automatic installation

`$ react-native link react-native-mind-plugin`

### pod install

`$ cd ios && pod install`

## Usage

### Event

```javascript
#一个节点树开始绘制;
emitter.on('tree.layout', (rootId) => {
  console.log(rootId);
});
```

```javascript
#点击节点;
emitter.on('node.press', (node) => {
  console.log(node);
});
```

```javascript
#点击收起展开;
emitter.on('expand.press', (node) => {
  console.log(node);
});
```

### command

```javascript
#正常模式;
command.exec('changeLayout', 'normal', rootId);
#聚拢模式;
command.exec('changeLayout', 'compact', rootId);
```

### Example

```javascript
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Dimensions
} from 'react-native';

import { Minder, emitter, command } from 'react-native-mind';

const TOTALWIDTH = Dimensions.get('window').width;
const TOTALHEIGHT = Dimensions.get('window').height;

let dataList = [
  {
    root: {
      data: {
        node_id: '522bbeef44ec',
        title: '根节点',
        content_type: 'content.builtin.title',
        content: '',
      },
      children: [
        {
          data: {
            node_id: 'b7f3m1o36u0c',
            title: '二级节点1',
            content_type: 'content.builtin.title',
          },
          children: [
            {
              data: {
                node_id: 'b7f323vlqyp4o',
                title: '三级节点1',
                content_type: 'content.builtin.title',
                content: '',
              },
            },
            {
              data: {
                node_id: 'b7f3m1l3qy24o',
                title: '三级节点2',
                content_type: 'content.builtin.title',
                content: '',
              },
            },
            {
              data: {
                node_id: 'b7f3m4vl33p4o',
                title: '三级节点3',
                content_type: 'content.builtin.title',
                content: '',
              },
            },
          ],
        },
        {
          data: {
            node_id: 'b7f3m1o16u2c',
            title: '二级211111',
            content_type: 'content.builtin.title',
            content: '',
          },
          children: [
            {
              data: {
                node_id: 'b7f33vlqyp4o',
                title: '三级节点4',
                content_type: 'content.builtin.title',
                content: '',
              },
            },
            {
              data: {
                node_id: 'b7f3m1lqy24o',
                title: '三级节点5',
                content_type: 'content.builtin.title',
                content: '',
              },
            },
            {
              data: {
                node_id: 'b7f3mvl33p4o',
                title: '三级节点6',
                content_type: 'content.builtin.title',
                content: '',
              },
            },
            {
              data: {
                node_id: 'b7f3mvl323p4o',
                title: '三级节点7',
                content_type: 'content.builtin.title',
                content: '',
              },
            },
          ],
        },
        {
          data: {
            node_id: 'b7f3m1o26usc',
            title: '二级3',
            content_type: 'content.builtin.title',
            content: '',
          },
        },
        {
          data: {
            node_id: 'b7f3m1o26u2c',
            title: '二级4',
            content_type: 'content.builtin.title',
            content: '',
          },
        },
      ],
    },
  },
];

export default class reactNativeMindExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Minder
          dataList={dataList}
          height={TOTALHEIGHT - 40}
          width={TOTALWIDTH}
        ></Minder>
      </View>
    );
  }
}
```

## Props

Prop              | Type     | Optional | Default     | Description
----------------- | -------- | -------- | ----------- | -----------
height         | number     | Yes      |        | Drawing board height
width         | number     | Yes      |        | Drawing board width
dataList         | array     | Yes      |        | 数据
onSelect         | function     | Yes      |        | 点击节点触发
onExpand         | function     | Yes      |        | 展开/收起节点时触发
