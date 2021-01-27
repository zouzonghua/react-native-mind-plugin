import Box from '../../core/box';
import Point from '../../core/point';
import options from '../../core/options';
import config from '../../config';
import command from '../../core/command';
import Node from '../../core/node';
import nodeStyle from '../../style/node.style';
import * as utils from '../../core/utils';

// 内嵌 describe 函数用于描述一个模块
describe('core 核心代码测试', () => {
  // 期望的表现行为
  it('Box Class 的实例 宽高应该和实例化时一致', () => {
    // 用断言测试预期行为
    const width = 10;
    const height = 10;
    const box = new Box(width, height);
    expect(box.width).toBe(width);
    expect(box.height).toBe(height);
  });

  it('Point Class 的实例 传递的参数和返回的参数一致', () => {
    // 用断言测试预期行为
    const map = {
      x: 10,
      y: 10,
      childOffsetY: 10,
      offsetX: 10,
      offsetY: 10,
    };
    const point = new Point(
      map.x,
      map.y,
      map.childOffsetY,
      map.offsetX,
      map.offsetY
    );
    expect(point.childOffsetY).toBe(map.childOffsetY);
    expect(point.offsetX).toBe(map.offsetX);
    expect(point.offsetY).toBe(map.offsetY);
    expect(point.x).toBe(map.x);
    expect(point.y).toBe(map.y);
  });

  it('Option Class 的实例 参数和 config.js 是否一致', () => {
    expect(options.get('layout')).toBe(config.layout);
    expect(options.get('navigation')).toBe(config.navigation);
    expect(options.get()).toEqual(config);
    options.set('test', 'test');
    expect(options.get('test')).toBe('test');
  });

  it('Node Class 的实例 测试', () => {
    let data = {
      data: {
        node_id: '522bbeef44ec',
        title: '如何阅读一本书',
        content_type: 'content.builtin.title',
        content: '',
      },
      children: [],
      parentId: null,
    }
    const node = new Node(data)
    expect(node.firstChild).toBeFalsy()
    expect(node.lastChild).toBeFalsy()
    expect(node.coordinate).toEqual({ x1: -25, x2: 0, x3: 0, x4: -25, y1: 0, y2: 0, y3: 10, y4: 10 })
    expect(node.level).toBe(0)
    expect(node.serializeContent).toBeFalsy()
    expect(node.style).toEqual(nodeStyle.title)
    expect(node.shape).toEqual({ _width: 0, _height: 0 })
    expect(node.prev).toBe(null)

  });

  it('NodeTree 的实例 测试', () => {

  })

  it('Command Class 的实例 测试注册和执行是否正常运行', () => {
    command.register('fn', (param) => {
      return param
    })
    expect(command.exec('fn', 'test')).toBe('test')
  });

  it('Utils 相关方法是否正常运行', () => {
    expect(utils.type.isString('str')).toBeTruthy();
    expect(utils.type.isFunction(() => {})).toBeTruthy();
    expect(utils.type.isArray([])).toBeTruthy();
    expect(utils.type.isNumber(1)).toBeTruthy();
    expect(utils.type.isObject({})).toBeTruthy();
    expect(utils.type.isRegExp(/abc/)).toBeTruthy();
    const jsonObject = '{"result":true, "count":"1"}';
    const jsonArray = '[{"result":true, "count":"1"}]';
    expect(utils.isJsonString(jsonArray)).toBeTruthy();
    expect(utils.isJsonString(jsonObject)).toBeFalsy();
    expect(utils.isJsonString(JSON.parse(jsonObject))).toBeFalsy();
    expect(
      utils.comparePlainObject(JSON.parse(jsonObject), JSON.parse(jsonObject))
    ).toBeTruthy();
    expect(utils.ClearBr('1<p>2</P>\n3')).toBe('123');
    expect(utils.guid().length).toBe(36);
  });

});
