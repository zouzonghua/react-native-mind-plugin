import React, { Component } from 'react';

import { Text, G, Rect, Image } from 'react-native-svg';

import nodeStyle from '../style/node.style';

class File extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { nodeData } = this.props;

    if (!nodeData.data.fileNameList || !nodeData.data.fileNameList.length) {
      return (
        <G>
          <Rect
            {...nodeStyle.title.nodeBox}
            width={nodeData.shape.width}
            height={nodeData.shape.height}
          />
          <Text {...nodeStyle.title.title}>{nodeData.data.title}</Text>
        </G>
      );
    }
    const fileNameTextList = nodeData.data.fileNameList.map((item, index) => {
      if (item === '') {
        return false;
      }
      // 文件名称 Y 轴
      const fileNameY =
        nodeData.titleBox.height +
        nodeStyle.file.content.paddingTop +
        index * 20;
      // 文件名称 x 轴
      const fileNameX =
        nodeStyle.file.content.x +
        nodeStyle.file.content.paddingLeft +
        nodeStyle.file.thumb.singleWidth +
        nodeStyle.file.fileName.marginLeft;
      return (
        <Text
          key={index}
          {...nodeStyle.file.fileName}
          y={fileNameY}
          x={fileNameX}
        >
          {item}
        </Text>
      );
    });

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
        <Text {...nodeStyle.file.title} y={titleTextY}>{nodeData.data.title}</Text>
        <Rect
          {...nodeStyle.image.content}
          width={nodeData.contentBox.width - 2 * nodeStyle.image.content.x}
          height={nodeData.contentBox.height - nodeStyle.image.content.y}
          y={nodeData.titleBox.height}
        />
        <G
          y={nodeData.titleBox.height + nodeStyle.file.content.paddingTop}
          x={nodeStyle.file.content.x + nodeStyle.file.content.marginLeft}
        >
          <Image
            href={require('../icon/file.png')}
            width={nodeStyle.file.thumb.singleWidth}
            height={nodeStyle.file.thumb.singleHeight}
          />
        </G>
        {fileNameTextList}
      </G>
    );
  }
}

export default File;
