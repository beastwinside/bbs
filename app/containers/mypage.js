// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon,Menu} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'

const data = [
'浏览历史',
'我的帖子',
'关注',
'粉丝.',
'关注的模块.',
];


class Mypage extends Component{
	


	render(){
		return(
			<div >
      <div style={{height:"100px",width:'100%',backgroundColor:'#D8FDFE'}}>
      <Icon type="github" style={{ fontSize: 50, color: '#310765',marginTop:'10px'}}  />
      <span style={{color:'#0A0C02',fontSize:'25px'}}> 肖文府</span><br/>
      <span  style={{paddingLeft:'70px'}}> 举头望明月，低头思故乡</span><br/>
      <span  style={{paddingLeft:'70px',color:'#156685',fontWeight:'bold'}}> 点击编辑个人资料</span>
      </div>

      <List
      header={<div>
        <Link to="./menu">
        <Button type="primary"   onClick={this.login} style={{marginLeft:'2%',marginTop:'5%',width:'20%'}}>
        <Icon type="appstore" style={{ fontSize: 26, color: '#FFFFFF'}} /></Button>
        </Link>
        <Link to='/Fatie'>
        <Button  style={{positionLeft:'absolute',marginLeft:'5%',width:'20%'}}>
        <Icon type="plus" style={{ fontSize: 26, color: '#08c'}} /></Button>
        </Link>
        <Link to="./menu">
        <Button type="primary"   onClick={this.login} style={{marginLeft:'2%',marginTop:'5%',width:'20%'}}>
        <Icon type="home" style={{ fontSize: 26, color: '#FFFFFF'}} /></Button>
        </Link>
        <Link to='/Bell'>
        <Button  style={{positionLeft:'absolute',marginLeft:'5%',width:'20%'}}>
        <Icon type="bell" style={{ fontSize: 26, color: '#08c'}} /></Button>
        </Link>
        </div>}
        footer={<div >底部占位</div>}
        bordered
        dataSource={data}
        renderItem={item => (<List.Item><Icon type="question-circle" style={{ fontSize: 20, color: '#310765'}}  /> &nbsp; &nbsp;{item}</List.Item>)}
        />
        
        <img  style={{height:'200px',width:'400px'}}  />
        </div>
        

        );
	}


}

export default Mypage