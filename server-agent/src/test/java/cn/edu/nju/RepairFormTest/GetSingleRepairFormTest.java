package cn.edu.nju.RepairFormTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.datatables.RepairForm;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Date;

import static cn.edu.nju.RepairFormTest.InitialRepairForms.*;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.deleteRepairForm;
import static cn.edu.nju.RepairFormTest.InitialRepairForms.getRepairFormsId;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/21.
 */
public class GetSingleRepairFormTest {
    /**
     *  GetSingleRepairFormTest：查询特定的报修单
     */

    Date date = new Date();
    Date visitTime = new Date();
    String serialNumber = "f4ads5f45678afd65";
    String feedBackInformation = "Task completed.";

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
         * test01(查询特定的报修单)
         * 输入：工程师Id
         * 预计输出：报修单信息
         */

        /**初始化报修单列表*/
        assertTrue(createCompeletedRepairForms(10,2,"chezeyu","18651615328","Nanjing University","Nanjing University",10000,99997,99996,date,visitTime,serialNumber,feedBackInformation));

        long id = getRepairFormsId(10000);
        String url = "http://"+host+"/repairforms/"+id;
        String returnInformation = HttpRequest.sendGet(url,"");

        assertTrue(returnInformation.contains("\"status\":2"));
        assertTrue(returnInformation.contains("\"clientName\":\"chezeyu\""));
        assertTrue(returnInformation.contains("\"clientPhone\":\"18651615328\""));


        /**删除报修单*/
        assertTrue(deleteRepairForm(getRepairFormsId(10000)));

    }
}
