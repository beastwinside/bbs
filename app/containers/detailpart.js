// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import styles from '../styles/animate.css';

 var width= document.documentElement.clientWidth; 
  var height=document.documentElement.clientHeight*0.9+'px';

class Detailpart extends Component{
  constructor(props){
    super(props);
    this.state={
      userid:"7777777",
      data:[],
      part:'',
      name:"",
      avatar:"",
      blockid:"",
      id:""
    };

    this.entermenu=this.entermenu.bind(this);
    this.entermypage=this.entermypage.bind(this);
    this.ccccc=this.ccccc.bind(this);
    this.start=this.start.bind(this);
    this.enterfatie=this.enterfatie.bind(this);
  }

    enterfatie(){
    this.props.history.push({pathname:'./fatie',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,id:this.props.location.state.id}});
  }



  start(partid){

    let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=getDetailpart&blockid='+partid;
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
        blockid:this.props.location.state.partid
      });


      
      
    });
  }

  ccccc(e){
    const dddid=e.target.getAttribute("data-ddd");
    this.props.history.push({pathname:'./contentdetail',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,relateid:dddid,
      blockid:this.props.location.state.blockid,blockname:this.props.location.state.blockname,id:this.props.location.state.id}});

  }

  entermypage(){
    this.props.history.push({pathname:'./mypost',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,id:this.props.location.state.id}});
  }

  entermenu(){
    this.props.history.push({pathname:'./menu',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.namem,id:this.props.location.state.id}});


  }

  componentDidMount()
  {

    this.start(this.props.location.state.blockid);




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
        <div style={{backgroundColor:'#0088cc',width:'60px',height:'30px',position:'fixed',top:'26%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
      <Icon type="left-square" style={{ fontSize: 27, color: '#FFFFFF'}}  onClick={this.entermenu} />
      </div>


     <div className={styles.animated+' '+styles.zoomIn}>
     <List
     size="large"
     header={<div style={{width:'100%',height:'10%',backgroundColor:"#0088cc",textAlign:'center',fontSize:'26px',color:'#FFFFFF'}}>
     {this.props.location.state.blockname}版块</div>}
     bordered
     dataSource={this.state.data}
     renderItem={item => (<List.Item>
      <div >
      <div >
      <div style={{width:'100%',height:'10%',position: 'relative',fontSize:'18px'}}onClick={this.ccccc} data-ddd={item.RELATEID} >
       <span style={{fontSize:24,color:'#368697'}} onClick={this.ccccc} data-ddd={item.RELATEID}> 主题：{item.POSTCONTENT}</span>
      </div>
      <div style={{fontSize:'12px',cokor:'#000000',fontWeight:'bolder'}}onClick={this.ccccc} data-ddd={item.RELATEID}>  
      <Icon type="github" style={{ fontSize: 16, color: '#0C0101' }} onClick={this.ccccc} data-ddd={item.RELATEID}/> {item.USERNAME}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Icon type="calendar" style={{ fontSize: 16, color: '#010000' }} onClick={this.ccccc} data-ddd={item.RELATEID}/> <span onClick={this.ccccc} data-ddd={item.RELATEID} >发帖时间：{item.COMPARETIME}</span><br/>
      <Icon type="calendar" style={{ fontSize: 16, color: '#010000' }} onClick={this.ccccc} data-ddd={item.RELATEID}/> <span style={{zIndex:'3'}} onClick={this.ccccc} data-ddd={item.RELATEID} >最后回复时间：{item.COMPARETIME}</span><br/>
      <span style={{color:'black'}} onClick={this.ccccc} data-ddd={item.RELATEID}>最后回复人：{item.USERNAME}</span>
      </div></div></div>
      </List.Item>)}
     />
     </div>
     </div>

     );
  }


}

export default Detailpart