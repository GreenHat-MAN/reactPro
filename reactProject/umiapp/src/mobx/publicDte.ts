import {action, flow, makeObservable, observable, runInAction,makeAutoObservable} from "mobx";
import {Ajax} from "@/api";

class PublicDte {
  constructor(){
    makeObservable(this)
  }
  @observable userInfo :any =  null;

  @observable roleList:any = [];

  @observable setUlist:any = [];

  @observable msList = [];

  @action   changeMsList = async (payload?:any)=>{
    let res = await Ajax.findms(payload) as any;
    if(res.code==200){
      this.msList = res.result;
    }
  }

  @action  getUserInfoAsync = async  (payload:any)=>{
    let res:any = await Ajax.userAll(payload)
    if(res.code==200){
        this.userInfo = res.result;
    }
  }

  @action  getRoleListAsync = async  (payload:any)=>{
    let res:any = await Ajax.getRole(payload)
    if(res.code==200){
        this.roleList = res.result;
        this.getUserInfoAsync({})
    }
  }

  @action getUserList = async (payload:any)=>{
    let res = await Ajax.getuser(payload) as any;
    if (res.code == 200) {
      this.setUlist=res.result
    }
  }

  @action  changeUserInfo =   (payload:any)=>{
    this.userInfo = payload
  }

  @action changeRoleList = (payload:any)=>{
    this.roleList = payload
  }

}

export default new PublicDte()
