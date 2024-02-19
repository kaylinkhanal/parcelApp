import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
const orderStatusList = ['pending','approve','dispatched','pickedUp','delivered']
const CustomTimeLine = ({status}) => {
    const statusId = orderStatusList.indexOf(status)
    return(
  <Timeline
    mode="alternate"
    items={orderStatusList.map((item,id)=> {return {children: item, color:  id<= statusId ? 'green': 'grey' }})}
  />
)};
export default CustomTimeLine;