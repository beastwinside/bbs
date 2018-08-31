// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon,Menu} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import Background from './img/bg.jpg'
import styles from '../styles/animate.css';
var devheight=document.documentElement.clientHeight;
var devwidth=document.documentElement.clientWidth;

class Login extends Component{

  constructor(props){
    super(props);
    this.state={
      name:"",
      avatar:"",
      userid:"",

    };

    this.entermypage=this.entermypage.bind(this);
    this.savecode=this.savecode.bind(this);
    this.getuser=this.getuser.bind(this);

  }

  getuser(code){



    let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=getUser&code='+code+'&time=';
    fetch(URL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }).then(response => response.text())
    .then(dataa => {
      var jsonobj=JSON.parse(dataa);
     
      this.props.history.push({pathname:'./mypage',state:{userid:jsonobj.data[0].USERNAME,id:jsonobj.data[0].ID,avatar:jsonobj.data[0].USERAVATAR,name:jsonobj.data[0].USERNAME}});

    });


  }

  entermypage(){
    this.props.history.push({pathname:'./mypost',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});
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

  this.savecode();


}


render(){
  return(
   <div  style={{height:devheight,width:devwidth,overflow:'hidden'}} className={styles.animated+' '+styles.fadeOut}>
   <img src={Background} alt="上海鲜花港 - 郁金香"  style={{width:'100%',height:'100%'}}/>

   </div>


   );
}


}

export default Login




