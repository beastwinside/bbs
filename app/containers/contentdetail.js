// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,List,Icon,Select} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import styles from '../styles/animate.css';
import EXIF from 'exif-js';


const { TextArea } = Input;
var xhr;
class Contentdetail extends Component{
	constructor(props){
		super(props);
		this.state={
			userid:"7777777",
			name:"",
			avatar:"",
			relateid:"",
			data:"",
			blockid:"",
			content:"",
			uploadedFile: "",
			uploadedFileGetUrl: "",
			id:""

		};
		this.entermenu=this.entermenu.bind(this);
		this.entermypage=this.entermypage.bind(this);
		this.start=this.start.bind(this);
		this.addreply=this.addreply.bind(this);
		this.update=this.update.bind(this);
		this.enterfatie=this.enterfatie.bind(this);
		this.clear=this.clear.bind(this);
		this.photoCompress=this.photoCompress.bind(this); 
		this.changeFile=this.changeFile.bind(this);
		this.convertBase64UrlToBlob =this.convertBase64UrlToBlob.bind(this);
		this.UploadFile=this.UploadFile.bind(this);
		this.uploadComplete =this.uploadComplete.bind(this);
		this.uploadFailed=this.uploadFailed.bind(this);
		this.cancleUploadFile =this.cancleUploadFile.bind(this);
		this.progressFunction=this.progressFunction.bind(this);
	}

