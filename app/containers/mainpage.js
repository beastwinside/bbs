// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'



class Mainpage extends Component{
		constructor(props){
		super(props);
		this.state={
			userid:"7777777"
		};

	}




	componentDidMount(){



	}

	render(){
		return(
			<div >
			<div style={{width:'100%',height:'10%',backgroundColor:"#509BB2",textAlign:'center',fontSize:'26px',color:'#FFFFFF'}}>  登录界面</div>
			<form  action="http://172.20.10.10:8089" method="get" style={{width:'100%',height:'100%'}}>
			<h1 style={{textAlign:'center',marginTop:'10%'}}>银亿集团企业微信BBS系统</h1>
			<Link to='/fatie'>
			<Button type="primary"    style={{width:'80%',height:'40PX',marginLeft:'10%',marginTop:'20%'}}>登录</Button>
			</Link>
			<Link to='/menu'>
			<Button type="primary"    style={{width:'80%',height:'40PX',marginLeft:'10%',marginTop:'8%'}}>菜单</Button>
			</Link>
			<Link to='/mypage'>
			<Button type="primary"    style={{width:'80%',height:'40PX',marginLeft:'10%',marginTop:'8%'}}>我的首页</Button>
			</Link>

			</form>
			</div>

			);
	}


}

export default Mainpage