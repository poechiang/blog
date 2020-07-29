import React,{Component} from "react";
import {Layout,Input, Button,AutoComplete} from "antd";

import {PostIcon,ListIcon} from "../asserts/RC";
import TagsInput from "../components/TagsInput";

const {editormd} = window
let timer;
class Post extends Component{
  constructor(props) {
    super(props);
    this.state = {contentShown:true}
    this.togglePreview = this.togglePreview.bind(this)
    this.toggleContentShown = this.toggleContentShown.bind(this)
  }
  componentDidMount() {
    this.editor = editormd('editor',{
      theme:'dark',
      editorTheme:'monokai',
      previewTheme:'dark',
      height:1600,
      markdown: '',
      path:'/static/lib/',
      codeFold:true,
      lineClamp:false,
      placeholder:'新文章内容……',
      toolbarIcons:[ "undo","redo","|","bold","del","italic","quote","ucwords","uppercase", "lowercase", "|","h1","h2","h3","h4","h5","h6","|","list-ul","list-ol","hr","image",
        "|","datetime","|","clear","||","watch","preview","fullscreen"],
      // onload               : () => {
      //   if(this.props.previewing) {
      //     this.editor.previewing()
      //   }
      // },
  
      imageUpload : true,
      imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
      imageUploadURL : "/file/uploadImage",
      onchange             : () => {
        if(timer){
          return
        }
        timer = setTimeout(()=>{
          
          this.editor.config({
  
            tocContainer : "#toc-container",
            tocDropdown   : false
          })
        },3000)
      },
    })
    
  }
  
  toggleContentShown(){
    this.setState({contentShown:!!!this.state.contentShown})
    setTimeout(()=>{
      this.editor.resize();
    },200)
  }
  togglePreview() {
      this.editor.previewing()
  }
  render(){
    const {contentShown} = this.state;
    return (
      <Layout id={'post'} className={'page-wrap p-24'}>
        <Layout.Header className={"flex-row flex-line-center"}>
          <Button className={'mr-24'} type={contentShown?'primary':'link'} onClick={this.toggleContentShown}><ListIcon/></Button>
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
          <Button className={'mr-24'} type={'link'} onClick={this.togglePreview}>预览</Button>
          <Button type={'primary'} onClick={this.togglePreview}><PostIcon className={'icon mr-5'}/> 发布</Button>
        </Layout.Header>
        <Layout.Content>
          <Layout>
            {contentShown?<Layout.Sider className={'m-24'}>
              <h1>目录</h1>
              <div id={'toc-container'}></div>
            </Layout.Sider>:null}
            <Layout.Content>
              <div id="editor"></div>
            </Layout.Content>
            {contentShown?<Layout.Sider className={'m-24'} />:null}
          </Layout>
        </Layout.Content>
        <Layout.Footer className={'hor-center'}>
          Chiang © {(new Date()).getFullYear()}
        </Layout.Footer>
      </Layout>
    )
  }
}
export default Post;