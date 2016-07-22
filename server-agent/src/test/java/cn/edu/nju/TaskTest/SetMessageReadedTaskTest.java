package cn.edu.nju.TaskTest;

import static cn.edu.nju.MessageTest.InitialMessage.createMessage;
import static cn.edu.nju.MessageTest.InitialMessage.deleteMessage;
import static cn.edu.nju.MessageTest.InitialMessage.getMessageId;
import static cn.edu.nju.MessageTest.InitialMessage.getMessageStatus;
import static cn.edu.nju.MessageTest.InitialMessage.host;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.gson;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Date;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.servicedata.SuccessResponse;

/**
 * Created by chezeyu 2016年7月22日
 */
public class SetMessageReadedTaskTest {

/**
 * SetMessageReadedTaskTest：测试设置消息已读
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
        
        long messageId = getMessageId(99998);
        String url = "http://"+host+"/task/read/"+messageId;
        String returnInformation = HttpRequest.sendGet(url,"");
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        SuccessResponse expect = new SuccessResponse(true);
        expect.setInfo(null);
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);
        assertEquals(1,getMessageStatus(99998));
        
        /**删除创建的消息*/
        assertTrue(deleteMessage(messageId));
    }
    
    @Test
    public void test02(){
    	
    	long messageId = 99986;
        String url = "http://"+host+"/task/read/"+messageId;
        String returnInformation = HttpRequest.sendGet(url,"");
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        SuccessResponse expect = new SuccessResponse(false);
        expect.setInfo("The id do not exist.");
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);
    }
    
    
}