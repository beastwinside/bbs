// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List,Icon,Select} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'

const { TextArea } = Input;

const data = [
{
	index: '1楼',
	name:'肖文府',
	content:'今天天气不错啊'

},
{
	index: '2楼',
	name:'肖文府2号',
	content:'是的啊',


},
{
	index: '3楼',
	name:'肖文府',
	content:'出去哪里玩了么？'
},
{
	index: '4楼',
	name:'肖文府3号',
	content:'哦哦哦哦哦'
},
{
	index: '5楼',
	name:'肖文府8号',
	content:'啊啊啊啊啊啊'
},
{
	index: '6楼',
	name:'肖文府。。。',
	content:'嗷嗷嗷嗷'
},
{
	index: '7楼',
	name:'肖文府x',
	content:'休息休息'
},
{
	index: '8楼',
	name:'撒大声地',
	content:'今天天气不错啊'
},
];


class Contentdetail extends Component{
	constructor(props){
		super(props);
		this.state={
			userid:"7777777",
			name:"",
			avatar:""
		};
		this.entermenu=this.entermenu.bind(this);

	}

	entermenu(){
		this.props.history.push({pathname:'./menu',state:{userid:this.state.userid}});


	}

	componentDidMount(){



	}

	render(){
		return(
			<div >
			
			<div style={{backgroundColor:'#127D51',width:'80px',height:'40px',position:'fixed',top:'20%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
			
			<Icon type="home" style={{ fontSize: 35, color: '#FFFFFF'}} onClick={this.entermenu} />
			
			</div>
			<div style={{zIndex:'3',width:'100%',height:'7%',backgroundColor:"#509BB2",textAlign:'center',fontSize:'26px',color:'#FFFFFF',position:'fixed'}}> 
			帖子主题</div>
			<div style={{width:'100%',height:'30px',backgroundColor:'#509BB2'}}></div>
			<List
			itemLayout="horizontal"
			dataSource={data}
			renderItem={item => (
				<List.Item>
				<div >
				<div style={{fontSize:'12px',cokor:'#000000',fontWeight:'bolder'}}>  &nbsp; &nbsp;{item.name}</div>
				<div style={{textIndent:'15px',fontSize:'10px',color:'grey'}}>{item.index}</div>
				<div style={{width:'100%',height:'10%',position: 'relative',marginLeft:'20px',fontSize:'18px'}}>
				{item.content}
				</div>
				</div>
				<br/>



				</List.Item>
				)}
			/>
			<form  action="http://172.20.10.10:8089" method="get" style={{width:'90%',position:'absolute',marginLeft:'5%'}}>
			<h1 style={{textAlign:'center',color:'white'}}>    发表回复</h1>
			<span style={{color:'white'}}>输入正文</span>
			<TextArea rows={6} />
			<Button type="primary"   onClick={this.login} style={{marginLeft:'2%',marginTop:'5%',width:'46%'}}>
			<Icon type="check" style={{ fontSize: 26, color: '#FFFFFF'}} /></Button>
			<Link to='/register'>
			<Button  style={{positionLeft:'absolute',marginLeft:'4%',width:'46%'}}>
			<Icon type="save" style={{ fontSize: 26, color: '#08c'}} /></Button>
			</Link>
			</form>
			<div style={{width:'100%',height:'280PX',backgroundColor:'#127D51'}}></div>
			</div>

			);
	}


}

export default Contentdetail