package cn.edu.nju;

import cn.edu.nju.servicedata.users.LoginRequest;

import cn.edu.nju.servicedata.users.LoginResponse;
import com.google.gson.Gson;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

import static cn.edu.nju.GlobalVar.host;

/**
 * Created by chezeyu on 2016/7/18.
 */

public class LoginTest {

    /**
     * loginTest:验证用户登录。
     */
    private static String url = "http://"+host;

    @Test
    public void test01(){
        /**
         * test01:测试访问url
         */
        String json = "";

        String ret = HttpRequest.sendGet(url+"/",json);
        assertEquals(ret,"Hello guys! We made it!");
    }

    @Test
    public void test02(){
        /**
         * test02(验证存在用户登录正常，管理员账号)
         * 输入：id = 1，password = admin
         * 预计输出：success = true，info = null，type = 0
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(1);
        request.setPassword("admin");
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
         * 输入：id = 99999，password = admin
         * 预计输出：success = false，info = "The user do not exists."，type = -1
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(99999);
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
         * 输入：id = 1，password = add
         * 预计输出：success = false，info = "Wrong password."，type = -1
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(1);
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
         * 输入：id = 1，password = ""
         * 预计输出：success = false，info = "Wrong password."，type = -1
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(1);
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
         * 输入：id = 101，password = engineer
         * 预计输出：success = true，info = null，type = 1
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(101);
        request.setPassword("engineer");
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
         * 输入：id = 201，password = saler
         * 预计输出：success = true，info = null，type = 2
         */

        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(201);
        request.setPassword("saler");
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
         * 输入：id = 301，password = distributor
         * 预计输出：success = true，info = null，type = 3
         */

        /**待发送信息*/
        Gson gson = new Gson();

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(301);
        request.setPassword("distributor");
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
