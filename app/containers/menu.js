// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'


class Menu extends Component{
	


	render(){


		const data = [
  {title: '娱乐',
    num:'总共13篇帖子'
  },{title: '工作',
    num:'总共18篇帖子'},
  {title: '生活',
    num:'总共17篇帖子'
  },{title: '情感',
    num:'总共16篇帖子'
  }, {title: '时尚',
    num:'总共10篇帖子'
  },{title: '银亿',
    num:'总共2篇帖子'
  },{title: '集团',
    num:'总共8篇帖子'
  },{title: '交友',
    num:'总共13篇帖子'
  },
];

		return(
			<div >
			<div style={{width:'100%',height:'10%',backgroundColor:"#509BB2",textAlign:'center',fontSize:'26px',color:'#FFFFFF'}}>  论坛模块</div>
			<List
    grid={{ gutter: 16, column: 4 }}
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <Card hoverable='true'
        title={item.title}  >{item.num}</Card>
      </List.Item>
    )}
  />
			</div>

			);
	}


}

export default Menu