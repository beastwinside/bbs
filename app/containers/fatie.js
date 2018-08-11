// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,Icon,Select} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
const Option=Select.Option;
const { TextArea } = Input;

class Fatie extends Component{


	constructor(props){
		super(props);
		this.state={
			userid:"666",
			selectvalue:"",
			content:"",
			name:"",
			avatar:""
		};

		this.selecthandlechange=this.selecthandlechange.bind(this);
		this.submit=this.submit.bind(this);
		this.update=this.update.bind(this);
		this.entermenu=this.entermenu.bind(this);
		this.entermypage=this.entermypage.bind(this);


	}

	entermypage(){
		this.props.history.push({pathname:'./mypage',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});
	}


	entermenu(){
		alert(this.state.userid);
		this.props.history.push({pathname:'./menu',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});

	}
	update(e){

		alert(e.target.value);
		this.setState({
			content:e.target.value
		});

	}

	selecthandlechange(e){

		this.setState({
			selectvalue:e
		});
		alert(e);

	}

	submit(){
		alert(JSON.stringify(this.state));
	}



	componentDidMount(){
		alert(this.props.location.state.userid);
		  this.setState({
      userid:this.props.location.state.userid,
      name:this.props.location.state.name,
      avatar:this.props.location.state.avatar

    });
	}


	render(){
		return(
			<div >
			<form  action="http://172.20.10.10:8089" method="get" style={{width:'80%',position:'absolute',marginLeft:'10%'}}>
			<h1 style={{textAlign:'center'}}>    发布新帖子</h1>
			<p><Icon type="appstore" style={{ fontSize: 26, color: '#08c'}} />
			<span style={{color:'black'}}>    发布专栏:</span> 
			<Select defaultValue="生活" style={{ width: 120 }} onChange={this.selecthandlechange}>
			<Option value="工作">工作</Option>
			<Option value="情感">情感</Option>
			<Option value="银亿" disabled>银亿</Option>
			<Option value="文化">文化</Option>
			<Option value="子公司">子公司</Option>
			<Option value="广西">广西</Option>
			<Option value="交友">交友</Option>
			<Option value="健康">健康</Option>
			</Select></p>
			<p><Icon type="user-add" style={{ fontSize: 23, color: '#08c'}} />发帖人: <Input defaultValue={this.props.location.state.userid} disabled='ture'/></p>
			<p><Icon type="calendar" style={{ fontSize: 23, color: '#08c'}} /> 发帖日期: <Input defaultValue='2018/8/3' disabled='ture'/></p>
			<p><Icon type="message" style={{ fontSize: 23, color: '#08c'}} />输入正文:</p>
			<TextArea rows={6}  onBlur={this.update}/>
			<Button type="primary"   onClick={this.submit} style={{marginLeft:'7%',marginTop:'5%',width:'43%'}}>
			<Icon type="check" style={{ fontSize: 26, color: '#FFFFFF'}} /></Button>
			<Link to='/menu'>
			<Button  style={{positionLeft:'absolute',marginLeft:'5%',width:'43%'}}>
			<Icon type="home" style={{ fontSize: 26, color: '#08c'}} /></Button>
			</Link>
			
			<Button type="primary"   onClick={this.entermenu} style={{marginLeft:'7%',marginTop:'5%',width:'43%'}}>
			<Icon type="appstore" style={{ fontSize: 26, color: '#FFFFFF'}} /></Button>

		
			<Button  style={{positionLeft:'absolute',marginLeft:'5%',width:'43%'}} onClick={this.entermypage}>
			<Icon type="user" style={{ fontSize: 26, color: '#08c'}} /></Button>
		
			</form>
			</div>

			);
	}


}

export default Fatie