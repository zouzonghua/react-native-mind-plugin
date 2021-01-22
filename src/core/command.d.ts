declare class Command {
  exec(key: string, param: any): any;
  register(key: string, callback: any): any;
}
declare let command: Command;
export default command;
