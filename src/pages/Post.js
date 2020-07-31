import React,{Component} from "react";
import {Layout,Input, Button,AutoComplete} from "antd";

import {PostIcon} from "../asserts/RC";
import TagsInput from "../components/TagsInput";
import { connect } from "react-redux";
import actions from "../lib/redux/Action";

const {editormd} = window

class Post extends Component{
  constructor(props) {
    super(props);
    this.state = {contentShown:true};
    this.doPost = this.doPost.bind(this);
  }
  componentDidMount() {
    
    this.editor = editormd('editor',{
      theme:'dark',
      editorTheme:'monokai',
      previewTheme:'dark',
      height:'auto',
      minHeight:100,
      markdown: '',
      path:'/static/lib/',
      codeFold:true,
      lineClamp:false,
      placeholder:'新文章内容……',
      toolbarIcons:[ "undo","redo","|","bold","del","italic","quote","ucwords","uppercase", "lowercase", "|","h1","h2","h3","h4","h5","h6","|","list-ul","list-ol","hr","image",
        "|","datetime","|","clear","||","watch","fullscreen"],
      onload               : () => {
        if(this.props.previewing) {
          this.editor.previewing()
        }
      },
  
      imageUpload : true,
      imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
      imageUploadURL : "/file/uploadImage",
    })
    
  }
  
  
  doPost(){
    let {title,catagory,keys,content} = this.state;
    title='123'
    content = 'a;lgje;rgkj;ihjr;hkajg;aserjg; kgslfijsrtg'
    catagory = '456456'
    keys = ['as','eh']
    fetch('http://localhost:10000/blog/article/post',{
      headers:{
         'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        title,content,catagory,keys
      }),
      method:'POST',
      mode:'cors'
    })
    .then((resp)=>(resp.json()))
    .then((resp)=>{
      console.log(resp)
    });
  }

  render(){
    return (
      <Layout id={'post'} className={'page-wrap p-24'}>
        <Layout.Header className={"flex-row flex-line-center"}>
          <Input className={'art-title mr-24 flex-1'} placeholder={"新文章标题……"}/>
          <AutoComplete
            className={'flex-1 mr-24'}
            options={[{value:'ThinkPHP'},{value:'NodeJS'},{value:'Python'},{value:'MySQL'},{value:'Go'}]}
            placeholder='选择已有专题或输入新专题名称……'
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
          <TagsInput className={'flex-1 mr-24'} tags={['node','java', 'python']}/>
          
          <Button type={'primary'} onClick={this.doPost} ><PostIcon className={'icon mr-5'}/> 发布</Button>
        </Layout.Header>
        <Layout.Content>
          <div id="editor">1242323agsafg</div>
        </Layout.Content>
        <Layout.Footer className={'hor-center'}>
          Chiang © {(new Date()).getFullYear()}
        </Layout.Footer>
      </Layout>
    )
  }
}
export default connect(({post})=>({post}),(dispatch)=>({
  doPost:(data)=>{
    dispatch({type:actions.POST_ARTICLE,...data})
  },
  changeTitle:(title)=>{
    dispatch({type:actions.UPDATE_POST_DATA,title})
  }
}))(Post);