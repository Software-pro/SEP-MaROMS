package cn.edu.nju.MessageTest;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

import java.util.Date;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.servicedata.SuccessResponse;

import static cn.edu.nju.MessageTest.InitialMessage.*;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.gson;

/**
 * Created by chezeyu on 2016/7/20.
 */
public class CreateAndDeleteMessageTest {
	/**
	 * CreateAndDeleteMessageTest:测试消息创建和删除
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
    	/**
    	 * 创建/删除消息测试
    	 */
        Date date = new Date();
        assertTrue(createMessage(0,99999,99998,date,null));
        
        long messageId = getMessageId(99998);
        assertNotEquals(messageId,-1);
        assertTrue(deleteMessage(messageId));
    }
    
    @Test
    public void test02(){
    	/**
    	 * 删除不存在的消息
    	 */
    	
    	long id = 1689;
    	String url = "http://"+host+"/messages/delete/"+id;
    	
    	String returnInformation = HttpRequest.sendGet(url,"");
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        SuccessResponse expect = new SuccessResponse(false);
        expect.setInfo("The message do not exist.");
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);
    }
}
