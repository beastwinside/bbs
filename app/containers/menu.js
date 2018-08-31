// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import styles from '../styles/animate.css';
import {var1} from './lib.js'



class Menu extends Component{

	constructor(props){
		super(props);
		this.state={
			userid:"7777777",
			data:[],
			name:"",
			avatar:"",
			blockname:"",
			id:""
			
		};
		this.start=this.start.bind(this);
		this.handleclick=this.handleclick.bind(this);
		this.enterfatie=this.enterfatie.bind(this);
		this.entermypage=this.entermypage.bind(this);
	}

	entermypage(){
		this.props.history.push({pathname:'./mypost',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,id:this.props.location.state.id}});
	}

	enterfatie(){
		this.props.history.push({pathname:'./fatie',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,id:this.props.location.state.id}});
	}

	handleclick(e){
		const blockname=e.target.getAttribute("data-dd");
		const blockid=e.target.getAttribute("data-id");


		this.props.history.push({pathname:'./detailpart',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,blockid:blockid,blockname:blockname,id:this.props.location.state.id}});
	}

	start(){

		let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=getmenu';
		fetch(URL, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}

		}).then(response => response.text())
		.then(dataa => {
			var jsonobj=JSON.parse(dataa).data;
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
			avatar:this.props.location.state.avatar,
			blockid:this.props.location.state.blockid,
			id:this.props.location.state.id});


	}


	render(){
		

		return(		
			<div>

			<div style={{backgroundColor:'#0088cc',width:'60px',height:'30px',position:'fixed',top:'5%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
			<Icon type="user" style={{ fontSize: 27, color: '#FFFFFF'}}  onClick={this.entermypage} />
			</div>
			<div style={{backgroundColor:'#8EC1DA',width:'60px',height:'30px',position:'fixed',top:'12%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
			<Icon type="appstore" style={{ fontSize: 27, color: '#FFFFFF'}}   />
			</div>
			<div style={{backgroundColor:'#0088cc',width:'60px',height:'30px',position:'fixed',top:'19%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
			<Icon type="file-text" style={{ fontSize: 27, color: '#FFFFFF'}}  onClick={this.enterfatie} />
			</div>
			
			
			<div className={styles.animated+' '+styles.slideInUp} >
			<div style={{width:'100%',height:'10%',textAlign:'center',fontSize:'26px',color:'#0088cc',marginTop:'20px',marginBottom:'20px'}}>  论坛模块</div>
			<List
			grid={{ gutter: 16, column: 2}}
			dataSource={this.state.data}
			renderItem={item => (
				<List.Item  >


				<Card hoverable='true'  
				title={<div  onClick={this.handleclick} data-dd={item.BLOCKNAME} data-id={item.BLOCKID} >
				<Icon type={item.ICON} style={{ fontSize: 25, color: '#08c'}} onClick={this.handleclick} data-dd={item.BLOCKNAME} data-id={item.BLOCKID}/>{item.BLOCKNAME}
				</div>}  >
				<div  >
				<span  onClick={this.handleclick} data-dd={item.BLOCKNAME} data-id={item.BLOCKID}>{item.BLOCKNAME}	&nbsp;
				共{item.COUNTS}篇帖子</span>
				</div>
				</Card>

				</List.Item>
				)}
			/>
			</div>
			</div>
			);
	}


}

export default Menu






































