package cn.edu.nju.MessageTest;

import static cn.edu.nju.MessageTest.InitialMessage.createMessage;
import static cn.edu.nju.MessageTest.InitialMessage.deleteMessage;
import static cn.edu.nju.MessageTest.InitialMessage.getMessageId;
import static cn.edu.nju.MessageTest.InitialMessage.host;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.gson;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.Iterator;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.servicedata.messages.MessageInfoResponse;

/**
 * Created by chezeyu 2016年7月22日
 */
public class GetSingleMessageTest {
	/**
	 * GetSingleMessageTest：得到特定消息
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
        
        long messageId = getMessageId(99996);
        assertNotEquals(messageId,-1);
        
        String url = "http://"+host+"/messages/"+messageId;
        String returnInformation = HttpRequest.sendGet(url,"");
        MessageInfoResponse temp = gson.fromJson(returnInformation, MessageInfoResponse.class);
        returnInformation = gson.toJson(temp);
        
        MessageInfoResponse expectedInformation = new MessageInfoResponse();
        expectedInformation.setId(messageId);
        expectedInformation.setType(1);
        expectedInformation.setStatus(0);
        expectedInformation.setInfoId(99997);
        expectedInformation.setReceiverId(99996);
        expectedInformation.setTime(date);
        expectedInformation.setContent("testContent2");
        
        assertEquals(gson.toJson(expectedInformation),returnInformation);
        
        /**删除创建的消息*/
        assertTrue(deleteMessage(messageId));
        assertTrue(deleteMessage(getMessageId(99998)));
    }
}