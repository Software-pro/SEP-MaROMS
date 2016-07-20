package cn.edu.nju.RepairFormTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.servicedata.SuccessResponse;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Date;

import static cn.edu.nju.RepairFormTest.InitialRepairForms.*;
import static cn.edu.nju.UserTest.InitialUser.host;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/20.
 */
public class CreateAndDeleteRepairFormTest {
    /**
     * CreateAndDeleteRepairFormTest：创建和删除报修单测试
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
         * test01(验证创建保修单是否成功，删除是否成功)
         * 输入：int grade,               //分值            = 20
                 int service,             //服务类型        = 5
                 String clientName,       //客户名          = chezeyu
                 String clientPhone,      //客户电话        = 18651615328
                 String clientWorkplace,  //客户单位        = Nanjing University
                 String clientAddress,    //客户地址        = Nanjing University
                 long engineerId,         //工程师id        = 99998
                 long salerId,            //销售员id        = 99997
                 long distributorId,      //派单员id        = 99996
                 Date creationTime        //保修单创建时间  = new Date()
         * 预计输出：success = true，info = null
         */

        /**利用IntialRepairForms中的方法辅助测试*/
        Date date = new Date();

        /**判断是否创建成功*/
        assertTrue(createRepairForms(20,5,"chezeyu","18651615328","Nanjing University","Nanjing University",99998,99997,99996,date));

        /**获取新创建的报修单ID*/
        long repairFormId = getRepairFormsId(99998);
        assertNotEquals(repairFormId,-1);

        /**删除报修单*/
        assertTrue(deleteRepairForm(repairFormId));
    }

    @Test
    public void test02(){
        /**
         * test02(删除一个不存在的报修单)
         * 输入：不存在的报修单id = 10001
         * 预计输出：success = false，info = The repairform do not exist.
         */

        long id = 10001;

        String url = "http://"+host+"/repairforms/delete/"+id;

        String returnInformation = HttpRequest.sendGet(url,"");
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        SuccessResponse expect = new SuccessResponse(false);
        expect.setInfo("The repairform do not exist.");
        String expectedInformation = gson.toJson(expect);

        assertEquals(expectedInformation,returnInformation);
    }
}
