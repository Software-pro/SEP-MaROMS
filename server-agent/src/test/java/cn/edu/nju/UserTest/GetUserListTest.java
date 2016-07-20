package cn.edu.nju.UserTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.servicedata.users.UserInfoResponse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static cn.edu.nju.UserTest.InitialUser.host;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/18.
 */
public class GetUserListTest {

    /**
     * loginTest:验证用户登录。
     */
    private static String url = "http://"+host+"/users";

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
         * test01(验证是否能得到用户列表)
         * 输入：发送get请求
         * 预计输出：得到用户列表
         */

        /**发送请求*/
        String ret = HttpRequest.sendGet(url,"");

        Gson gson = new Gson();
        JsonParser jsonParser = new JsonParser();
        JsonElement jsonElement = jsonParser.parse(ret);
        JsonArray jsonArray = jsonElement.getAsJsonArray();

        Iterator iterator = jsonArray.iterator();
        while(iterator.hasNext()){
            JsonElement element = (JsonElement)iterator.next();
            System.out.println(gson.toJson(element));
        }

        /**打印列表信息在控制台查看*/
        System.out.println("----------GetUserListTest");

        /**检查返回值跟预期值是否位空*/
        assertNotNull(ret);
    }
}
