import React, { Component } from 'react';

import { Text, G, Rect } from 'react-native-svg';

import nodeStyle from '../style/node.style';

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { nodeData } = this.props;
    const textList = nodeData.data.titleList.map((item, index) => {
      if (item === '') {
        return false;
      }
      // 标题文本 Y 轴
      const titleTextY =
        index * nodeStyle.lineHeight +
        nodeStyle.paddingTop +
        nodeStyle.paddingBottom +
        5;
      return (
        <Text key={index} {...nodeStyle.title.title} y={titleTextY}>
          {item}
        </Text>
      );
    });

    return Array.isArray(nodeData.data.titleList) &&
      nodeData.data.titleList.length ? (
      <G>
        <Rect
          {...nodeStyle.title.nodeBox}
          width={nodeData.shape.width}
          height={nodeData.shape.height}
        />
        {textList}
      </G>
    ) : null;
  }
}

export default Title;
