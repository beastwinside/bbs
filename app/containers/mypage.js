// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon,Menu} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import Background from './img/logo.png';

const data = [
'浏览历史',
'我的帖子',
'关注',
'粉丝.',
'关注的模块.',
];
const testpng="http://cmc.chinayinyi.com:8018/yywms/mobile/bbs/src/img/logo.png";

class Mypage extends Component{

  constructor(props){
    super(props);
    this.state={
      name:"",
      avatar:"",
      userid:"",

    };

    this.start=this.start.bind(this);
    this.entermenu=this.entermenu.bind(this);
    this.enterfatie=this.enterfatie.bind(this);
    this.savecode=this.savecode.bind(this);
    this.getuser=this.getuser.bind(this);

  }

  getuser(code){

    let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=Menu&me=getUser&code='+code;
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
    alert(this.state.userid);
    this.props.history.push({pathname:'./menu',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});

  }

  enterfatie(){
    alert(this.state.userid);
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
   <div  >

   <div style={{height:"100px",width:'100%',backgroundColor:'#ECE4EE'}}>
   <img  style={{height:'80px',width:'80px',borderRadius:'40px',overflow:'hidden',margin:'5px'}} src={this.state.avatar}  />
   <span style={{fontSize:'25px'}}> {this.state.name}</span>
   <span  style={{paddingLeft:'70px'}}> 举头望明月，低头思故乡</span> 
   <span  style={{paddingLeft:'70px',color:'#156685',fontWeight:'bold'}}> 点击编辑个人资料</span>
   </div>

   <List
   header={<div>

    <Button type="primary"  onClick={this.entermenu}   style={{marginLeft:'2%',marginTop:'5%',width:'28%'}}>
    <Icon type="appstore" style={{ fontSize: 26, color: '#FFFFFF'}} /></Button>


    <Button  onClick={this.enterfatie}  style={{positionLeft:'absolute',marginLeft:'5%',width:'28%'}}>
    <Icon type="plus" style={{ fontSize: 26, color: '#08c'}} /></Button>



    <Button  style={{positionLeft:'absolute',marginLeft:'5%',width:'28%'}} onClick={this.savecode}>
    <Icon type="bell" style={{ fontSize: 26, color: '#08c'}} /></Button>

    </div>}
    footer={<div >底部占位</div>}
    bordered
    dataSource={data}
    renderItem={item => (<List.Item><Icon type="question-circle" style={{ fontSize: 20, color: '#310765'}}  /> &nbsp; &nbsp;{item}</List.Item>)}
    />

    <img  style={{height:'40px',width:'50px'}} src={testpng}  />
    </div>


    );
}


}

export default Mypage




