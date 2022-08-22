import React from 'react';
import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';




const AuutionAdd:React.FC=(props:any) => {
  const { Statistic, Divider } = StatisticCard;
  const [responsive, setResponsive] = useState(false);

  return (

    <div>

      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: '总流量(人次)',
              value: 601986875,
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: '付费流量',
              value: 3701928,
              description: <Statistic title="占比" value="61.5%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: '免费流量',
              value: 1806062,
              description: <Statistic title="占比" value="38.5%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
        </StatisticCard.Group>
      </RcResizeObserver>

      <div style={{margin:'20px'}}>
        <StatisticCard
          title="整体流量评分"
          extra={<EllipsisOutlined />}
          statistic={{
            value: 86.2,
            suffix: '分',
            description: <Statistic title="排名前" value="20%" />,
          }}
          chart={
            <img
              src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
              width="100%"
              alt="进度条"
            />
          }
          footer={
            <>
              <Statistic value={15.1} title="累计注册数" suffix="万" layout="horizontal" />
              <Statistic value={15.1} title="本月注册数" suffix="万" layout="horizontal" />
            </>
          }
          style={{ width: 250 }}
        />
      </div>



    </div>




  );
}

export default AuutionAdd;
