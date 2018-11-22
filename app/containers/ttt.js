package mobile;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openxmlformats.schemas.drawingml.x2006.main.STStyleMatrixColumnIndex;

import com.sun.org.apache.bcel.internal.generic.StackInstruction;

import JavaSource.ipf.core.IPF;
import JavaSource.ipf.database.DBConnectionBaseEnc;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import WeChat.WeChatBBS;
import mobile.ReplyVo;

public class BBS {
	private static DBConnectionBaseEnc conn = new DBConnectionBaseEnc();
	
	public static void getList(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf = new IPF(req,res);
		Page page = new Page();
		page.setPageSize(ipf.getParameterNull("pageSize"));
		page.setCurrentPage(ipf.getParameterNull("pageNo"));
		String sql = " select a.id,a.menuname,a.menutype,a.costprice,"
				+ "case when b.imagefileid is null "
				+ " then '/mobilemode/images/mec/img-space1_wev8.png' "
				+ " else "
				+ "'/weaver/weaver.file.FileDownload?fileid=' || b.imagefileid "
				+ " end imgurl "
				+ " from uf_menu a,docimagefile b "
				+ " where decode(instr(a.menuimg, ','),0,a.menuimg,substr(a.menuimg, 0, instr(a.menuimg, ',') - 1)) = b.docid(+) ";
		String json = page.getArrayByJSON(sql);
		System.out.println(json);
		ipf.print(json);
	}
	
	
	public static void getmenu(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf = new IPF(req,res);
		Page page = new Page();
		String userid=ipf.getParameterNull("userid");
		String sql = "select a.blockname, a.postnum, a.blockid,a.icon,NVL(b.counts,0) counts from MOBILE_BBS_BLOCK a ,("+
				"select  blockid,count(blockid) counts from MOBILE_BBS_POST where floor='1' group by blockid)b "+
				"where a.blockid=b.blockid(+) ";
		String json = page.getArrayByJSON(sql);
		System.out.println(json);
		ipf.print(json);
	}
	

	public static void getDetailpart(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf = new IPF(req,res);
		Page page = new Page();
		String blockid=ipf.getParameterNull("blockid");
		String sql =" select a.postcontent,a.comparetime,a.relateid,b.username from MOBILE_BBS_POST "
				+"a,MOBILE_BBS_USER b where a.floor='1' and a.blockid='"+blockid+"' and a.createid=b.id";
		String json =page.getArrayByJSON(sql);
		System.out.println(json);
		ipf.print(json);
	}
	
	public static void getContentdetail(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf = new IPF(req,res);
		Page page = new Page();
		String relateid=ipf.getParameterNull("relateid");
		String sql = "select a.*,b.username,b.useravatar from MOBILE_BBS_POST a,MOBILE_BBS_USER b where a.relateid='"+relateid+"'and a.createid=b.id ORDER BY floor";
		String json = page.getArrayByJSON(sql); 
		System.out.println(json);
		ipf.print(json);
	}
	
			public static void getMypost(HttpServletRequest req,
					HttpServletResponse res, HashMap map) throws Exception{
				IPF ipf = new IPF(req,res);
				Page page = new Page();
				
				String id=ipf.getParameterNull("id");
				System.out.println(id);
				String sql = "select a.*,b.username from MOBILE_BBS_POST a,MOBILE_BBS_USER b  where  a.createid='"+id+"'and floor=1 and a.createid=b.id ORDER BY POSTTIME DESC";
				String json = page.getArrayByJSON(sql); 
				System.out.println(json);
				ipf.print(json);
			}

	public static void SaveReply(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf = new IPF(req,res);
		Page page = new Page();
		String userid=req.getParameter("userid");
		String blockname=req.getParameter("blockname");
		String postcontent=req.getParameter("content");
		String posttime=req.getParameter("time");
		String comparetime=req.getParameter("timestr");
		
		String sql ="insert into MOBILE_BBS_POST(POSTID,CREATEID,POSTTYPE,RELATEID,BLOCKID,POSTCONTENT,FLOOR,DISPLAY,POSTTIME"
				+",COMPARETIME)values("
				+"	(SELECT (MAX(POSTID)+1) FROM MOBILE_BBS_POST),(SELECT ID FROM MOBILE_BBS_USER WHERE USERNAME='"+userid+"'),'main'"
				+",(SELECT (MAX(RELATEID)+1) FROM MOBILE_BBS_POST),(select blockid from MOBILE_BBS_BLOCK where blockname="
			+"'"+blockname+"'),'"+postcontent+"','1','NONE','"+posttime+"','"+comparetime+"')";
			System.out.println(sql);
		conn.insertDB(sql);

		ipf.print("恭喜，新主题已发送");
	}
	
