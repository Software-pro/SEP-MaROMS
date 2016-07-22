package cn.edu.nju.RepairFormTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.xml.sax.DTDHandler;

import java.util.Date;
import java.util.Iterator;

import static cn.edu.nju.RepairFormTest.InitialRepairForms.*;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/21.
 */
public class GetRepairFormsListTest {
    /**
     * GetRepairFormsListTest：查看所有报修单
     */

    @BeforeClass
    public static void initial(){
        /**初始化测试用户*/
        assertTrue(InitialUser.createUser(10000,"chezeyu","chezeyu19951010","18651615329",1));
        assertTrue(InitialUser.createUser(10001,"engineer1","engineer119951010","18651615328",1));
        assertTrue(InitialUser.createUser(10002,"engineer2","engineer219951010","18651615327",1));
        assertTrue(InitialUser.createUser(10003,"enginerr3","engineer319951010","18651615327",1));
        assertTrue(InitialUser.createUser(99997,"test2","test219951010","18651615327",2));
        assertTrue(InitialUser.createUser(99996,"test3","test319951010","18651615326",3));

        /**初始化报修单列表*/
        Date date = new Date();
        Date visitTime = new Date();
        String serialNumber = "f4ads5f45678afd65";
        String feedBackInformation = "Task completed.";
        assertTrue(createRepairForms(20,0,"chezeyu","18651615328","Nanjing University","Nanjing University",10000,99997,99996,date));
        assertTrue(createReceivedRepairForms(15,1,"chezeyu","18651615328","Nanjing University","Nanjing University",10001,99997,99996,date,visitTime));
        assertTrue(createCompeletedRepairForms(10,2,"chezeyu","18651615328","Nanjing University","Nanjing University",10002,99997,99996,date,visitTime,serialNumber,feedBackInformation));
        assertTrue(createCheckedRepairForms(5,3,"chezeyu","18651615328","Nanjing University","Nanjing University",10003,99997,99996,date,visitTime,serialNumber,feedBackInformation));
    }

    @AfterClass
    public static void delete(){
        /**删除报修单*/
        assertTrue(deleteRepairForm(getRepairFormsId(10000)));
        assertTrue(deleteRepairForm(getRepairFormsId(10001)));
        assertTrue(deleteRepairForm(getRepairFormsId(10002)));
        assertTrue(deleteRepairForm(getRepairFormsId(10003)));

        /**删除测试用户*/
        assertTrue(InitialUser.deleteUser(10000));
        assertTrue(InitialUser.deleteUser(10001));
        assertTrue(InitialUser.deleteUser(10002));
        assertTrue(InitialUser.deleteUser(10003));
        assertTrue(InitialUser.deleteUser(99997));
        assertTrue(InitialUser.deleteUser(99996));

    }

    @Test
    public void test01(){
        /**
         * test01(查看所有报修单)
         * 输入：无
         * 预计输出：得到所有报修单信息
         */
        String url = "http://"+host+"/repairforms";
        String returnInformation = HttpRequest.sendGet(url,"");

        JsonParser jsonParser = new JsonParser();
        JsonElement jsonElement = jsonParser.parse(returnInformation);
        JsonArray jsonArray = jsonElement.getAsJsonArray();

        Iterator iterator = jsonArray.iterator();
        while(iterator.hasNext()){
            JsonElement element = (JsonElement)iterator.next();
            System.out.println(gson.toJson(element));
        }

        /**打印列表信息在控制台查看*/
        System.out.println("----------GetRepairFormListTest");

        /**检查返回值跟预期值是否位空*/
        assertNotNull(returnInformation);
    }
}
