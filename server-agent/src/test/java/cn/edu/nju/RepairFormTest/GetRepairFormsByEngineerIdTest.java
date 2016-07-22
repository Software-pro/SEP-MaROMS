package cn.edu.nju.RepairFormTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.datatables.RepairForm;
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
public class GetRepairFormsByEngineerIdTest {
    /**
     *  GetRepairFormsByEngineerIdTest：通过工程师ID查询特定报修单
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
         * test01(查询特定报修单)
         * 输入：工程师id
         * 预计输出：报修单详情
         */

        /**初始化报修单列表*/
        Date date = new Date();
        Date visitTime = new Date();
        String serialNumber = "f4ads5f45678afd65";
        String feedBackInformation = "Task completed.";
        assertTrue(createCompeletedRepairForms(10,2,"chezeyu","18651615328","Nanjing University","Nanjing University",10000,99997,99996,date,visitTime,serialNumber,feedBackInformation));

        long id = 10000;
        String url = "http://"+host+"/repairforms/byEngineerId/"+id;
        String returnInformation = HttpRequest.sendGet(url,"");

        JsonParser jsonParser = new JsonParser();
        JsonElement jsonElement = jsonParser.parse(returnInformation);
        JsonArray jsonArray = jsonElement.getAsJsonArray();

        Iterator iterator = jsonArray.iterator();
        while(iterator.hasNext()) {
            JsonElement element = (JsonElement) iterator.next();
            assertEquals(gson.fromJson(gson.toJson(element),RepairFormInfoResponse.class).getClientName(),"chezeyu");
        }


        /**删除报修单*/
        assertTrue(deleteRepairForm(getRepairFormsId(10000)));
    }
}
