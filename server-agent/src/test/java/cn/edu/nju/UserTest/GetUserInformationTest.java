package cn.edu.nju.UserTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.datatables.User;
import com.google.gson.Gson;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;

import static cn.edu.nju.UserTest.InitialUser.host;
import static org.junit.Assert.assertEquals;


import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/18.
 */
public class GetUserInformationTest {

    /**
     * GetUserInformationTest:查询用户所有可查询个人信息
     */
    private static String url = "http://"+host+"/users/";

    public static void testModel(long id, String name,String phone,int type){
        /**
         * testModel(test模板：验证通过id查询单个人信息，id存在)
         * 输入：id = id
         * 预计输出：id = id，name = name，phone = phone，type = type
         */

        Gson gson = new Gson();

        /**预计结果*/
        User user = new User(id, name, null, phone, type);
        String expectedInformation = gson.toJson(user,User.class);

        /**发送请求*/
        String returnInformation = HttpRequest.sendGet(url+id,"");

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);
    }


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
         * test01(验证通过id查询单个人信息，id存在)
         * 输入：id = {1,101,201,301}
         * 预计输出：id = 99999, name = chezeyu，phone = 18651615329，type = 0；
         *           id = 99998，name = test1，  phone = 18651615328，  type = 1；
         *           id = 99997，name = test2，  phone = 18651615327，  type = 2；
         *           id = 99996，name = test3，  phone = 18651615326，  type = 3；
         */
        testModel(99999,"chezeyu","18651615329",0);
        testModel(99998,"test1","18651615328",1);
        testModel(99997,"test2","18651615327",2);
        testModel(99996,"test3","18651615326",3);
    }

    
//    @Test
//    public void test02() throws IOException {
//        /**
//         * test02(验证通过id查询单个人信息，id不存在))
//         * 输入：id = 0
//         * 预计输出：get请求发送失败
//         */
//
//        /**
//         * 测试说明：对于不存在的id，服务器应返回相关错误信息。
//         */
//
//        /**预计结果*/
//        String expectedInformation = "发送GET请求出现异常！";
//
//        /**发送请求*/
//        String returnInformation = HttpRequest.sendGet(url + 0, "");
//
//        /**检查返回值跟预期值是否一致*/
//        assertTrue(returnInformation.contains(expectedInformation));
//    }
	
}
