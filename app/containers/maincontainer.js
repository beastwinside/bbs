import React,{Component} from 'react'
import styles from '../styles/maincontainer.css';//导入
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import { Carousel } from 'antd';
import { Collapse } from 'antd';
import { Tabs } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import { List, Card,Table} from 'antd';
import Mainpage from './mainpage.js'
import Fatie from './fatie.js'
import Menu from './menu.js'
import Detailpart from './detailpart.js'
import Mypage from './mypage.js'
import Contentdetail from './contentdetail.js'
import Bell from './bell.js'

class Maincontainer  extends Component{
	render(){
		return(

			<div style={{position:'absolute',Left:'0',Right:'0',margin:'auto',width:'100%',height:'100%'}}>
			<HashRouter history={hashHistory}>
			<div>
			<Route  exact path="/" component={Mypage} />
			<Route  path="/fatie" component={Fatie} />
			<Route  path="/menu" component={Menu} />
			<Route  path="/detailpart" component={Detailpart} />
			<Route  path="/mypage" component={Mypage} />
			<Route  path="/contentdetail" component={Contentdetail} />
			<Route  path="/Bell" component={Bell} />
			</div>
			</HashRouter>
			</div>
			);
	}

}

export default Maincontainer