package cn.edu.nju.RepairFormTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Date;

import static cn.edu.nju.RepairFormTest.InitialRepairForms.*;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/21.
 */
public class GetClientNamesTest {
    /**
     *  GetClientNamesTest：查询所有报修单客户姓名
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
         * test01(查看所有报修单客户姓名)
         * 输入：无
         * 预计输出：所有客户姓名
         */
        /**初始化报修单列表*/
        Date date = new Date();
        assertTrue(createRepairForms(20,0,"chezeyu","18651615328","Nanjing University","Nanjing University",10000,99997,99996,date));
        assertTrue(createRepairForms(20,0,"zhaiwei","18651615328","Nanjing University","Nanjing University",10000,99997,99996,date));
        assertTrue(createRepairForms(20,0,"wanglin","18651615328","Nanjing University","Nanjing University",10000,99997,99996,date));

        String url = "http://"+host+"/repairforms/clientNames";
        String returnInformation = HttpRequest.sendGet(url,"");

        assertTrue(returnInformation.contains("chezeyu"));
        assertTrue(returnInformation.contains("zhaiwei"));
        assertTrue(returnInformation.contains("wanglin"));

        /**删除报修单*/
        assertTrue(deleteRepairForm(getRepairFormsId(10000)));
        assertTrue(deleteRepairForm(getRepairFormsId(10000)));
        assertTrue(deleteRepairForm(getRepairFormsId(10000)));

    }
}
