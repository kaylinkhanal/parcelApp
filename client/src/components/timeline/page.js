// import { Timeline } from 'antd';

// const CustomTimeLine = ({status,orderStatusList}) => {
//     const statusId = orderStatusList.indexOf(status)
//     return(
//   <Timeline
//     mode="alternate"
//     items={orderStatusList.map((item,id)=> {return {children: <button className={ id<= statusId ? 'bg-teal-200':null}>{item}</button>, color:  id<= statusId ? 'green': 'grey' }})}
//   />
// )};
// export default CustomTimeLine;



import React, {useEffect, useState} from 'react';
import { Steps } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';


const CustomTimeLine = ({status,orderStatusList,changeOrderStatus,disableChange}) => {
  const {userDetails} = useSelector(state=>state.user)
  const statusLists = orderStatusList.map(item=>item.title)
   const statusId = statusLists.indexOf(status)
   const [current, setCurrent] = useState(statusId);
   const onChange = (id) => {
    if(!disableChange && userDetails.role === 'rider'){
      if(statusId < id ){
        changeOrderStatus(statusLists[id])
        setCurrent(id);
      }
    }
   
   };
   useEffect(()=>{
    setCurrent(statusId)
   },[statusId])
  return(
 <>

 <Steps
    direction="vertical"
    size="small"
    current={current}
    onChange={onChange}
    items={
      orderStatusList.map((item,id)=>{
        return {
          title: item.title,
          description:item.description,
          icon: id === current+1 ? <LoadingOutlined/>: null
        }
      })
      
    }
  />
 </> 
)};
export default CustomTimeLine;