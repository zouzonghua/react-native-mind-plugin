import React, { Component } from 'react';

import { Text, G, Rect } from 'react-native-svg';

import nodeStyle from '../style/node.style';

class Content extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { nodeData } = this.props;
    let textList;

    textList = nodeData.data.contentList.map((item, index) => {
      if (item === '') {
        return false;
      }
      // 正文文本 Y 轴
      const contentTextY =
        nodeData.titleBox.height +
        nodeStyle.content.content.paddingTop +
        nodeStyle.content.text.fontSize +
        index * nodeStyle.lineHeight;
      return (
        <Text
          key={index}
          {...nodeStyle.content.text}
          y={contentTextY}
          x={
            nodeStyle.content.content.x + nodeStyle.content.content.paddingLeft
          }
        >
          {item}
        </Text>
      );
    });

    if (!nodeData.data.contentList.length) {
      textList = (
        <Text
          {...nodeStyle.content.text}
          y={nodeData.titleBox.height + nodeStyle.content.text.fontSize}
          x={
            nodeStyle.content.content.x + nodeStyle.content.content.paddingLeft
          }
        >
          请填写内容
        </Text>
      );
    }
    // 标题文本 Y 轴
    const titleTextY =
      (nodeData.titleBox.height + nodeStyle.title.title.fontSize / 2) / 2;

    return (
      <G>
        <Rect
          {...nodeStyle.image.nodeBox}
          width={nodeData.shape.width}
          height={nodeData.shape.height}
        />
        <Text {...nodeStyle.content.title} y={titleTextY}>
          {nodeData.data.title}
        </Text>
        <Rect
          {...nodeStyle.image.content}
          width={nodeData.contentBox.width - 2 * nodeStyle.image.content.x}
          height={nodeData.contentBox.height - nodeStyle.image.content.y}
          y={nodeData.titleBox.height}
        />
        {textList}
      </G>
    );
  }
}

export default Content;
