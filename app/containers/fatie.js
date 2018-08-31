// main.js
import React,{Component} from 'react'
import {render} from 'react-dom'
import fetch from 'isomorphic-fetch'
import { Button ,Input,Icon,Select,Upload} from 'antd';
import{Router,HashRouter,Match,Route,Link,hashHistory,IndexLink} from 'react-router-dom'
import styles from '../styles/animate.css';

const Option=Select.Option;
const { TextArea } = Input;
var xhr;

 class Fatie extends Component{


 	constructor(props){
 		super(props);
 		this.state={
 			userid:"userid test",
 			selectvalue:"娱乐",
 			content:"testetst",
 			name:"testetst",
 			avatar:"testetat",
 			uploadedFile: "",
 			uploadedFileGetUrl: "",

 		};

 		this.selecthandlechange=this.selecthandlechange.bind(this);
 		this.update=this.update.bind(this);
 		this.entermenu=this.entermenu.bind(this);
 		this.entermypage=this.entermypage.bind(this);
 		this.savereply=this.savereply.bind(this);
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
 		var selectvalue=this.state.selectvalue;
 		var content=this.state.content;
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



	var url = 'http://cmc.chinayinyi.com:8018/yywms/UploadServlet?type=new&userid='+userid+'&blockname='+selectvalue+'&content='+content+'&time='+
	time+'&timestr='+timestr;

	var form = new FormData();
                    form.append("file", blob, "file_"+Date.parse(new Date())+".jpg"); // 文件对象
                    xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
                    xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
                      xhr.onload =that.uploadComplete; //请求完成
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
            var time = document.getElementById("time");
            var nt = new Date().getTime();//获取当前时间
             var   ot = new Date().getTime(); //重新赋值时间，用于下次计算
            var pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
            var oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
            var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b

            //上传速度计算
            var speed = perload/pertime;//单位b/s
            var bspeed = speed;
            var units = 'b/s';//单位名称
            if(speed/1024>1){
            	speed = speed/1024;
            	units = 'k/s';
            }
            if(speed/1024>1){
            	speed = speed/1024;
            	units = 'M/s';
            }
            speed = speed.toFixed(1);
            //剩余时间
            var resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
            time.innerHTML = '，速度：'+speed+units+'，剩余时间：'+resttime+'s';
            if(bspeed==0) time.innerHTML = '上传已取消';
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
         	{var userid=this.state.userid;
         	var selectvalue=this.state.selectvalue;
         	var content=this.state.content;

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
	var  timestr=year+'年'+month+'月'+day+'日'+hour+'时'+minute+'分'+second+'秒';



	var url = 'http://cmc.chinayinyi.com:8018/yywms/UploadServlet?type=new&userid='+userid+'&blockname='+selectvalue+'&content='+content+'&time='+
	time+'&timestr='+timestr;
                form.append("file", fileObj); // 文件对象
                xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
                xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
                xhr.onload = this.uploadComplete; //请求完成
                xhr.onerror =  this.uploadFailed; //请求失败

                xhr.upload.onprogress = this.progressFunction;//【上传进度调用方法实现】


                xhr.send(form); //开始上传，发送form数据
            }
        }
        else {this.savereply();}
        }

        //上传成功响应
        uploadComplete(evt) {
            //服务断接收完文件返回的结果
            alert("上传成功！");
            this.props.history.push({pathname:'./menu',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});
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
            var time = document.getElementById("time");
            var nt = new Date().getTime();//获取当前时间
            var pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
            ot = new Date().getTime(); //重新赋值时间，用于下次计算
            var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
            var oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
            //上传速度计算
            var speed = perload/pertime;//单位b/s
            var bspeed = speed;
            var units = 'b/s';//单位名称
            if(speed/1024>1){
            	speed = speed/1024;
            	units = 'k/s';
            }
            if(speed/1024>1){
            	speed = speed/1024;
            	units = 'M/s';
            }
            speed = speed.toFixed(1);
            //剩余时间
            var resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
            time.innerHTML = '，速度：'+speed+units+'，剩余时间：'+resttime+'s';
            if(bspeed==0) time.innerHTML = '上传已取消';
        }




        savereply(){
        	
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
	var selectvalue=this.state.selectvalue;
	var content=this.state.content;


	var URL = 'http://cmc.chinayinyi.com:8018/yywms/Mo?cn=BBS&me=SaveReply&userid='+userid+'&blockname='+selectvalue+'&content='+content+'&time='+
	time+'&timestr='+timestr;
	fetch(URL, {
		method: 'get',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		}
	}).then(response => response.text())
	.then(dataa => {
		alert(dataa);
		this.props.history.push({pathname:'./menu',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});
	});
}


