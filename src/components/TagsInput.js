import React from "react";
import {Tag, Input} from "antd";


class TagsInput  extends React.Component{
  constructor(props) {
    super(props);
    this.state = {tags:props.tags||[],value:props.value,limit:props.limit||0};
    this.handleInput = this.handleInput.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.removeTag = this.removeTag.bind(this)
  }
  handleInput(e){
    
    this.setState({value:e.target.value})
  }
  handleKeyDown(e){
    switch (e.key) {
      case 'Enter':
        let value = this.state.value.trim()
        if(!value){
          return;
        }
        let tags
        if (e.shiftKey){
          tags = [...this.state.tags,value]
        }
        else{
          tags = [...this.state.tags,...value.split(' ')]
        }
        this.setState({tags,value:''})
        this.props.onChange({value:tags})
        break;
      case 'Backspace':
        if (!this.state.vaue) {
          let tags = this.state.tags;
          tags.pop();
          this.setState({tags})
          this.props.onChange({value:tags})
        }
        break;
      default:
    }
    console.log(e.shiftKey,e.key)
  }
  removeTag(tag,index){
    let tags = this.state.tags.filter((item,i)=>(i!==index))
    this.setState({tags})
    this.props.onChange({value:tags})
  }
  render(){
    const {className,style} = this.props;
    const {tags,value,limit} = this.state;
    return (
      <span className={['tags-wrap','flex-row','flex-line-center',...(className||'').split(' ')].join(' ')} style={style}>
        {
          (tags||[]).map((item,index)=>(<Tag closable key={item} onClose={this.removeTag.bind(this,item,index)}>{item}</Tag>))
        }
        {limit>0 && tags.length>=limit?null:<Input className={'flex-1'} value={value} onInput={this.handleInput} onKeyDown={this.handleKeyDown} style={{minWidth:50,backgroundColor:'transparent'}}/>}
      </span>
    )
  }
}
export default TagsInput;
