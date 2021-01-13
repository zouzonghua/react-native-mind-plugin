import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { G } from 'react-native-svg';

import { NodeTree } from './core/nodeTree';
import Node from './node';
import command from './core/command';

class Collection extends Component {
  static propTypes = {
    nodeTree: PropTypes.object,
    onSelect: PropTypes.func,
    onExpand: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      ready: false,
      nodeTree: new NodeTree(this.props.nodeTree),
    };

    this.layout = this.layout.bind(this);
  }

  get allNode() {
    return this.state.nodeTree.allNode;
  }

  getNodeTreeAllNode(tree) {
    if(!Array.isArray(tree) || tree.length === 0) {
      return
    }
    let nodes = [];
    const loop = (tree) => {
      tree.forEach(item => {
        nodes.push(item);
        if (Array.isArray(item.children) && item.children.length) {
          loop(item.children)
        }
      })
    }
    loop(tree)
    return nodes;
  }

  layout() {
    this.forceUpdate();
  }

  componentDidMount() {
    const self = this;

    // 修改显示模式
    command.register('changeLayout', (mode, rootId) => {
      if (rootId === self.state.nodeTree.root.data.node_id) {
        self.state.nodeTree.chooseLayout(mode);
        command.exec('redraw', rootId);
      }
    });

    // 重算坐标并重绘
    command.register('redraw', (rootId) => {
      if (rootId === self.state.nodeTree.root.data.node_id) {
        self.state.nodeTree.calcPosition();
      }
    });

    // 重绘
    command.register('layout', (rootId) => {
      if (rootId === self.state.nodeTree.root.data.node_id) {
        this.setState({
          ready: true,
        });
      }
    });

    // 获取根节点
    command.register('getRoot', (rootId) => {
      if (rootId && rootId === self.state.nodeTree.root.data.node_id) {
        return self.state.nodeTree.root;
      }

      if (rootId === undefined) {
        return self.state.nodeTree.root;
      }
    });

    // 获取根节点
    command.register('moveToStart', (rootId, point) => {
      if (rootId && rootId === self.state.nodeTree.root.data.node_id) {
        this.props.moveToStart(point);

        return self.state.nodeTree.root;
      }
    });


    // 重绘 增删改操作
    command.register('render', (rootId) => {
      if (rootId === self.state.nodeTree.root.data.node_id) {
        self.setState({nodeTree: new NodeTree(this.props.nodeTree)})
      }
    });

    // 获取节点数据
    command.register('getNode', (id) => {
      if (!id) {
        return false
      }

      return self.allNode.find(item => item.data.node_id === id)
    })

  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {

    if (!this.state.ready) {
      return <G />;
    }

    const nodeList = this.allNode.map((node) => {
      return (
        <Node onExpand={this.props.onExpand} onSelect={this.props.onSelect} redraw={this.layout} nodeData={node} key={node.data.node_id} />
      );
    });

    //加了一个反转，使得子节点先渲染，进而使得子节点的连线先渲染，最后在渲染节点上的图片
    return <G>{nodeList.reverse()}</G>;
  }
}

export default Collection;
