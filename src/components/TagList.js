import React from "react";
import {Tag} from "antd";

export default ({tags=[],colors=false})=>{
    return tags.length<=0?null:tags.map((tag,index)=>(<Tag color={colors?colors[index]:"cyan"} key={index}>{tag}</Tag>))
};
