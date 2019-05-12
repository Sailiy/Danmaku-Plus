class DanmakuPool{
  private mPoolSize:number=0
  private mMessagePool:Array<IDanmaMessage|null>
  constructor(size:number=300){
    this.mPoolSize=size
    this.mMessagePool = new Array(this.mPoolSize)
  }
  addMessage(msg:IDanmaMessage){
    this.mMessagePool.push(msg)
  }
  addMessages(msgs:Array<IDanmaMessage>=[]){
    for(let i=0;i<msgs.length;i++){
      for (let j = 0; j < this.mMessagePool.length; j++) {
        if (!this.mMessagePool[j]) {
          this.mMessagePool[j] = msgs[i]
        }
      }
    }
  }
  removeMessage(index:number){
    if(Number.isInteger(index)&& index>0){
      this.mMessagePool[index]=null
    }
  }
}