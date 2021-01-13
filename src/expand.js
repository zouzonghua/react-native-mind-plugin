import React, { Component } from 'react';
import { PanResponder } from 'react-native';
import PropTypes from 'prop-types';

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
      // 询问组件是否要劫持事件响应者设置，自己接收事件处理，如果返回 true
      onStartShouldSetPanResponderCapture: () => true,
      // 这个视图是否在触摸开始时想成为响应器
      onStartShouldSetPanResponder: () => {},
      // 询问组件是否要劫持事件响应者设置，自己接收事件处理，如果返回 true
      onMoveShouldSetPanResponderCapture: () => false,
      // 当视图不是响应器时，该指令被在视图上移动的触摸调用：这个视图想“声明”触摸响应吗
      onMoveShouldSetPanResponder: () => {},
      // 其他的元素想成为响应器。这种视图应该释放应答吗？返回 true 就是允许释放
      onPanResponderTerminationRequest: () => true,
      // 用户松开他们的手指
      onPanResponderRelease: this.hideChildren,
    });
  }

  hideChildren() {
    this.setState({expand: !this.state.expand}, () => {
      this.props.hideChildren(this.state.expand);
      this.props.onExpand && this.props.onExpand(this.props.nodeData)
    })
  }

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
