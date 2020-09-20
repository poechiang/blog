import React,{Component} from "react";
import {Layout,Avatar,Descriptions,Tag,Tabs,Timeline,Button,message} from "antd";
import {LocIcon, BirthIcon,UserIcon,LinkIcon,NotifyIcon,MailIcon,TagIcon} from '../asserts/RC'
import fetch from '../lib/Fetch';
import Dashboard from "../components/Dashboard";
import TagList from "../components/TagList";


class Home extends Component{
  constructor(props){
    super(props);
    this.state={};
  }
  componentDidMount(){
    fetch('blog/article').then((resp)=>{
        if(resp.code!==200){
            return message.error(resp.msg);
        }
        this.setState({articles:resp.data})
    })

    fetch('blog/article/tags').then((resp)=>{
        if(resp.code!==200){
            return message.error(resp.msg);
        }
        this.setState({tags:resp.data})
    })

    fetch('blog/activity').then((resp)=>{
        if(resp.code!==200){
            return message.error(resp.msg);
        }
        let activities = {};
        let years = [(new Date()).getFullYear()];
        (resp.data||[]).forEach(({date,count})=>{
            const dt = new Date(Date.parse(date))
            const day = dt.toDateString();
            const year = dt.getFullYear();
            if(years.indexOf(year)<0){
                years.push(year)
            }
            if(!activities[year]){
                activities[year]={}
            }
            activities[year][day] = count
        })

        years.sort()

        years = years.reverse()
        console.log(years)
        this.setState({activities,years})
    })
  }
  render(){
    const {articles,tags,activities,years=[]} = this.state;

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
                {(tags||[]).map((item,index)=>(<Tag color="cyan" key={index}>{item.tag}</Tag>))}
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
                {years.map((year)=>(
                    <Tabs.TabPane tab={year} key={year}>
                      <Dashboard points = {activities[year]}/>
                    </Tabs.TabPane>
                ))}
              </Tabs>
            </header>
            <article className={'articles mt-48 mb-24'}>
              <div className={'flex-row flex-main-between'}><h2>Article List</h2> <Button type={'primary'} ref={'post'} href={"/post"}>发布</Button></div>
              <Timeline mode={'left'} className={'mt-24'}>
                {(articles||[]).map((art)=>(
                    <Timeline.Item label={art.insert_date} key={art.id}>
                                      <h3 className={'mb-8'}><a href={`articles/${art.id}`}>{art.title}</a></h3>
                                      <aside><TagList tags = {!art.tags?[]:art.tags.split(',')}/></aside>
                                      <p className={'mt-16'}>{art.content.length>200?(art.content.substring(0,200)+'...'):art.content}</p>
                                    </Timeline.Item>
                ))}
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