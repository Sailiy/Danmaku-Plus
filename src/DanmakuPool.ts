import { IDanmaMessage } from "./interface/IDanmaMessage";

export class DanmakuPool{
  private mPoolSize:number=20
  private mMessagePool: Array<IDanmaMessage|null> = new Array(this.mPoolSize)
  constructor(size?:number){
    if(size){
      this.mPoolSize=size
      this.mMessagePool = new Array(this.mPoolSize)
    }
  }
  addMessage(msg:IDanmaMessage){
    this.addMessages([msg])
  }
  getMessage():IDanmaMessage|null{
   let result=null
   for(let i=0;i<this.mMessagePool.length;i++){
     if(this.mMessagePool[i]!==null&&(this.mMessagePool[i] as IDanmaMessage).isInit){
       result=this.mMessagePool[i]
       this.mMessagePool[i]=null
       break;
     }
   }
   return result
  }
  addMessages(msgs:Array<IDanmaMessage>=[]){
    for(let i=0;i<msgs.length;i++){
      for (let j = 0; j < this.mMessagePool.length; j++) {
        if (!this.mMessagePool[j]) {
          this.mMessagePool[j] = msgs[i]
          if (this.mMessagePool[j]) (this.mMessagePool[j] as IDanmaMessage).onCreate()
        }
      }
    }
  }
  removeMessage(msg:IDanmaMessage){
    let index=this.mMessagePool.findIndex((item)=>item===msg)
    this.removeMessageByIndex(index)
  }
  removeMessageByIndex(index:number){
    if(Number.isInteger(index)&& index>0){
      this.mMessagePool[index]=null
    }
  }
}