import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PanResponder, View } from 'react-native';

import { Svg, G } from 'react-native-svg';

import options from './core/options';
import command from './core/command';
import Collection from './collection';

//引入插件
import { Navigation } from './plugins';

//引入布局算法
require('./layout/compact');
require('./layout/normal');

class Minder extends Component {
  static propTypes = {
    data: PropTypes.object,
    onSelect: PropTypes.func,
    onExpand: PropTypes.func,
    onMove: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      x: 0,
      y: 0,
      scale: 1,
    };

    this._initX = 0;
    this._initY = 0;
    this._initDistance = 0;

    this.move = this.move.bind(this);
    this.press = this.press.bind(this);
    this.pressOut = this.pressOut.bind(this);
    this.moveToStart = this.moveToStart.bind(this);
  }

  UNSAFE_componentWillMount() {
    this._panResponder = PanResponder.create({
        // 询问组件是否要劫持事件响应者设置，自己接收事件处理，如果返回 true
        onStartShouldSetPanResponderCapture: () => false,
        // 这个视图是否在触摸开始时想成为响应器
        onStartShouldSetPanResponder: () => {},
        // 询问组件是否要劫持事件响应者设置，自己接收事件处理，如果返回 true
        onMoveShouldSetPanResponderCapture: (e,$gs) => (Math.abs($gs.dx) > 2 || Math.abs($gs.dy) > 2),
        // 当视图不是响应器时，该指令被在视图上移动的触摸调用：这个视图想“声明”触摸响应吗
        onMoveShouldSetPanResponder: () => {},
        // 其他的元素想成为响应器。这种视图应该释放应答吗？返回 true 就是允许释放
        onPanResponderTerminationRequest: () => true,
        // 视图现在正在响应触摸事件。这个时候要高亮标明并显示给用户正在发生的事情。
        onPanResponderGrant: this.press,
        // 用户正移动他们的手指
        onPanResponderMove: this.move,
        // 用户松开他们的手指
        onPanResponderRelease: this.pressOut,

    });
  }

  move(evn, gestureState) {
    if (gestureState.numberActiveTouches === 1) {
      const dx = gestureState.dx + this._initX;
      const dy = gestureState.dy + this._initY;

      this.setState({
        x: dx,
        y: dy,
      });
      this.props.onMove && this.props.onMove()
    }

    if (gestureState.numberActiveTouches === 2) {
      let dx = Math.abs(
        evn.nativeEvent.touches[0].pageX - evn.nativeEvent.touches[1].pageX
      );
      let dy = Math.abs(
        evn.nativeEvent.touches[0].pageY - evn.nativeEvent.touches[1].pageY
      );
      let newDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      let scale = this.state.scale + (newDistance / this._initDistance - 1);

      this._initDistance = newDistance;

      if (scale > 2 || scale < 0.5) {
        return;
      }

      this.setState({ scale: scale });
    }
  }

  press(evn, gestureState) {
    if (gestureState.numberActiveTouches === 2) {
      let dx = Math.abs(
        evn.nativeEvent.touches[0].pageX - evn.nativeEvent.touches[1].pageX
      );
      let dy = Math.abs(
        evn.nativeEvent.touches[0].pageY - evn.nativeEvent.touches[1].pageY
      );
      this._initDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    }
  }

  pressOut() {
    this._initX = this.state.x;
    this._initY = this.state.y;
  }

  moveToStart(point) {
    this.setState({
      x: -point.x,
      y: -point.y,
    });
    this._initX = -point.x;
    this._initY = -point.y;
  }
  render() {
    if (!this.props.data || Object.keys(this.props.data).length === 0) {
      return <Svg />;
    }
    return (
      <View {...this._panResponder.panHandlers}>
        <Svg style={{ flex: 1}}>
          <G
            x={this.state.x}
            // 居中
            y={this.state.y + this.props.height / 2}
            // scale={this.state.scale}
          >
            <Collection
              onSelect={this.props.onSelect}
              onExpand={this.props.onExpand}
              moveToStart={this.moveToStart}
              nodeTree={this.props.data}
            />
            {options.get('navigation') ? <Navigation /> : <G />}
          </G>
        </Svg>
      </View>
    );
  }
}

module.exports.Minder = Minder;
module.exports.command = command;
