package cn.edu.nju.TaskTest;

import static cn.edu.nju.MessageTest.InitialMessage.gson;
import static cn.edu.nju.MessageTest.InitialMessage.host;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.createCheckedRepairForms;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.createCompeletedRepairForms;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.createReceivedRepairForms;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.deleteRepairForm;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.getRepairFormsId;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.Date;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.task.SubmitRequest;

/**
 * Created by chezeyu 2016年7月22日
 */
public class CheckRepairFormTaskTest {
/**
 * CheckRepairFormTaskTest：测试审核报修单
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
    	
    	/**新建已完成报修单*/
    	Date date = new Date();
    	String serialNumber = "hjkaldf82y3";
    	String feedBackInformation = "good boy";
    	assertTrue(createCompeletedRepairForms(10,2,"chezeyu","18651615328","Nanjing University","Nanjing University",99998,99997,99996,date,date,serialNumber,feedBackInformation));
    	
    	long id = getRepairFormsId(99998);
    
    	String url = "http://"+host+"/task/check/"+id;
        String returnInformation = HttpRequest.sendGet(url,"");

        SuccessResponse response = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(response);

        SuccessResponse expect = new SuccessResponse(true);
        expect.setInfo(null);
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);
        
        assertTrue(deleteRepairForm(id));
    }
    
    @Test
    public void test02(){
    	
    	long id = 231389;
        
    	String url = "http://"+host+"/task/check/"+id;
        String returnInformation = HttpRequest.sendGet(url,"");

        SuccessResponse response = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(response);

        SuccessResponse expect = new SuccessResponse(false);
        expect.setInfo("The id do not exist.");
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);
    }
    
    @Test
    public void test03(){
    	
    	/**新建已完成报修单*/
    	Date date = new Date();
    	String serialNumber = "hjkaldf82y3";
    	String feedBackInformation = "good boy";
    	assertTrue(createCheckedRepairForms(5,3,"chezeyu","18651615328","Nanjing University","Nanjing University",99998,99997,99996,date,date,serialNumber,feedBackInformation));
    
    	long id = getRepairFormsId(99998);
        
    	String url = "http://"+host+"/task/check/"+id;
        String returnInformation = HttpRequest.sendGet(url,"");

        SuccessResponse response = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(response);

        SuccessResponse expect = new SuccessResponse(false);
        expect.setInfo("The status must be submitted.");
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);
        
        assertTrue(deleteRepairForm(id));
    }
}
