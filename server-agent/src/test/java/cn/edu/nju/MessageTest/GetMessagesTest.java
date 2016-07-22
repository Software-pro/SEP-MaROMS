package cn.edu.nju.MessageTest;

import static cn.edu.nju.MessageTest.InitialMessage.createMessage;
import static cn.edu.nju.MessageTest.InitialMessage.deleteMessage;
import static cn.edu.nju.MessageTest.InitialMessage.getMessageId;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.gson;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.Iterator;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import static cn.edu.nju.MessageTest.InitialMessage.*;

/**
 * Created by chezeyu 2016年7月22日
 */
public class GetMessagesTest {
	/**
	 * GetMessagesTest: 得到消息列表测试
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
        
        long messageId1 = getMessageId(99998);
        assertNotEquals(messageId1,-1);
        long messageId2 = getMessageId(99996);
        assertNotEquals(messageId2,-1);
        
        String url = "http://"+host+"/messages";
        String returnInformation = HttpRequest.sendGet(url,"");
        
        assertTrue(returnInformation.contains("testContent1"));
        assertTrue(returnInformation.contains("testContent2"));
        
        JsonParser jsonParser = new JsonParser();
        JsonElement jsonElement = jsonParser.parse(returnInformation);
        JsonArray jsonArray = jsonElement.getAsJsonArray();

        Iterator iterator = jsonArray.iterator();
        while(iterator.hasNext()){
            JsonElement element = (JsonElement)iterator.next();
            System.out.println(gson.toJson(element));
        }

        /**打印列表信息在控制台查看*/
        System.out.println("----------GetMessagesTest");
        
        /**删除创建的消息*/
        assertTrue(deleteMessage(messageId1));
        assertTrue(deleteMessage(messageId2));
    }
}