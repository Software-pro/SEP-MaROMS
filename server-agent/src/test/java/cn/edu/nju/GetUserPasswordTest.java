package cn.edu.nju;

import cn.edu.nju.servicedata.users.PasswordResponse;
import com.google.gson.Gson;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static cn.edu.nju.GlobalVar.host;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/19.
 */
public class GetUserPasswordTest {
    /**
     * GetUserPasswordTest:查看用户密码测试。
     */

    private static String url = "http://"+host+"/users/password/";

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
         * test01(验证查看管理员密码)
         * 输入：id = 99999
         * 预计输出：success = true，info = null，password = chezeyu19951010
         */

        /**发送请求*/
        long id = 99999;
        String returnInformation = HttpRequest.sendGet(url+id,"");
        Gson gson = new Gson();
        PasswordResponse response = gson.fromJson(returnInformation,PasswordResponse.class);
        returnInformation = gson.toJson(response);

        /**预计结果*/
        PasswordResponse expect = new PasswordResponse();
        expect.setSuccess(true);
        expect.setInfo(null);
        expect.setPassword("chezeyu19951010");
        String expectedInformation = gson.toJson(expect,PasswordResponse.class);

        /**检查返回值是否跟预期值一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test02(){
        /**
         * test02(验证查看工程师密码)
         * 输入：id = 99998
         * 预计输出：success = true，info = null，password = test119951010
         */

        /**发送请求*/
        long id = 99998;
        String returnInformation = HttpRequest.sendGet(url+id,"");
        Gson gson = new Gson();
        PasswordResponse response = gson.fromJson(returnInformation,PasswordResponse.class);
        returnInformation = gson.toJson(response);

        /**预计结果*/
        PasswordResponse expect = new PasswordResponse();
        expect.setSuccess(true);
        expect.setInfo(null);
        expect.setPassword("test119951010");
        String expectedInformation = gson.toJson(expect,PasswordResponse.class);

        /**检查返回值是否跟预期值一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test03(){
        /**
         * test03(验证查看销售员密码)
         * 输入：id = 99997
         * 预计输出：success = true，info = null，password = test219951010
         */

        /**发送请求*/
        long id = 99997;
        String returnInformation = HttpRequest.sendGet(url+id,"");
        Gson gson = new Gson();
        PasswordResponse response = gson.fromJson(returnInformation,PasswordResponse.class);
        returnInformation = gson.toJson(response);

        /**预计结果*/
        PasswordResponse expect = new PasswordResponse();
        expect.setSuccess(true);
        expect.setInfo(null);
        expect.setPassword("test219951010");
        String expectedInformation = gson.toJson(expect,PasswordResponse.class);

        /**检查返回值是否跟预期值一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test04(){
        /**
         * test01(验证查看派单员密码)
         * 输入：id = 99996
         * 预计输出：success = true，info = null，password = test319951010
         */

        /**发送请求*/
        long id = 99996;
        String returnInformation = HttpRequest.sendGet(url+id,"");
        Gson gson = new Gson();
        PasswordResponse response = gson.fromJson(returnInformation,PasswordResponse.class);
        returnInformation = gson.toJson(response);

        /**预计结果*/
        PasswordResponse expect = new PasswordResponse();
        expect.setSuccess(true);
        expect.setInfo(null);
        expect.setPassword("test319951010");
        String expectedInformation = gson.toJson(expect,PasswordResponse.class);

        /**检查返回值是否跟预期值一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test05(){
        /**
         * test01(验证查看管理员密码)
         * 输入：id = 10000
         * 预计输出：success = false，info = The user do not exist.，password = null
         */

        /**发送请求*/
        long id = 10000;
        String returnInformation = HttpRequest.sendGet(url+id,"");
        Gson gson = new Gson();
        PasswordResponse response = gson.fromJson(returnInformation,PasswordResponse.class);
        returnInformation = gson.toJson(response);

        /**预计结果*/
        PasswordResponse expect = new PasswordResponse();
        expect.setSuccess(false);
        expect.setInfo("The user do not exist.");
        expect.setPassword(null);
        String expectedInformation = gson.toJson(expect,PasswordResponse.class);

        /**检查返回值是否跟预期值一致*/
        assertEquals(expectedInformation,returnInformation);
    }

}
