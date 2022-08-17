import { inject } from 'mobx-react';
import React from 'react';
import {toJS} from "mobx";

const Main:React.FC<{props:any,publicDte:any}>=({props,publicDte})=> {
  const {userInfo} = publicDte
  const name:string = toJS(userInfo)[0].username
  // console.log(toJS(userInfo))
  return (
    <div>
      <h1>
          欢迎:{name}
      </h1>
    </div>
  );
}

export default inject('publicDte')(Main);
