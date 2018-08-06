// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List, Card,Icon,Tabs} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'

const data = [
'浏览历史',
'我的帖子',
'关注',
'粉丝.',
'关注的模块.',
];
const TabPane = Tabs.TabPane;

class Bell extends Component{
	


	render(){
   

		return(
			<div >

      <div style={{backgroundColor:'#127D51',width:'80px',height:'40px',position:'fixed',top:'20%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
      <Link to="./menu">
      <Icon type="home" style={{ fontSize: 35, color: '#FFFFFF'}}  />
      </Link>
      </div>
      <Tabs type="card"  tabBarGutter="0px">
      <TabPane tab="消息" key="1">
      <ul>
      <li><a>▶ 燃fsafffasf油附加费  </a></li>
      <li><a>▶ 运sada单背书说明</a></li>
      <li><a>▶ fsfsaffasg操作交接说明</a></li>
      <li><a>▶ gcxvs结d算汇率查询</a></li>
      <li><a>▶ sdgdsg收款sdg方式说明</a></li>
      <li><a>▶ hdsfgds扣件sdfsdf原因分析</a></li>
      </ul>
      </TabPane>
      <TabPane tab="聊天" key="2">
      <ul>
      <li><a>▶ 的sadafa费  </a></li>
      <li><a>▶ dsfgsdgdsgds明</a></li>
      <li><a>▶ sdhhshsh明</a></li>
      <li><a>▶ ssdhdsh结算汇率查询</a></li>
      <li><a>▶ dshshdsh式说明</a></li>
      <li><a>▶ 扣sdhhsh分析</a></li>
      </ul>
      </TabPane>
      <TabPane tab="通知" key="3">
      <ul>
      <li><a>▶ ewewrwe  </a></li>
      <li><a>▶ 235essdf说明</a></li>
      <li><a>▶ sdgsdg明</a></li>
      <li><a>▶ sdgsgsdgsd率查询</a></li>
      <li><a>▶ sdgsdg收款方式说明</a></li>
      <li><a>▶ sdgsg因分析</a></li>
      </ul>
      </TabPane>
      </Tabs>

      </div>

      );
	}


}

export default Bell