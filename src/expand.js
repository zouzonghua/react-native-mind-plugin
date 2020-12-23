import React, { Component } from 'react';
import { PanResponder } from 'react-native';
import PropTypes from 'prop-types';

import { emitter } from './core/utils';

import { Image, G } from 'react-native-svg';

class Expand extends Component {


  static propTypes = {
    nodeData: PropTypes.object,
    onExpand: PropTypes.func,
    hideChildren: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      expand: true,
    };
    this.hideChildren = this.hideChildren.bind(this);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }

  hideChildren() {
    this.setState({expand: !this.state.expand}, () => {
      this.props.hideChildren(this.state.expand);
      this.props.onExpand && this.props.onExpand(this.props.nodeData)
    })
  }


  handleStartShouldSetPanResponder = e => {
    console.log('start set pan responder: design space');
    return true;
  };
  handleMoveShouldSetPanResponder = e => {
    console.log('move set pan responder: design space');
    return false;
  };
  handlePanResponderGrant = e => {
    this.hideChildren()
    console.log('grant: design space');
  };

  handlePanResponderMove = e => {
    console.log('move: design space');
  };

  handlePanResponderEnd = e => {
    console.log('end: design space');
  };

  render() {
    const { nodeData } = this.props;
    const x = nodeData.shape.width + 10;
    const y = nodeData.shape.height / 2 - 10;

    //判断是否显示收缩展开图标
    if (!nodeData.getChildren().length) {
      return <G />;
    }

    return (
      <G x={x} y={y}  {...this.panResponder.panHandlers}>
        {this.state.expand ? (
          <Image
            href={require('./icon/expand-open.png')}
            width="20"
            height="20"
          />
        ) : (
          <Image
            href={require('./icon/expand-close.png')}
            width="20"
            height="20"
          />
        )}
      </G>
    );
  }
}

export default Expand;
