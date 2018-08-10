// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'

import {var1} from './lib.js'


class Menu extends Component{

	constructor(props){
		super(props);
		this.state={
			userid:"7777777",
			data:[],
			name:"",
			avatar:""
		};
		this.start=this.start.bind(this);
		this.handleclick=this.handleclick.bind(this);
		this.enterfatie=this.enterfatie.bind(this);
		this.entermypage=this.entermypage.bind(this);
	}

	entermypage(){
		this.props.history.push({pathname:'./mypage',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});
	}

	enterfatie(){
		this.props.history.push({pathname:'./fatie',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});
	}

	handleclick(e){
		const indexx=e.target.getAttribute("data-dd");
		this.props.history.push({pathname:'./detailpart',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,part:indexx}});
	}

	start(){

		let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=Menu&me=getmenu';
		fetch(URL, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}

		}).then(response => response.text())
		.then(dataa => {
			var jsonobj=JSON.parse(dataa).data;
			var menuarr=[];
			this.setState({
				data:jsonobj,
			});

		});

	}

	componentDidMount()
	{

		this.start();
		this.setState({      
			userid:this.props.location.state.userid,
			name:this.props.location.state.name,
			avatar:this.props.location.state.avatar});

	}


	render(){
		

		return(
			<div >
			<div style={{backgroundColor:'#127D51',width:'80px',height:'40px',position:'fixed',top:'20%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
			<Icon type="user" style={{ fontSize: 35, color: '#FFFFFF'}}  onClick={this.entermypage} />
			</div>
			<div style={{width:'100%',height:'10%',backgroundColor:"#509BB2",textAlign:'center',fontSize:'26px',color:'#FFFFFF'}}>  论坛模块</div>

			<div style={{backgroundColor:'#127D51',width:'40px',height:'40px',position:'fixed',bottom:'20px',
			left:'0',right:'0',margin:'auto',zIndex:'3',right:'0',borderRadius:'20px',textAlign:'center'}}>

			<Icon type="plus" style={{ fontSize: 38, color: '#FFFFFF'}} onClick={this.enterfatie} />

			</div>
			<List
			grid={{ gutter: 16, column: 3}}
			dataSource={this.state.data}
			renderItem={item => (
				<List.Item>

				<Card hoverable='true' 
				title={<div  onClick={this.handleclick} data-dd={item.BLOCKNAME} ><Icon type='heart-o' style={{ fontSize: 20, color: '#08c'}} />
				{item.BLOCKNAME}	&nbsp;
				共{item.POSTNUM}篇</div>}  >

				</Card>

				</List.Item>
				)}
			/>
			</div>

			);
	}


}

export default Menu