// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'


class Detailpart extends Component{
	


	render(){
    const data = [
    {title: '今天胖了啊啊啊啊啊啊啊啊啊啊啊啊啊啊。。',
    name:'肖文府1',time:'2017/8/1'
  },{title: '今天瘦了..',
  name:'肖文府2',time:'2017/8/2'
},{title: '.今天有腹肌了',
name:'肖文府3',time:'2017/7/9'
},{title: '啊,今天在散步',
name:'肖文府4',time:'2017/6/7'
}, {title: '明天去游泳',
name:'肖文府5',time:'2017/4/7'
},{title: '早上不吃饭。。。',
name:'肖文府6',time:'2017/5/8'
},{title: '晚上练瑜伽。。',
name:'肖文府10',time:'2017/8/1'
},{title: '交友',
name:'肖文府7',time:''
},{title: 'skr，skr',
name:'肖文府8',
},{title: '交友',
name:'肖文府9',
},{title: '集团',
name:'肖文府11',
},{title: '交友',
name:'肖文府',
},
];


return(
 <div >
 <div style={{backgroundColor:'#127D51',width:'80px',height:'40px',position:'fixed',top:'20%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
      <Link to="./menu">
      <Icon type="home" style={{ fontSize: 35, color: '#FFFFFF'}}  />
      </Link>
      </div>
 <div style={{backgroundColor:'#127D51',width:'40px',height:'40px',position:'fixed',bottom:'20px',
      left:'0',right:'0',margin:'auto',zIndex:'3',right:'0',borderRadius:'20px',textAlign:'center'}}>
      <Link to="./fatie">
      <Icon type="plus" style={{ fontSize: 38, color: '#FFFFFF'}}  />
      </Link>
      </div>
 <List
 size="large"
 header={<div style={{width:'100%',height:'10%',backgroundColor:"#224B1B",textAlign:'center',fontSize:'26px',color:'#FFFFFF'}}> <Icon type="star-o" style={{ fontSize: 26, color: '#08c'}} /> 娱乐版块</div>}
 footer={<div style={{width:'100%',height:'10%',backgroundColor:"#224B1B",textAlign:'center',fontSize:'26px',color:'#FFFFFF'}}> 底部</div>}
 bordered
 dataSource={data}
 renderItem={item => (<List.Item>
   <Link to='/contentdetail'>
   <div>






   <div >

   <div style={{width:'100%',height:'10%',position: 'relative',fontSize:'18px'}}>
   <Icon type="message" style={{ fontSize: 18, color: '#020101' }} /> <span style={{fontSize:18,color:'black'}}> {item.title}</span>
   </div>
   <div style={{fontSize:'12px',cokor:'#000000',fontWeight:'bolder'}}>  <Icon type="github" style={{ fontSize: 16, color: '#0C0101' }} /> {item.name}
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <Icon type="calendar" style={{ fontSize: 16, color: '#010000' }} /> <span style={{}}>发帖时间：{item.time}</span><br/>
   <Icon type="calendar" style={{ fontSize: 16, color: '#010000' }} /> <span style={{}}>最后回复时间：{item.time}</span><br/>
   <span style={{color:'black'}}>最后回复人：‘sda’</span>
   </div>
   </div>
   </div>
   </Link>
   </List.Item>)}
 />
 </div>

 );
}


}

export default Detailpart