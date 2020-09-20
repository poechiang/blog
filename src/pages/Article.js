import React,{Component} from "react";
import {Layout,message} from "antd";

import { connect } from "react-redux";
import fetch from '../lib/Fetch';
import TagList from "../components/TagList";

const {editormd} = window

class Acticle extends Component{
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount() {
    const {aid} = this.props.match.params||{};
    if(aid){
        fetch(`/blog/article/${aid}`)
        .then((resp)=>{
            if(resp.code!==200||!resp.data){
                return message.error(resp.msg)
            }
            this.setState({article:resp.data})
            editormd.markdownToHTML("art-content", {
                markdown        : resp.data.content ,//+ "\r\n" + $("#append-test").text(),
                htmlDecode      : "style,script,iframe",  // you can filter tags decode
                tocm            : true,    // Using [TOCM]
                tocContainer    : "#toc-container",
                emoji           : true,
                taskList        : true,
                tex             : true,  // 默认不解析
                flowChart       : true,  // 默认不解析
                sequenceDiagram : true,  // 默认不解析
            });

        })
    }

  }
  render(){
    const {article:art={}} = this.state;
    return (
      <Layout id={'art-view'} className={'page-wrap'}>
        <Layout>
            <Layout.Sider className={'left'} >
                <header>目录大纲</header>
                <nav id="toc-container"></nav>
            </Layout.Sider>
            <Layout>
                <Layout.Header >
                    <h1 className={'art-title'}>{art.title}</h1>
                    <aside><TagList tags = {!art.tags?[]:art.tags.split(',')}/></aside>
                    <aside className={'flex-row flex-line-center mv-16'}>
                        <a href={`/catagory/${art.catagory_id}`}>《{art.catagory}》</a>
                        <span className={'flex-1'}/>
                        <span>
                            <span className={'fs-12'}>作者发表于：{art.insert_date}</span><br/>
                            {art.update_date?<span className={'fs-12'}>编辑于：{art.update_date}</span>:null}
                        </span>
                    </aside>
                </Layout.Header>
                <Layout.Content id="art-content" className={'editormd-preview-theme-dark'}>
                </Layout.Content>
            </Layout>
            <Layout.Sider className={'right'} >
                <header>其他专题</header>
                <nav ></nav>
            </Layout.Sider>
        </Layout>
        <Layout.Footer className={'hor-center'}>
          Chiang © {(new Date()).getFullYear()}
        </Layout.Footer>
      </Layout>
    )
  }
}
export default connect()(Acticle);