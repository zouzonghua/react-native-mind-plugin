import { NativeModules } from 'react-native';
import { Minder, emitter, command } from './src/minder';
const { MindPlugin } = NativeModules;

module.exports.MindPlugin = MindPlugin;
module.exports.Minder = Minder;
module.exports.emitter = emitter;
module.exports.command = command;