entermypage(){
	this.props.history.push({pathname:'./mypost',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});
}


entermenu(){
	this.props.history.push({pathname:'./menu',state:{userid:this.state.userid,avatar:this.state.avatar,name:this.state.name}});

}
update(e){
	this.setState({
		content:e.target.value
	})

}

selecthandlechange(e){

	this.setState({
		selectvalue:e
	});


}





componentDidMount(){
	this.setState({      
		userid:this.props.location.state.userid,
		name:this.props.location.state.name,
		avatar:this.props.location.state.avatar});

	
}


render(){


	return(
		<div>
		<div style={{backgroundColor:'#0088cc',width:'60px',height:'30px',position:'fixed',top:'5%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
		<Icon type="user" style={{ fontSize: 27, color: '#FFFFFF'}}  onClick={this.entermypage} />
		</div>
		<div style={{backgroundColor:'#0088cc',width:'60px',height:'30px',position:'fixed',top:'12%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
		<Icon type="appstore" style={{ fontSize: 27, color: '#FFFFFF'}}   onClick={this.entermenu}/>
		</div>
		<div style={{backgroundColor:'#8EC1DA',width:'60px',height:'30px',position:'fixed',top:'19%',zIndex:'3',right:'0',textIndent:'10px',borderRadius:'20px 0 0 20px'}}>
		<Icon type="file-text" style={{ fontSize: 27, color: '#FFFFFF'}}   />
		</div>

		<div className={styles.animated+' '+styles.bounceIn}>
		<form  action="http://172.20.10.10:8089" method="get" style={{width:'80%',position:'absolute',marginLeft:'10%'}}>
		<h1 style={{textAlign:'center',color:"#0088cc"}}>    新帖</h1>

		<span style={{color:'black'}}>   发布专栏:</span> &nbsp; &nbsp;&nbsp; &nbsp;
		<Select value={this.state.selectvalue} style={{ width: 120 }} onChange={this.selecthandlechange}>
		<Option value="娱乐">娱乐</Option>
		<Option value="工作">工作</Option>
		<Option value="生活">生活</Option>
		<Option value="潮流">潮流</Option>
		<Option value="情感">情感</Option>
		<Option value="科技">科技</Option>
		</Select>
		<br/>
		<p><Icon type="message" style={{ fontSize: 23, color: '#08c'}} />输入正文:</p>
		<TextArea rows={12}  onBlur={this.update}/>

		<div>
		<br /><br />
		<div style={{width:"100%",height:"30px"
		,position:'relative'}}>
		<input type="file" id="file" name="myfile" accept="image/x-png, image/jpg, image/jpeg, image/gif" multiple="multiple"
		style={{opacity:"0",position:"absolute",zIndex:'3',width:'100%',height:'100%'}}/>

		<Button    onClick={this.UploadFile}  style={{position:"absolute",width:'100%',height:'100%',left:0,zIndex:'1'}}> 
		图片上传</Button>
		</div>
		<Button type="primary"   onClick={this.UploadFile}  style={{top:'6px',width:'100%'}}> 
		发布</Button>
				<progress id="progressBar" value="0" max="100" style={{width: "100%",zIndex:'30000',marginTop:'40px'}}></progress>
		</div>
		</form>

		
		</div>


		</div>
		);}


}

export default Fatie






