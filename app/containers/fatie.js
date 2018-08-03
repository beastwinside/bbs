// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'



class Loginform extends Component{
	constructor(props){
		super(props);
		this.state={
			account:'',
			password:''

		};

	}



	componentDidMount(){



	}

	render(){
		return(
			<div style={{position:'absolute',left:'0',right:'0',margin:'auto',width:'60%',height:'80%',marginTop:'50px',borderStyle:'solid'}}>
			<form  action="http://172.20.10.10:8089" method="get" style={{width:'100%',height:'100%'}}>
			<h1 style={{textAlign:'center',marginTop:'10%'}}>银亿集团企业微信BBS系统</h1>
			<Link to='/menu'>
			<Button type="primary"    style={{width:'80%',height:'40PX',marginLeft:'10%',marginTop:'80%'}}>登录</Button>
			</Link>
			</form>
			</div>

			);
	}


}

export default Loginform