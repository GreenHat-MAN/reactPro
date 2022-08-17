import  '../styles/index.scss';
import styles from './index.less'
import {Provider} from "mobx-react";
import {store} from "@/mobx/store";
export default function IndexPage(props:any) {
  return (
    <Provider {...store}>
      <div className={styles.allBox}>
        {/*路由出口*/}
        {props.children}
      </div>
    </Provider>

  );
}
