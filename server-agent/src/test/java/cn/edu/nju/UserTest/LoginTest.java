package cn.edu.nju.UserTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.servicedata.users.LoginRequest;

import cn.edu.nju.servicedata.users.LoginResponse;
import com.google.gson.Gson;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static cn.edu.nju.UserTest.InitialUser.host;
import static org.junit.Assert.assertEquals;


import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/18.
 */

public class LoginTest {

    /**
     * loginTest:验证用户登录。
     */
    private static String url = "http://"+host;

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
         * test01:测试访问url
         */
        String ret = HttpRequest.sendGet(url+"/","");
        assertEquals("Test success!",ret);
    }

    @Test
    public void test02(){
        /**
         * test02(验证存在用户登录正常，管理员账号)
         * 输入：id = 99999，password = chezeyu19951010
         * 预计输出：success = true，info = null，type = 0
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(99999);
        request.setPassword("chezeyu19951010");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        LoginResponse response = new LoginResponse(true,0,null);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url+"/login",postInformation);
        LoginResponse temp = gson.fromJson(returnInformation,LoginResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test03() {
        /**
         * test03(验证不存在用户登录)
         * 输入：id = 100000，password = admin
         * 预计输出：success = false，info = "The user do not exists."，type = -1
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(100000);
        request.setPassword("admin");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        String info = "The user do not exists.";
        LoginResponse response = new LoginResponse(false,-1,info);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url+"/login",postInformation);
        LoginResponse temp = gson.fromJson(returnInformation,LoginResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test04(){
        /**
         * test04(验证存在用户登录，但密码错误)
         * 输入：id = 99999，password = add
         * 预计输出：success = false，info = "Wrong password."，type = -1
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(99999);
        request.setPassword("add");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        String info ="Wrong password.";
        LoginResponse response = new LoginResponse(false,-1,info);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url+"/login",postInformation);
        LoginResponse temp = gson.fromJson(returnInformation,LoginResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test05(){
        /**
         * test05(验证id为空时登录情况)
         * 输入：id = null，password = admin
         * 预计输出：success = false，info = "The user do not exists."，type = -1
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setPassword("admin");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        String info = "The user do not exists.";
        LoginResponse response = new LoginResponse(false,-1,info);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url+"/login",postInformation);
        LoginResponse temp = gson.fromJson(returnInformation,LoginResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test06(){
        /**
         * test06(验证密码为空时登录情况)
         * 输入：id = 99999，password = ""
         * 预计输出：success = false，info = "Wrong password."，type = -1
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(99999);
        request.setPassword("");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        String info = "Wrong password.";
        LoginResponse response = new LoginResponse(false,-1,info);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url+"/login",postInformation);
        LoginResponse temp = gson.fromJson(returnInformation,LoginResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test07(){
        /**
         * test07(验证存在用户登录正常，工程师账号)
         * 输入：id = 99998，password = test119951010
         * 预计输出：success = true，info = null，type = 1
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(99998);
        request.setPassword("test119951010");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        LoginResponse response = new LoginResponse(true,1,null);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url+"/login",postInformation);
        LoginResponse temp = gson.fromJson(returnInformation,LoginResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test08(){
        /**
         * test08(验证存在用户登录正常，销售员账号)
         * 输入：id = 99997，password = test219951010
         * 预计输出：success = true，info = null，type = 2
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(99997);
        request.setPassword("test219951010");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        LoginResponse response = new LoginResponse(true,2,null);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url+"/login",postInformation);
        LoginResponse temp = gson.fromJson(returnInformation,LoginResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test09(){
        /**
         * test09(验证存在用户登录正常，派单员账号)
         * 输入：id = 99996，password = test319951010
         * 预计输出：success = true，info = null，type = 3
         */

        /**待发送信息*/
        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(99996);
        request.setPassword("test319951010");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        LoginResponse response = new LoginResponse(true,3,null);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url+"/login",postInformation);
        LoginResponse temp = gson.fromJson(returnInformation,LoginResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);
    }
}
