package cn.edu.nju.MessageTest;

import static cn.edu.nju.MessageTest.InitialMessage.createMessage;
import static cn.edu.nju.MessageTest.InitialMessage.deleteMessage;
import static cn.edu.nju.MessageTest.InitialMessage.getMessageId;
import static cn.edu.nju.MessageTest.InitialMessage.host;
import static org.junit.Assert.assertTrue;

import java.util.Date;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;

/**
 * Created by chezeyu 2016年7月22日
 */
public class GetMessageByReceiverId {

	/**
	 * GetMessageByReceiverId：通过接受者Id得到消息ID
	 */
	
	@BeforeClass
    public static void initial(){
        /**初始化测试用户*/
        assertTrue(InitialUser.createUser(99999,"chezeyu","chezeyu19951010","18651615329",0));
        assertTrue(InitialUser.createUser(99998,"test1","test119951010","18651615328",1));
        assertTrue(InitialUser.createUser(99997,"test2","test219951010","18651615327",2));
        assertTrue(InitialUser.createUser(99996,"test3","test319951010","18651615326",3));
    }
    @AfterClass
    public static void delete(){
        /**删除测试用户*/
        assertTrue(InitialUser.deleteUser(99999));
        assertTrue(InitialUser.deleteUser(99998));
        assertTrue(InitialUser.deleteUser(99997));
        assertTrue(InitialUser.deleteUser(99996));
    }
    
    @Test
    public void test01(){
    
    	/**创建消息列表*/
    	Date date = new Date();
        assertTrue(createMessage(0,99999,99998,date,"testContent1"));
        assertTrue(createMessage(1,99997,99996,date,"testContent2"));
        
        long id = 99996;
        String url = "http://"+host+"/messages/byReceiverId/"+id;
        String returnInformation = HttpRequest.sendGet(url,"");
        
        assertTrue(returnInformation.contains("testContent2"));
        
        /**删除创建的消息*/
        assertTrue(deleteMessage(getMessageId(99998)));
        assertTrue(deleteMessage(getMessageId(99996)));
    }
}