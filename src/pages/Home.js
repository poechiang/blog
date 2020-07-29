import React,{Component} from "react";
import {Layout,Avatar,Descriptions,Tag,Tabs,Timeline,Button} from "antd";
import {LocIcon, BirthIcon,UserIcon,LinkIcon,NotifyIcon,MailIcon,TagIcon} from '../asserts/RC'
import Dashboard from "../components/Dashboard";


class Home extends Component{
  render(){
    return (
      <Layout id={'home'} className={'page-wrap p-24'}>
        <Layout>
          <Layout.Sider className={'m-24 p-24'} width={280}>
            <div className={'hor-center mb-60'}>
              <Avatar className={'ma-24'} size={80}><UserIcon width={60} height={60}/></Avatar>
              <h3 className={'mv-12'}>Poe · Chiang</h3>
              <p className={'mv-12'}><Tag color="cyan">勿恨行云吞素月 梦回正爱雨淋浪</Tag></p>
            </div>
            <Descriptions title={false} column={1} colon={false}>
              <Descriptions.Item label={<LocIcon />}>中国 · 杭州</Descriptions.Item>
              {/*<Descriptions.Item label={<HomeIcon/>}>山东 · 临沂</Descriptions.Item>*/}
              <Descriptions.Item label={<BirthIcon/>}>1981 . 11</Descriptions.Item>
              <Descriptions.Item label={<MailIcon/>}><a href="mail://poechiang@live.cn">poechiang@live.cn</a></Descriptions.Item>
              {/*<Descriptions.Item label={<LinkIcon/>}><a href="https://poechiang.tech" target={'_blank'} rel={'noopener noreferrer'}>https://poechiang.tech</a></Descriptions.Item>*/}
              {/*<Descriptions.Item label={<GitIcon/>}><a href="https://github.com/poechiang" target={'_blank'} rel={'noopener noreferrer'}>https://github.com/poechiang</a></Descriptions.Item>*/}
              <Descriptions.Item label={<LinkIcon/>}><a href="https://github.com/poechiang" target={'_blank'} rel={'noopener noreferrer'}>https://github.com/poechiang</a></Descriptions.Item>
              <Descriptions.Item label={<TagIcon/>}>
                <Tag color="cyan">Javascript</Tag>
                <Tag color="cyan">React</Tag>
                <Tag color="cyan">Redux</Tag>
                <Tag color="cyan">Electron</Tag>
                <Tag color="cyan">React-Intl</Tag>
                <Tag color="cyan">PHP</Tag>
                <Tag color="cyan">Go</Tag>
                <Tag color="cyan">Vue</Tag>
                <Tag color="cyan">AntD</Tag>
                <Tag color="cyan">Python</Tag>
              </Descriptions.Item>
              <Descriptions.Item label={<NotifyIcon/>}>
                此生尽兴，赤诚善良
              </Descriptions.Item>
            </Descriptions>
          </Layout.Sider>
          <Layout.Content className={'m-24 p-24'}>
            <header className={'dashboard'}>
              <h2>Activities</h2>
              <Tabs className={'mv-24'} tabPosition={'right'}>
                <Tabs.TabPane tab="2020" key="1">
                  <Dashboard />
                </Tabs.TabPane>
                <Tabs.TabPane tab="2019" key="2">
                  <Dashboard/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="2018" key="3">
                  <Dashboard/>
                </Tabs.TabPane>
              </Tabs>
            </header>
            <article className={'articles mt-48 mb-24'}>
              <div className={'flex-row flex-main-between'}><h2>Article List</h2> <Button type={'primary'} ref={'post'} href={"/post"}>发布</Button></div>
              <Timeline mode={'left'} className={'mt-24'}>
                <Timeline.Item label="2015-09-01">
                  <h3 className={'mb-24'}>如何使用tspan元素给SVG文本添加样式、定位_SVG Text, SVG 教程...</h3>
                  <p>2015年12月24日 - SVG的``元素允许你很简单地定位和给文本添加样式,但是如果你想要针对文本的不同部分定位和添加样式呢?难道我们要去创建多个`text`元素吗?不需要的。有更简单的...</p>
                </Timeline.Item>
                <Timeline.Item label="2015-09-01 09:12:11">
                  <h3 className={'mb-24'}>javascript - svg中text的y的定位和html中的top不一致</h3>
                  <p>2018年1月23日 - 上面的是通过y控制的&lt;text&gt;,下面是top控制的&lt;p&gt;. 通过观察好像前者是根据底部来定位, 后者是根据顶部, 请问如何让&lt;text&gt;也根据顶部...</p>
                </Timeline.Item>
                <Timeline.Item label="2015-09-01 09:12:11">
                  <h3 className={'mb-24'}>Node.js 教程 - 基础环境搭建</h3>
                  <aside className={'f-right ml-24'}><img src={"static/images/node.jpg"} alt=""/></aside>
                  <p>Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型,使其轻量又高效。Node.js 的包管理器 npm,...</p>
                </Timeline.Item>
              </Timeline>
            </article>
          </Layout.Content>
        </Layout>
        <Layout.Footer className={'hor-center'}>
          Chiang © {(new Date()).getFullYear()}
        </Layout.Footer>
      </Layout>
    )
  }
}
export default Home;