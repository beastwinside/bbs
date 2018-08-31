// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon,Menu,Upload} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'

import styles from '../styles/animate.css';
import classnames from 'classnames'

var devheight=document.documentElement.clientHeight;
var devwidth=document.documentElement.clientWidth;



class Mypage extends Component{

  constructor(props){
    super(props);
    this.state={
      name:"",
      avatar:"",
      userid:"",
      tt1:false,
      tt2:false

    };

    this.start=this.start.bind(this);
    this.entermenu=this.entermenu.bind(this);
    this.enterfatie=this.enterfatie.bind(this);
    this.savecode=this.savecode.bind(this);
    this.getuser=this.getuser.bind(this);
    this.entermypost=this.entermypost.bind(this);

  }

    entermypost(){
      
    this.props.history.push({pathname:'./mypost',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,id:this.props.location.state.id}});

  }



  getuser(code){

    let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=getUser&code='+code;
    fetch(URL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.text())
    .then(dataa => {
      var jsonobj=JSON.parse(dataa);

      this.setState({
        name:jsonobj.data[0].USERNAME,
        avatar:jsonobj.data[0].USERAVATAR,
        userid:jsonobj.data[0].ID,      
      });
    });


  }


  entermenu(){

    this.props.history.push({pathname:'./menu',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});

  }

  enterfatie(){

    this.props.history.push({pathname:'./fatie',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});

  }


  start(){

    let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=Menu&me=getHrm';
    fetch(URL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }

    }).then(response => response.text())
    .then(dataa => {
      var jsonobj=JSON.parse(dataa);
      this.setState({
        name:jsonobj.name,
        avatar:jsonobj.avatar,
        userid:jsonobj.userid,

      });

    });

  }

  savecode(){
    var searchstr=( window.location.href);
    var str1=searchstr.split('&');
    var str2=str1[0].split('=');
    var  codestr=str2[1];


    if(this.state.code!==codestr)
    {  
     this.getuser(codestr);

   }

   else ;

 }

 componentDidMount(){

  this.setState({      
    userid:this.props.location.state.userid,
    name:this.props.location.state.name,
    avatar:this.props.location.state.avatar});




}


render(){
  return(
   <div className={styles.animated+' '+styles.pulse}  >


   <div style={{height:"150px",width:devwidth,position:'relative'}}>
   <img   style={{height:'80px',width:'80px',borderRadius:'40px',overflow:'hidden',position:'absolute',top:
   '100px',right:'0px',left:'0px',margin:'auto',borderColor:'#0088cc',borderStyle:'solid',boxShadow:'0px 0px 2px #75A9C3'}} src={this.state.avatar}  />
   </div>
   

 <div style={{top:"100px",height:"30px",width:devwidth,position:'relative'}}>
   <h1 style={{textAlign:'center',color:"#585656"}}> 欢迎来到聊天吧~  </h1>
   </div>

   <div style={{marginTop:'200px'}}>
   <div  style={{}}>
   <Button     style={{marginLeft:'6%',width:'24%',height:'20px',borderColor:'white',fontSize:'12px'}}>
   主题 </Button>
   <Button    style={{positionLeft:'absolute',marginLeft:'6%',width:'24%',height:'20px',borderColor:'white',fontSize:'12px'}}>
   发帖 </Button>
   <Button  style={{positionLeft:'absolute',marginLeft:'6%',width:'24%',height:'20px',borderColor:'white',fontSize:'12px'}} >
   我的</Button>
   </div>

   <Button  onClick={this.entermenu}   style={{marginLeft:'6%',marginTop:'1%',width:'24%',height:'30px'}}>
   <Icon type="appstore" style={{ fontSize: 26, color: '#0088cc'}} /></Button>
   <Button onClick={this.enterfatie}  style={{positionLeft:'absolute',marginLeft:'6%',width:'24%',height:'30px'}}>
   <Icon type="file-text" style={{ fontSize: 26, color: '#0088cc'}} /></Button>
   <Button style={{positionLeft:'absolute',marginLeft:'6%',width:'24%',height:'30px'}} onClick={this.entermypost}>
   <Icon type="user" style={{ fontSize: 26, color: '#0088cc'}} /></Button>
   </div>




   </div>


   );
}


}

export default Mypage