	changeFile () {
		var userid=this.state.userid;
		var blockid=this.state.blockid;
		var content=this.state.content;
		var relateid=this.state.relateid;
		var that=this;
        // 选择的文件对象(file里只包含图片的体积，不包含图片的尺寸)
        let files = document.getElementById("file").files; 
        
       	 // 选择的文件是图片
       	 if(files[0].type.indexOf("image") === 0) {
            // 压缩图片需要的一些元素和对象
            var reader = new FileReader(),
                //创建一个img对象
                img = new Image();

                reader.readAsDataURL(files[0]);
            // 文件base64化，以便获知图片原始尺寸
            reader.onload = function(e) {
            	img.src = e.target.result;

            };
            // base64地址图片加载完毕后执行
            img.onload = function () {
               var Orientation= EXIF.getTag(img, 'Orientation');
                alert(Orientation);
                // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');

                // 图片原始尺寸
                var originWidth = this.width;
                var originHeight = this.height;

                // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
                var maxWidth = 1200,
                maxHeight = 1200;
                // 目标尺寸
                var targetWidth = originWidth,
                targetHeight = originHeight;
                // 图片尺寸超过300x300的限制
                if(originWidth > maxWidth || originHeight > maxHeight) {
                	if(originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                    	targetHeight = maxHeight;
                    	targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩



                context.drawImage(img, 0, 0, targetWidth, targetHeight);
                /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

                //压缩后的图片转base64 url
                /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
                * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
                var newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式
                canvas.toBlob((blob)=>{

                	var myDate = new Date();
	var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var  month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
	 var day= myDate.getDate();        //获取当前日(1-31)
	var time=myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
	var hour=myDate.getHours();       //获取当前小时数(0-23)
	var minute=myDate.getMinutes();     //获取当前分钟数(0-59)
	var second=myDate.getSeconds();     //获取当前秒数(0-59)
	var  timestr=year+'年'+month+'月'+day+'日'+hour+'时'+second+'分'+minute+'秒';



	var url = 'http://cmc.chinayinyi.com:8018/yywms/UploadServlet?type=add&userid='+userid+'&blockid='+blockid+'&content='+content+'&time='+
	time+'&timestr='+timestr+'&relateid='+relateid;

	var form = new FormData();
                    form.append("file", blob, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
                    xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
                    xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
                      xhr.onload = that.uploadComplete; //请求完成
                xhr.onerror =  function(){alert('上传失败')}; //请求失败
                xhr.upload.onprogress = function(evt){
                	var progressBar = document.getElementById("progressBar");
                	var percentageDiv = document.getElementById("percentage");
            // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
            if (evt.lengthComputable) {//
            	progressBar.max = evt.total;
            	progressBar.value = evt.loaded;
            	percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
            }   
                };//【上传进度调用方法实现】
                xhr.send(form);
            }, 'image/jpeg', 0.92)


                

                //也可以把压缩后的图片转blob格式用于上传

            };
        } else {
        	alert('请上传图片格式');
        }



    }



    photoCompress(file,w,objDiv){
    	var ready=new FileReader();
    	/*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    	ready.readAsDataURL(file);
    	ready.onload=function(e){
    		var re=ready.result;
    		canvasDataURL(re,w,objDiv)

    	}
    }
    canvasDataURL(path, obj, callback){
    	var img = new Image();
    	img.src = path;
    	alert('3333');
    	img.onload = function(){
    		var that = this;
                // 默认按比例压缩
                var w = that.width,
                h = that.height,
                scale = w / h;
                w = obj.width || w;
                h = obj.height || (w / scale);
                var quality = 0.7;  // 默认图片质量为0.7
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                // 创建属性节点
                var anw = document.createAttribute("width");
                anw.nodeValue = w;
                var anh = document.createAttribute("height");
                anh.nodeValue = h;
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);
                ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                	quality = obj.quality;
                }
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                callback(base64);
            }
        }
        /**
         * 将以base64的图片url数据转换为Blob
         * @param urlData
         *            用url方式表示的base64图片数据
         */
         convertBase64UrlToBlob(urlData){
         	var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
         	bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
         	while(n--){
         		u8arr[n] = bstr.charCodeAt(n);
         	}
         	return new Blob([u8arr], {type:mime});
         }



         UploadFile() {
         	if(typeof(document.getElementById("file").files[0])!=='undefined')
         	{ 
         		var userid=this.state.userid;
         		var blockid=this.state.blockid;
         		var content=this.state.content;
         		var relateid=this.state.relateid;
        //上传文件方法
            let fileObj = document.getElementById("file").files[0]; // js 获取文件对象
            var form = new FormData(); // FormData 对象

            if(fileObj.size/1024 > 200) { //大于1M，进行压缩上传
            	this.changeFile();
            }else{ //小于等于1M 原图上传
            	var myDate = new Date();
	var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var  month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
	 var day= myDate.getDate();        //获取当前日(1-31)
	var time=myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
	var hour=myDate.getHours();       //获取当前小时数(0-23)
	var minute=myDate.getMinutes();     //获取当前分钟数(0-59)
	var second=myDate.getSeconds();     //获取当前秒数(0-59)
	var  timestr=year+'年'+month+'月'+day+'日'+hour+'时'+second+'分'+minute+'秒';

	var url = 'http://cmc.chinayinyi.com:8018/yywms/UploadServlet?type=add&userid='+userid+'&blockid='+blockid+'&content='+content+'&time='+
	time+'&timestr='+timestr+'&relateid='+relateid;
                form.append("file", fileObj); // 文件对象
                xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
                xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
                xhr.onload = this.uploadComplete; //请求完成
                xhr.onerror =  this.uploadFailed; //请求失败
                xhr.upload.onprogress = this.progressFunction;//【上传进度调用方法实现】
                xhr.send(form); //开始上传，发送form数据
            }
        }
        else {this.addreply();}
    }

        //上传成功响应
        uploadComplete(evt) {
        	var that=this;
            //服务断接收完文件返回的结果
            this.start(that.props.location.state.relateid);
            alert("上传成功！");

        }
        //上传失败
        uploadFailed(evt) {
        	alert("上传失败！");
        }
        //取消上传
        cancleUploadFile(){
        	xhr.abort();
        }

        //上传进度实现方法，上传过程中会频繁调用该方法
        progressFunction(evt) {
        	var progressBar = document.getElementById("progressBar");
        	var percentageDiv = document.getElementById("percentage");
            // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
            if (evt.lengthComputable) {//
            	progressBar.max = evt.total;
            	progressBar.value = evt.loaded;
            	percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
            }
            else;
           
        }



        clear(){
        	alert(this.refs.myInput.refs.input.value)
        }

        addreply(){


        	var myDate = new Date();
	var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var  month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
	 var day= myDate.getDate();        //获取当前日(1-31)
	var time=myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
	var hour=myDate.getHours();       //获取当前小时数(0-23)
	var minute=myDate.getMinutes();     //获取当前分钟数(0-59)
	var second=myDate.getSeconds();     //获取当前秒数(0-59)
	var  timestr=year+'年'+month+'月'+day+'日'+hour+'时'+second+'分'+minute+'秒';
	var userid=this.state.userid;
	var blockid=this.state.blockid;
	var content=this.state.content;
	var relateid=this.state.relateid;
	var URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=AddReply&userid='+userid+'&blockid='+blockid+'&content='+content+'&time='+
	time+'&timestr='+timestr+'&relateid='+relateid;
	fetch(URL, {
		method: 'get',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		}
	}).then(response => response.text())
	.then(dataa => {
		alert("回复成功");
		this.start(this.props.location.state.relateid);
	});
}

start(relateid){

	let URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=getContentdetail&relateid='+relateid;
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
			name:this.props.location.state.name,
			avatar:this.props.location.state.avatar,
			relateid:this.props.location.state.relateid
		});   
	});
}
update(e){
	this.setState({
		content:e.target.value});}

	entermenu(){
		this.props.history.push({pathname:'./detailpart',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,
			blockid:this.props.location.state.blockid,blockname:this.props.location.state.blockname,id:this.props.location.state.id}});
	}
	entermypage(){
		this.props.history.push({pathname:'./mypost',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,id:this.props.location.state.id}});
	}
	enterfatie(){
		this.props.history.push({pathname:'./fatie',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name,id:this.props.location.state.id}});
	}

	componentDidMount(){
		this.start(this.props.location.state.relateid);
		this.setState({      
			userid:this.props.location.state.userid,
			name:this.props.location.state.name,
			avatar:this.props.location.state.avatar,
			blockid:this.props.location.state.blockid,
			relateid:this.props.location.state.relateid});

	}

	render(){

		
		return(
			<div >
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

			<div  className={styles.animated+' '+styles.pulse}>
			<div style={{zIndex:'3',width:'100%',height:'35px',backgroundColor:"#509BB2",textAlign:'center',fontSize:'20px',color:'#FFFFFF',position:'relative'}}> 
			帖子主题</div>		
			<List
			itemLayout="horizontal"
			dataSource={this.state.data}
			renderItem={item => (
				<List.Item>
				<div  style={{width:'90%',borderWidth:'0',left:'0px',right:'0px',position:'relative',
				margin:'auto'}}>
				<img   style={{height:'40px',width:'40px',borderRadius:'20px',overflow:'hidden',Left:'5px'}} src={item.USERAVATAR}  />
				<div style={{fontSize:'12px',color:'#ACA7A7',fontWeight:'bolder'}}>  &nbsp; &nbsp;{item.USERNAME}</div>
				<div style={{textIndent:'15px',fontSize:'10px',color:'grey'}}>第{item.FLOOR}楼</div>
				<div style={{width:'100%',height:'10%',position: 'relative',marginLeft:'20px',fontSize:'23px',color:"black"}}>{item.POSTCONTENT}</div>
				<img  style={{maxHeight:'200px',maxWidth:'90%',borderStyle:"none",borderWidth:'0',display:item.DISPLAY,left:'0px',right:'0px',position:'relative',
				margin:'auto'}}  src={item.IMGURL}  />
				</div>
				<br/>

				</List.Item>
				)}
			/>
			<form  action="http://172.20.10.10:8089" method="get" style={{width:'90%',position:'absolute',marginLeft:'5%'}} >
			<h1 style={{textAlign:'center',color:'0088cc',borderStyle:'solid',borderTopWidth:'2px'}}>发表回复</h1>
			<span style={{color:'0088cc'}}>回复</span>
			<TextArea rows={6}  onBlur={this.update}  />
			<div>
			<br /><br />
			<div style={{width:"100%",height:"30px",position:'relative'}}>
			<input type="file" id="file" name="myfile" accept="image/x-png, image/jpg, image/jpeg, image/gif" multiple="multiple"
			style={{opacity:"0",position:"absolute",zIndex:'3',width:'40%',height:'100%',left:'6%'}}/>
			<Button     style={{position:"absolute",width:'40%',height:'100%',zIndex:'1',left:'6%'}}> 
			<Icon type="save" style={{ fontSize: 26, color: '#08c'}} /></Button>

			<Button type="primary"   onClick={this.UploadFile}  style={{right:'6%',width:'40%',position:'absolute'}}> 
			<Icon type="check" style={{ fontSize: 26, color: '#FFFFFF'}}  /></Button>
				<progress id="progressBar" value="0" max="100" style={{width: "100%",zIndex:'30000',marginTop:'40px'}}></progress>
		
		</div>	</div>
			</form>
			<div style={{width:'100%',height:'280PX',backgroundColor:'#ffffff'}}></div>
        

			</div>
			</div>);
	}
}

export default Contentdetail