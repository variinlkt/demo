export default class Socket{
  //@ts-ignore
  private socket: WebSocket;
  constructor(ctx: any, wsurl: string){
    this.init(ctx, wsurl);
  }
  init(ctx: any, wsurl: string) {
    try{
      if(!ctx){
        throw new Error('未传入作用域参数');
      }
      if('WebSocket' in ctx){
        this.socket = new WebSocket(wsurl);
      } else {
        throw new Error('浏览器不支持websocket')
      }
      this.socket.onopen = this.onOpen; //socket连接成功处理事件
      this.socket.onclose = this.onClose; //socket连接关闭处理事件
      this.socket.onmessage = this.onMessaage; //socket接收到新消息
      this.socket.onerror = this.onError; //soket错误处理事件
    } catch(err) {
      console.error(err);
    }
  }
  onOpen() {
    this.socket.send('open');
  }
  onClose() {
    this.socket.send('close');

  }

  onMessaage() {

  }

  onError() {

  }
}