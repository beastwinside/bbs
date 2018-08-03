// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,Icon,Select} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
const Option=Select.Option;
const { TextArea } = Input;

class Fatie extends Component{


	render(){
		return(
			<div >
			<form  action="http://172.20.10.10:8089" method="get" style={{width:'80%',position:'absolute',marginLeft:'10%'}}>
			<h1 style={{textAlign:'center'}}>     发布新帖子</h1>
			<p><Icon type="appstore" style={{ fontSize: 26, color: '#08c'}} />
			<span style={{color:'black'}}>    发布专栏:</span> 
			<Select defaultValue="生活" style={{ width: 120 }}>
			<Option value="工作">工作</Option>
			<Option value="情感">情感</Option>
			<Option value="银亿" disabled>银亿</Option>
			<Option value="文化">文化</Option>
			<Option value="子公司">子公司</Option>
			<Option value="广西">广西</Option>
			<Option value="交友">交友</Option>
			<Option value="健康">健康</Option>
			</Select></p>
			<p><Icon type="user-add" style={{ fontSize: 26, color: '#08c'}} />发帖人: <Input defaultValue='肖文府' disabled='ture'/></p>
			<p><Icon type="calendar" style={{ fontSize: 26, color: '#08c'}} /> 发帖日期: <Input defaultValue='2018/8/3' disabled='ture'/></p>
			输入正文
			<TextArea rows={6} />
			<Button type="primary"   onClick={this.login} style={{marginLeft:'7%',marginTop:'5%',width:'43%'}}>
			<Icon type="check" style={{ fontSize: 26, color: '#FFFFFF'}} /></Button>
			<Link to='/register'>
			<Button  style={{positionLeft:'absolute',marginLeft:'5%',width:'43%'}}>
			<Icon type="save" style={{ fontSize: 26, color: '#08c'}} /></Button>
			</Link>
			</form>
			</div>

			);
	}


}

export default Fatie