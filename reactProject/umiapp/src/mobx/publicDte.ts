import {action, makeObservable, observable} from "mobx";

class PublicDte {
  constructor() {
    makeObservable(this)
  }

  @observable count:number = 0

  @observable userInfo:Array<string|number> = []

  @action changeUserInfo =(payload: string[]|number[])=>{
          this.userInfo = payload
  }
}

export default new PublicDte()
