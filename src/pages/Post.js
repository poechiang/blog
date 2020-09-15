import React,{Component} from "react";
import {Layout,Input, Button,AutoComplete,message,Modal,Form} from "antd";

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
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCatagoryChange = this.handleCatagoryChange.bind(this);
    this.handleTagsChange = this.handleTagsChange.bind(this);
  }
  componentDidMount() {
    
    this.editor = editormd('editor',{
      theme:'dark',
      editorTheme:'monokai',
      previewTheme:'dark',
      height:'auto',
      minHeight:100,
      markdown: this.props.post.content||'',
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
    let {title,catagory,tags} = this.props.post;
    let content = this.editor.getMarkdown();


    fetch('http://localhost:10000/blog/article/post',{
      headers:{
         'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        title,content,catagory,tags
      }),
      method:'POST',
      mode:'cors'
    })
    .then((resp)=>(resp.json()))
    .then((resp)=>{
        if(resp.code!==200){
            return message('笔记保存失败','error')
        }
        this.props.history.replace('/')
    });
  }

  handleTitleChange(e){
    this.props.updatePostData({title:e.target.value})
  }
  handleCatagoryChange(value){
    this.props.updatePostData({catagory:value})
  }
  handleTagsChange(e){
    this.props.updatePostData({tags:e.value})
  }
  render(){

    let {title,catagory,tags,content} = this.props.post



    console.log(title,catagory,tags,content,this.props)

    return (
      <Layout id={'post'} className={'page-wrap p-24'}>
        <Layout.Header className={"flex-row flex-line-center"}>
          <Input className={'art-title mr-24 flex-1'} placeholder={"新文章标题……"} value={title} onChange={this.handleTitleChange}/>


          
          <Button type={'primary'} onClick={this.doPost} ><PostIcon className={'icon mr-5'}/> 发布</Button>
        </Layout.Header>
        <Layout.Content>
          <div id="editor"></div>
          <Modal
            title="保存笔记"
            centered
            visible={true}
            onOk={() => this.setModal2Visible(false)}
            onCancel={() => this.setModal2Visible(false)}
          >
            <Form layout={'vertical'}
                  >
                    <Form.Item label="主题 / 分组" name="layout">
                      <AutoComplete
                          options={[{value:'ThinkPHP'},{value:'NodeJS'},{value:'Python'},{value:'MySQL'},{value:'Go'}]}
                          placeholder='选择已有专题或输入新专题名称……'
                          filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          }
                          value={catagory}
                          onChange={this.handleCatagoryChange}
                        />
                    </Form.Item>
                    <Form.Item label="标签">
                      <TagsInput tags={tags} onChange={this.handleTagsChange}/>
                      
                    </Form.Item>
                  </Form>
          </Modal>
        </Layout.Content>
        <Layout.Footer className={'hor-center'}>
          Chiang © {(new Date()).getFullYear()}
        </Layout.Footer>
      </Layout>
    )
  }
}
export default connect(({post})=>({post}),(dispatch)=>({
  updatePostData:(args)=>{
    dispatch({type:actions.UPDATE_POST_DATA,...args})
  }
}))(Post);