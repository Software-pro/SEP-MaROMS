package cn.edu.nju.RepairFormTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.repairforms.ChangeGradeRequest;
import cn.edu.nju.servicedata.repairforms.RepairFormEditRequest;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Date;

import static cn.edu.nju.RepairFormTest.InitialRepairForms.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/21.
 */
public class ChangeGradeTest {
    /**
     *  ChangeGradeTest：修改报修单分值
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
         * test01(修改报修单分值)
         * 输入：id = 1，grade = 30
         * 预计输出：success = true，info = null
         */

        /**初始化报修单列表*/
        Date date = new Date();
        assertTrue(createRepairForms(20,0,"chezeyu","18651615328","Nanjing University","Nanjing University",10000,99997,99996,date));


        long id = getRepairFormsId(10000);
        ChangeGradeRequest request = new ChangeGradeRequest();
        request.setId(id);
        request.setGrade(50);

        String postInformation = gson.toJson(request);
        String url = "http://"+host+"/repairforms/changeGrade";
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
         * test02(修改报修单分值)
         * 输入：id = 1597，grade = 30
         * 预计输出：success = false，info = The repairform do not exist.
         */

        long id = 1597;
        ChangeGradeRequest request = new ChangeGradeRequest();
        request.setId(id);
        request.setGrade(50);

        String postInformation = gson.toJson(request);
        String url = "http://"+host+"/repairforms/changeGrade";
        String returnInformation = HttpRequest.sendPost(url,postInformation);

        SuccessResponse response = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(response);

        SuccessResponse expect = new SuccessResponse(false);
        expect.setInfo("The repairform do not exist.");
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);
    }
}
