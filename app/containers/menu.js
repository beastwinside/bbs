// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'

import {var1} from './lib.js'


class Menu extends Component{




	render(){
		const data = [
  {title: '娱乐',
    num:'总共13篇帖子',
    icon:'heart'
  },{title: '工作',
    num:'总共18篇帖子',
    icon:'heart-o'
},{title: '生活',
    num:'总共17篇帖子',
    icon:'eye'
  },{title: '情感',
    num:'总共16篇帖子',
    icon:'eye-o'
  }, {title: '时尚',
    num:'总共10篇帖子',
    icon:'camera'

  },{title: '银亿',
    num:'总共2篇帖子',
    icon:'pay-circle'
  },{title: '集团',
    num:'总共8篇帖子',
    icon:'bulb'
  },{title: '交友',
    num:'总共13篇帖子',
    icon:'like'
  },
];

		return(
			<div >
			 <div style={{backgroundColor:'#127D51',width:'80px',height:'40px',position:'fixed',top:'20%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
      <Link to="./Mypage">
      <Icon type="user" style={{ fontSize: 35, color: '#FFFFFF'}}  />
      </Link>
      </div>
			<div style={{width:'100%',height:'10%',backgroundColor:"#509BB2",textAlign:'center',fontSize:'26px',color:'#FFFFFF'}}>  论坛模块</div>

			<div style={{backgroundColor:'#127D51',width:'40px',height:'40px',position:'fixed',bottom:'20px',
			left:'0',right:'0',margin:'auto',zIndex:'3',right:'0',borderRadius:'20px',textAlign:'center'}}>
			<Link to="./fatie">
			<Icon type="plus" style={{ fontSize: 38, color: '#FFFFFF'}}  />
			</Link>
			</div>
			<List
    grid={{ gutter: 16, column: 3}}
    dataSource={data}
    renderItem={item => (
      <List.Item>
      <Link to='/detailpart'>
        <Card hoverable='true'
	    title={<div><Icon type={item.icon} style={{ fontSize: 20, color: '#08c'}} />{item.title}</div>}  >

        {item.num}</Card>
        </Link>
      </List.Item>
    )}
  />
			</div>

			);
	}


}

export default Menu