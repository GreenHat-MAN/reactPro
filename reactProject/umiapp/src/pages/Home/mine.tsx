import React from 'react';
import {Col, Row, Statistic} from "antd";
import { LikeOutlined } from '@ant-design/icons';
const Mine:React.FC=(props:any)=> {
  return (
    <div style={{width:'100%',maxHeight:'650px'}}>
      <Row>
        <Col span={'20'}>
          <video muted autoPlay  src={'https://publicdate.oss-cn-hangzhou.aliyuncs.com/newbaodao/baodao.mp4'}></video>
        </Col>
        <Col span={'4'}>
          <Statistic title="狂喜" value={1128} prefix={<LikeOutlined />} />
          <Statistic title="瓶颈" value={93} suffix="/ 100" />
        </Col>
      </Row>

    </div>
  );
}

export default Mine;
