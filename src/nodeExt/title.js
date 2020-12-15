import React, { Component } from 'react';

import { Text, G, Rect } from 'react-native-svg';

import nodeStyle from '../style/node.style';

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { nodeData } = this.props;
    const textY = (nodeData.shape.height + (nodeStyle.title.title.fontSize / 2)) / 2
    return (
      <G>
        <Rect
          {...nodeStyle.title.nodeBox}
          width={nodeData.shape.width}
          height={nodeData.shape.height}
        />
        <Text {...nodeStyle.title.title} y={textY}>{nodeData.data.title}</Text>
      </G>
    );
  }
}

export default Title;