	public static void AddReply(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf = new IPF(req,res);
		Page page = new Page();
		String userid=req.getParameter("userid");
		String blockid=req.getParameter("blockid");
		String postcontent=req.getParameter("content");
		String posttime=req.getParameter("time");
		String comparetime=req.getParameter("timestr");
		String relateid=req.getParameter("relateid");
		
		String sql ="insert into MOBILE_BBS_POST(POSTID,CREATEID,POSTTYPE,RELATEID,BLOCKID,POSTCONTENT,FLOOR,DISPLAY,POSTTIME"
				+",COMPARETIME)values("
				+"	(SELECT (MAX(POSTID)+1) FROM MOBILE_BBS_POST),(SELECT ID FROM MOBILE_BBS_USER WHERE USERNAME='"+userid+"'),'reply'"
				+",'"+relateid+"',('"+blockid+"'),'"+postcontent+"',(SELECT (MAX(floor)+1) FROM MOBILE_BBS_POST   where relateid='"+relateid+"'),'NONE','"+posttime+"','"+comparetime+"')";
			System.out.println(sql);
		conn.insertDB(sql);

		ipf.print("回复成功");
	}
	

	
	public static void getUser(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf=new IPF(req,res);
		Page page=new Page();
		WeChatBBS WeChatBBS=new WeChatBBS();
		String code=ipf.getParameterNull("code");
		String useridstr=WeChatBBS.getUserid(code, "sadasdas");
		String sql = "select id,username,useravatar,introduce from MOBILE_BBS_USER t where userid='"+useridstr+"'";
		String json = page.getArrayByJSON(sql);
		System.out.println(json);
		ipf.print(json);
	}
	
	public static void getTikuList(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf=new IPF(req,res);
		Page page=new Page();
		String time=req.getParameter("time");
		String sql = "select * from UF_WJDT where JSRQ>'"+time+"'  order by modedatacreatedate desc";
		String json = page.getArrayByJSON(sql);
		System.out.println(sql);
		ipf.print(json);
	}
	
	public static void getTiku(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf=new IPF(req,res);
		Page page=new Page();
		String id=req.getParameter("mainid");
		
		String sql = "select t.*, t.rowid from UF_WJDT_DT1 t where t.mainid='"+id+"'";
		String json = page.getArrayByJSON(sql);
		System.out.println(json);
		ipf.print(json);
	}
	
	
	public static void savedtresult(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf=new IPF(req,res);
		Page page=new Page();
		String creator=req.getParameter("creator");
		String wrongnumdanxuan=ipf.getParameterNull("wrongnumdanxuan");
		String wrongnumduoxuan=ipf.getParameterNull("wrongnumduoxuan");
		String wrongnumpanduan=ipf.getParameterNull("wrongnumpanduan");
		String rightnum=ipf.getParameterNull("rightnum");
		String score=ipf.getParameterNull("score");
		String time=req.getParameter("time");
		String questionid=req.getParameter("questionid");
		System.out.println(creator);
		System.out.println(wrongnumdanxuan);
		System.out.println(wrongnumduoxuan);
		System.out.println(wrongnumpanduan);
		System.out.println(rightnum);
		System.out.println(time);
		System.out.println(score);
		System.out.println(questionid);
		String querystr="select * from MOBILE_ZSJD_RESULT where username='"+creator+"'and questionid='"+questionid+"'";
		String insertstr="insert into MOBILE_ZSJD_RESULT (USERNAME,QUESTIONID,RIGHT,WRONGDANXUAN,WRONGDUOXUAN,WRONGPANDUAN,SCORE,TIME) values('"+creator+"','"+questionid+"','"+rightnum+"','"+wrongnumdanxuan+"','"+wrongnumduoxuan+"','"+wrongnumpanduan+"','"+score+"','"+time+"')";
		System.out.println(insertstr);
		conn.insertDB(insertstr);

		
	}
	
	public static void ifdt(HttpServletRequest req,
			HttpServletResponse res, HashMap map) throws Exception{
		IPF ipf=new IPF(req,res);
		Page page=new Page();
		String creator=req.getParameter("creator");
		String questionid=req.getParameter("id");
		System.out.println(creator);
		System.out.println(questionid);
		String querystr="select * from MOBILE_ZSJD_RESULT where username='"+creator+"'and questionid='"+questionid+"'";
		String json = page.getArrayByJSON(querystr);
		System.out.println(querystr);
		System.out.println(json);
		ipf.print(json);

		
	}
	
	
	
	
	
}
