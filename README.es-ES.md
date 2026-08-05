# react-native-mind-plugin

Este es un plugin de ReactNative para mapas mentales, compatible con iOS 14.3 y Android 11 (otras versiones por probar).

![](https://raw.githubusercontent.com/zouzonghua/ImageHosting/main/img/20210111172339.png)

## Declaración

- El código proviene de [`react-native-mind`](https://github.com/zjfjiayou/react-native-mind), solo que realicé algunos pequeños cambios para que sea compatible con la versión ReactNative 0.63.3. ¡Señor/a [zjfjiayou](https://github.com/zjfjiayou) se merece agradecimientos!
- Los archivos base del proyecto se construyeron usando la plantilla [`create-react-native-module`](https://github.com/brodybits/create-react-native-module). ¡Señor/a [brodybits](https://github.com/brodybits) se merece agradecimientos!
- También se anima a los estudiantes interesados a contribuir con código, intercambiar, ayudar mutuamente y progresar juntos.

## Instalación

```bash
npm install react-native-svg
npm install react-native-mind-plugin
```

O bien:

```bash
yarn add react-native-svg
yarn add react-native-mind-plugin
```

## Instalación de pods

`cd ios && pod install`

## Instrucciones de uso

### Inicialización

```javascript

import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Minder} from 'react-native-mind-plugin';
const TOTAL_WIDTH = Dimensions.get('window').width;
const TOTAL_HEIGHT = Dimensions.get('window').height;

const Example = () => {
  const [minderData, setMinderData] = useState({
    data: {
      node_id: '522bbeef44ec',
      title: 'Cómo leer un libro',
      content_type: 'content.builtin.title',
      content: '',
    },
    children: [
      {
        data: {
          node_id: '3F79F4D44553D7B3EF12DB0DEF92DB7F',
          title: 'Primera parte',
          content_type: 'content.builtin.title',
          content: '',
        },
        parentId: '522bbeef44ec',
        children: [
          {
            data: {
              node_id: 'E225DEEACBBE16687493058DEFE2A17C',
              title: 'Lectura básica',
              content_type: 'content.builtin.title',
              content: '',
            },
            parentId: '3F79F4D44553D7B3EF12DB0DEF92DB7F',
          },
          {
            data: {
              node_id: 'B049F433F696EEE7294CB801BCC994DC',
              title: 'Lectura elemental Lectura básica Lectura primitiva',
              content_type: 'content.builtin.title',
              content: '',
            },
            parentId: '3F79F4D44553D7B3EF12DB0DEF92DB7F',
          },
        ],
      },
      {
        data: {
          node_id: 'B8C091C3E756A1E39D66479B4DE0B162',
          title: 'Segunda parte',
          content_type: 'content.builtin.title',
          content: '',
        },
        parentId: '522bbeef44ec',
        children: [
          {
            data: {
              node_id: '61BCD18E9B22103AECAEA8BA9FA0EE08',
              title: 'Lectura crítica',
              content_type: 'content.builtin.title',
              content: '',
            },
            parentId: 'B8C091C3E756A1E39D66479B4DE0B162',
          },
        ],
      },
      {
        data: {
          node_id: 'BCA8E0C3FFE324EEDF526CA184C1FBE8',
          title: 'Tercera parte',
          content_type: 'content.builtin.title',
          content: '',
        },
        parentId: '522bbeef44ec',
        children: [
          {
            data: {
              node_id: '2913E2113016BE6C56642694B68400DA',
              title: 'Lectura analítica',
              content_type: 'content.builtin.title',
              content: '',
            },
            parentId: 'BCA8E0C3FFE324EEDF526CA184C1FBE8',
          },
        ],
      },
      {
        data: {
          node_id: 'B73F84E09A17D29F653B66B632ED8A66',
          title: 'Cuarta parte',
          content_type: 'content.builtin.title',
          content: '',
        },
        parentId: '522bbeef44ec',
        children: [
          {
            data: {
              node_id: '017B909351CC932791264520576151D3',
              title: 'Objetivos por etapas',
              content_type: 'content.builtin.title',
              content: '',
            },
            parentId: 'B73F84E09A17D29F653B66B632ED8A66',
          },
        ],
      },
    ],
    parentId: null,
  });

  return (
    <View>
      <Minder
        data={minderData}
        onSelect={(e) => console.log('onSelect Event', e)}
        onExpand={(e) => console.log('onExpand Event', e)}
        onMove={() => console.log('onMove Event')}
        height={TOTAL_HEIGHT}
        width={TOTAL_WIDTH}
      />
    </View>
  );
};
export default Example;

```

### Comandos

```javascript
// Re-renderizar
command.exec('render', rootId);

// Obtener nodo
command.exec('getNode', nodeId);
```

### Eventos

```javascript

  // Cuando se selecciona un nodo
  onSelect={(e) => console.log('onSelect Event', e)}

  // Cuando se expande/colon un nodo
  onExpand={(e) => console.log('onExpand Event', e)}

  // Cuando se mueve un nodo
  onMove={() => console.log('onMove Event')}

```

## Props

| Prop     | Type     | Optional | Default | Description         |
| -------- | -------- | -------- | ------- | ------------------- |
| height   | number   | Yes      |         | Altura              |
| width    | number   | Yes      |         | Anchura             |
| data     | object   | Yes      |         | Datos               |
| onSelect | function | Yes      |         | Se dispara al seleccionar un nodo |
| onExpand | function | Yes      |         | Se dispara al expandir/colapsar un nodo |
| onMove   | function | Yes      |         | Se dispara al mover un nodo |

## Créditos

- [`react-native-mind`](https://github.com/zjfjiayou/react-native-mind) - Código original del proyecto
- [`create-react-native-module`](https://github.com/brodybits/create-react-native-module) - Plantilla utilizada para crear el proyecto

## Historial de cambios

[CHANGELOG.md](./CHANGELOG.md)

## Licencia

[MIT](./LICENSE)
