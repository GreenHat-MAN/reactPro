// 富文本编辑框
import React, { Component, FC, useEffect, useState } from 'react'
import {Editor} from "react-draft-wysiwyg"   // Editor
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html"  // draft ===> html;
import htmlToDraft from "html-to-draftjs" //  html ===>  draft
import {EditorState,ContentState} from "draft-js"
import "./index.scss"


const RichEditor:FC<any> = ({content,getContent})=>{
  const [editorState,setEditorState] = useState<any>()
  const [contentState,setContentState] = useState<any>()

  const onEditorStateChange=(editorState:any)=>{  // 修改编辑框的 state
    setEditorState(editorState)
  }
  const onContentStateChange=(contentState:any)=>{ // 修改编辑框的 内容
    setContentState(contentState)
  }

  useEffect(()=>{
    if(!content){ // 父改子
      return ;
    }

    // 修改  修改数据
    const html = content;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks); // 创建内容从 htmlToDraft
      const editorState = EditorState.createWithContent(contentState);// 创建编辑器状态
      console.log(editorState)
      setEditorState(editorState)
    }
  },[])
  return (
    <div>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName" // DIY样式
        wrapperClassName="wrapperClassName" // DIY样式
        editorClassName="editorClassName" // DIY样式
        onEditorStateChange={onEditorStateChange}
        onContentStateChange={onContentStateChange}
        onBlur={
          ()=>{
            // console.log(this.state.contentState)
            getContent(draftToHtml(contentState))  // 子改父
          }
        }
      />
    </div>
  )
}
export default RichEditor;
