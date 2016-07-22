package cn.edu.nju.RepairFormTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.repairforms.RepairFormEditRequest;
import cn.edu.nju.servicedata.repairforms.RepairFormInfoResponse;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Date;
import java.util.Iterator;

import static cn.edu.nju.RepairFormTest.InitialRepairForms.*;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.getRepairFormsId;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/21.
 */
public class EditRepairFormsTest {
    /**
     *  EditRepairFormsTest：修改报修单（仅限未接状态）
     */

    @BeforeClass
    public static void initial(){
        /**初始化测试用户*/
        assertTrue(InitialUser.createUser(10000,"chezeyu","chezeyu19951010","18651615329",1));
        assertTrue(InitialUser.createUser(99997,"test2","test219951010","18651615327",2));
        assertTrue(InitialUser.createUser(99996,"test3","test319951010","18651615326",3));
    }

    @AfterClass
    public static void delete(){
        /**删除测试用户*/
        assertTrue(InitialUser.deleteUser(10000));
        assertTrue(InitialUser.deleteUser(99997));
        assertTrue(InitialUser.deleteUser(99996));
    }

    @Test
    public void test01(){
        /**
         * test01(修改报修单)
         * 输入：修改报修单信息
         * 预计输出：success = true，info = null
         */

        /**初始化报修单列表*/
        Date date = new Date();
        assertTrue(createRepairForms(20,0,"chezeyu","18651615328","Nanjing University","Nanjing University",10000,99997,99996,date));


        long id = getRepairFormsId(10000);
        RepairFormEditRequest request = new RepairFormEditRequest();
        request.setId(id);
        request.setGrade(10);
        request.setService(0);
        request.setClientName("!chezeyu");
        request.setClientPhone("18651615328");
        request.setClientWorkplace("Nanjing University");
        request.setClientAddress("Nanjing University");
        request.setEngineerId(10000);
        request.setSalerId(99997);
        request.setDistributorId(99996);

        String postInformation = gson.toJson(request);
        String url = "http://"+host+"/repairforms/edit";
        String returnInformation = HttpRequest.sendPost(url,postInformation);

        SuccessResponse response = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(response);

        SuccessResponse expect = new SuccessResponse(true);
        expect.setInfo(null);
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);

        /**删除报修单*/
        assertTrue(deleteRepairForm(getRepairFormsId(10000)));
    }

    @Test
    public void test02(){
        /**
         * test02(修改报修单)
         * 输入：修改报修单信息,报修单不存在 id = 15977
         * 预计输出：success = false，info = The repairform do not exist.
         */

        RepairFormEditRequest request = new RepairFormEditRequest();
        request.setId(15977);
        request.setGrade(10);
        request.setService(0);
        request.setClientName("!chezeyu");
        request.setClientPhone("18651615328");
        request.setClientWorkplace("Nanjing University");
        request.setClientAddress("Nanjing University");
        request.setEngineerId(10000);
        request.setSalerId(99997);
        request.setDistributorId(99996);

        String postInformation = gson.toJson(request);
        String url = "http://"+host+"/repairforms/edit";
        String returnInformation = HttpRequest.sendPost(url,postInformation);

        SuccessResponse response = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(response);

        SuccessResponse expect = new SuccessResponse(false);
        expect.setInfo("The repairform do not exist.");
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test03(){
        /**
         * test03(修改报修单)
         * 输入：修改报修单信息,报修单已接
         * 预计输出：success = false，info = The repairform need to be not accepted.
         */

        /**初始化报修单列表*/
        Date date = new Date();
        Date visitTime = new Date();
        assertTrue(createReceivedRepairForms(15,1,"chezeyu","18651615328","Nanjing University","Nanjing University",10000,99997,99996,date,visitTime));

        long id = getRepairFormsId(10000);
        RepairFormEditRequest request = new RepairFormEditRequest();
        request.setId(id);
        request.setGrade(10);
        request.setService(0);
        request.setClientName("!chezeyu");
        request.setClientPhone("18651615328");
        request.setClientWorkplace("Nanjing University");
        request.setClientAddress("Nanjing University");
        request.setEngineerId(10000);
        request.setSalerId(99997);
        request.setDistributorId(99996);

        String postInformation = gson.toJson(request);
        String url = "http://"+host+"/repairforms/edit";
        String returnInformation = HttpRequest.sendPost(url,postInformation);

        SuccessResponse response = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(response);

        SuccessResponse expect = new SuccessResponse(false);
        expect.setInfo("The repairform need to be not accepted.");
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);

        /**删除报修单*/
        assertTrue(deleteRepairForm(getRepairFormsId(10000)));
    }
}
