import React from 'react';

interface MinderProps {
  data: any;
  height: Number;
  width: Number;
  onMove?: (_?: any) => void;
  onExpand?: (_?: any) => void;
  onSelect?: (_?: any) => void;
}
export default class Minder extends React.Component<MinderProps, any> {
  static defaultProps: {
    data: any;
    height: Number;
    width: Number;
    onMove?: (_?: any) => void;
    onExpand?: (_?: any) => void;
    onSelect?: (_?: any) => void;
  };
  constructor(props: MinderProps);
  onMove?: (...arg: any) => void;
  onExpand?: (...arg: any) => void;
  onSelect?: (...arg: any) => void;
  render(): JSX.Element;
}
