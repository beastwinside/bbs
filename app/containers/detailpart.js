// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'


class Detailpart extends Component{
  constructor(props){
    super(props);
    this.state={
      userid:"7777777",
      data:[],
      part:'',
      name:"",
      avatar:"",
      partid:""
    };

    this.entermenu=this.entermenu.bind(this);
    this.entermypage=this.entermypage.bind(this);
    this.ccccc=this.ccccc.bind(this);
    this.start=this.start.bind(this);

  }


  start(partid){

    let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=Menu&me=getDetailpart&blockid='+partid;
    fetch(URL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.text())
    .then(dataa => {
      var jsonobj=JSON.parse(dataa);
      
      this.setState({
        data:jsonobj.data,
        userid:this.props.location.state.userid,
        part:this.props.location.state.part,
        name:this.props.location.state.name,
        avatar:this.props.location.state.avatar,
        partid:this.props.location.state.partid
      });


      
      
    });
  }

  ccccc(e){
    const dddid=e.target.getAttribute("data-id");
    alert(dddid);
    this.props.history.push({pathname:'./contentdetail',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,relateid:dddid}});

  }

  entermypage(){
    this.props.history.push({pathname:'./mypage',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});
  }

  entermenu(){
    this.props.history.push({pathname:'./menu',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});


  }

  componentDidMount()
  {

    this.start(this.props.location.state.partid);

  }


  render(){


    return(
     <div >

     {this.state.userid} 
     {this.state.part}
     <div onClick={this.entermenu}
     style={{backgroundColor:'#127D51',width:'80px',height:'40px',position:'fixed',top:'20%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>

     <Icon type="home" style={{ fontSize: 35, color: '#FFFFFF'}}  />

     </div>
     <div style={{backgroundColor:'#127D51',width:'40px',height:'40px',position:'fixed',bottom:'20px',
     left:'0',right:'0',margin:'auto',zIndex:'3',right:'0',borderRadius:'20px',textAlign:'center'}}>
     <Link to="./fatie">
     <Icon type="plus" style={{ fontSize: 38, color: '#FFFFFF'}}  />
     </Link>
     </div>
     <List
     size="large"
     header={<div style={{width:'100%',height:'10%',backgroundColor:"#224B1B",textAlign:'center',fontSize:'26px',color:'#FFFFFF'}}> <Icon type="star-o" style={{ fontSize: 26, color: '#08c'}} /> 
     当前登陆者id：{this.state.userid} {this.state.part}版块</div>}
     footer={<div style={{width:'100%',height:'10%',backgroundColor:"#224B1B",textAlign:'center',fontSize:'26px',color:'#FFFFFF'}}> 底部</div>}
     bordered
     dataSource={this.state.data}
     renderItem={item => (<List.Item>

      <div >
      <div >
      <div style={{width:'100%',height:'10%',position: 'relative',fontSize:'18px'}} >
      <Icon type="message" style={{ fontSize: 18, color: '#020101' }} /> <span style={{fontSize:18,color:'black'}}> {item.POSTCONTENT}</span>
      </div>
      <div style={{fontSize:'12px',cokor:'#000000',fontWeight:'bolder'}}>  <Icon type="github" style={{ fontSize: 16, color: '#0C0101' }} /> {item.CREATEID}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Icon type="calendar" style={{ fontSize: 16, color: '#010000' }} /> <span style={{}}>发帖时间：{item.POSTTIME}</span><br/>
      <Icon type="calendar" style={{ fontSize: 16, color: '#010000' }} /> <span style={{zIndex:'3'}} onClick={this.ccccc} data-id={item.RELATEID}>最后回复时间：{item.POSTTIME}</span><br/>
      <span style={{color:'black'}}>最后回复人：{item.CREATEID}}</span>
      </div></div></div>
      </List.Item>)}
     />
     </div>

     );
  }


}

export default Detailpart