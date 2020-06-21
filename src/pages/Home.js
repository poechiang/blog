import React,{Component} from "react";
import {Layout,Avatar,Descriptions,Tag} from "antd";
import {LocIcon, BirthIcon,HomeIcon,UserIcon,LinkIcon,InfoIcon,MailIcon,GitIcon} from '../asserts/RC'


class Home extends Component{
  render(){
    return (
      <Layout id={'home'} className={'page-wrap p-24'}>
        <Layout.Sider width={280}>
          <div className={'hor-center mb-60'}>
            <Avatar className={'ma-24'} size={80}><UserIcon width={60} height={60}/></Avatar>
            <h3 className={'mv-12'}>Poe · Chiang</h3>
            <p className={'mv-12'}><Tag color="cyan">勿恨行云吞素月 梦回正爱雨淋浪</Tag></p>
          </div>
          <Descriptions title={false} column={1} colon={false}>
            <Descriptions.Item label={<LocIcon />}>中国 · 杭州</Descriptions.Item>
            <Descriptions.Item label={<HomeIcon/>}>山东 · 临沂</Descriptions.Item>
            <Descriptions.Item label={<BirthIcon/>}>1981 . 11</Descriptions.Item>
            <Descriptions.Item label={<MailIcon/>}><a href="mail://poechiang@live.cn">poechiang@live.cn</a></Descriptions.Item>
            <Descriptions.Item label={<LinkIcon/>}><a href="https://poechiang.tech" target={'_blank'} rel={'noopener noreferrer'}>https://poechiang.tech</a></Descriptions.Item>
            <Descriptions.Item label={<GitIcon/>}><a href="https://github.com/poechiang" target={'_blank'} rel={'noopener noreferrer'}>https://github.com/poechiang</a></Descriptions.Item>
            <Descriptions.Item label={<InfoIcon/>}>
              大家好<br/>
              Hello .<br/>
              安静、孤独但不寂寞，因无话可说所以无需倾诉……<br/>
              Quiet, lonely but not lonely, no need to talk because there's nothing to say ...
              
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
          </Descriptions>
        </Layout.Sider>
        <Layout.Content>
          
          content
        </Layout.Content>
      </Layout>
    )
  }
}
export default Home;