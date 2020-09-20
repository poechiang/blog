import React from "react";
import {connect} from "react-redux";
import {Tooltip} from "antd";

const fontSize=12;
const size = 16;
const days = 7*53;
const offsetX = 40;
const offsetY=20;
const getTempPoints = (points)=>{
  let data = [];
  let
    now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth(),
    day = now.getDate();
  
  let
    start = new Date(year-1,month,day),
    weekStart = start.getDay(),
    weekEnd = now.getDay();
  
  start.setDate(start.getDate()-weekStart)
  
  for(let i =0;i<days;i++){
    const dt = start.toDateString();
    data.push({date:new Date(dt),detail:i < weekStart || i>=days-(6-weekEnd)?-1:(points?(points[dt]||0):Math.random() * 21)})
    start.setDate(start.getDate()+1)
  }
  return data;
}
const Tip = ({msg,desc}) => (
  <div>
    <h4>日期：{msg}</h4>
    {desc ? <p>活跃度：{desc}</p> : null}
  </div>
)
const Point = ({value,...props})=> {
  let key = 0;
  if(value.detail>7){
    key=5;
  }
  else if (value.detail>5){
    key=4;
  }
  else if (value.detail>3){
    key=3;
  }
  else if (value.detail>1){
    key=2;
  }
  else if (value.detail>0){
    key=1;
  }
  else if (value.detail<0){
    key=-1;
  }
  
  return (
    value.detail<0?
      <rect width={size} height={size} className={key<0?'db-0 fixed':'db-'+key} {...props} />:
    <Tooltip title={<Tip msg={value.date.toDateString()} desc={value.detail.toString()}/>}>
      <rect width={size} height={size} className={key<0?'db-0 fixed':'db-'+key} {...props} />
    </Tooltip>
  )
}
const Weeks = ()=>(
  ['Mon','Wen','Fri'].map((item,index)=>(
    <text y={(size+1)*(3+index*2)} x={offsetX-4} key={item}>{item}</text>
  ))
)
const Months = ({points})=>{
  return points.map((item,index)=>(
    index===0 || item.date.getDate()===1?<text y={12} x={offsetX+(size+1)*Math.floor(index/7)} key={index}>{['Lib', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][item.date.getMonth()]}</text>:null
  ))
}
export default connect()(({className,points})=>{
  points =  getTempPoints(points);
  return (<svg className={className} style={{width:offsetX+(size+1)*53+16}}>
    <g fill={'#61DAFB'} fontSize={fontSize} style={{textAnchor: "end"}}>
      {<Weeks/>}
    </g>
    <g fill={'#61DAFB'} fontSize={fontSize}>
      {<Months points={points}/>}
    </g>
    {points.map((item,index)=><Point value={item} key={index} x={offsetX+Math.floor(index / 7)*(size+1)} y={offsetY+Math.floor(index%7)*(size+1)}/>)}
  </svg>)
})
