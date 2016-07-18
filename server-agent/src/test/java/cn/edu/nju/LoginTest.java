package cn.edu.nju;

import cn.edu.nju.servicedata.users.LoginRequest;

import cn.edu.nju.servicedata.users.LoginResponse;
import org.junit.Test;
import net.sf.json.*;

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
         * test02(验证存在用户登录正常)
         * 输入：id = 1，password = admin
         * 预计输出：success = true，info = null，type = 0
         */

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(1);
        request.setPassword("admin");
        JSONObject postInformation = JSONObject.fromObject(request);

        //！！！！！！！！！！！！！！！！！！调换默认构造顺序
        /**预计结果*/
        LoginResponse response = new LoginResponse(true,null,0);
        JSONObject expactedInformation = JSONObject.fromObject(response);

        /**发送请求*/
        String ret = HttpRequest.sendPost(url+"/login",postInformation.toString());

        /**检查返回值跟预期值是否一致*/
        assertEquals(expactedInformation,ret);
    }

    @Test
    public void test03() {
        /**
         * test03(验证不存在用户登录)
         * 输入：id = 99999，password = admin
         * 预计输出：success = false，info = "The user do not exists."，type = -1
         */

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(99999);
        request.setPassword("admin");
        JSONObject postInformation = JSONObject.fromObject(request);

        /**预计结果*/
        String info = "The user do not exists.";
        LoginResponse response = new LoginResponse(false, info, -1);
        JSONObject expactedInformation = JSONObject.fromObject(response);

        /**发送请求*/
        String ret = HttpRequest.sendPost(url + "/login", postInformation.toString());

        /**检查返回值跟预期值是否一致*/
        assertEquals(expactedInformation, ret);
    }

    @Test
    public void test04(){
        /**
         * test04(验证存在用户登录，但密码错误)
         * 输入：id = 1，password = add
         * 预计输出：success = false，info = "Wrong password."，type = -1
         */

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(1);
        request.setPassword("add");
        JSONObject postInformation = JSONObject.fromObject(request);

        /**预计结果*/
        String info = "Wrong password.";
        LoginResponse response = new LoginResponse(false,info,-1);
        JSONObject expactedInformation = JSONObject.fromObject(response);

        /**发送请求*/
        String ret = HttpRequest.sendPost(url+"/login",postInformation.toString());

        /**检查返回值跟预期值是否一致*/
        assertEquals(expactedInformation,ret);
    }

    @Test
    public void test05(){
        /**
         * test05(验证id为空时登录情况)
         * 输入：id = null，password = admin
         * 预计输出：success = false，info = "The user do not exists."，type = -1
         */

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setPassword("admin");
        JSONObject postInformation = JSONObject.fromObject(request);

        /**预计结果*/
        String info = "The user do not exists.";
        LoginResponse response = new LoginResponse(false,info,-1);
        JSONObject expactedInformation = JSONObject.fromObject(response);

        /**发送请求*/
        String ret = HttpRequest.sendPost(url+"/login",postInformation.toString());

        /**检查返回值跟预期值是否一致*/
        assertEquals(expactedInformation,ret);
    }

    @Test
    public void test06(){
        /**
         * test06(验证密码为空时登录情况)
         * 输入：id = 1，password = null
         * 预计输出：success = false，info = "Wrong password."，type = -1
         */

        /**待发送信息*/
        LoginRequest request = new LoginRequest();
        request.setId(1);
        JSONObject postInformation = JSONObject.fromObject(request);

        /**预计结果*/
        String info = "Wrong password.";
        LoginResponse response = new LoginResponse(false,info,-1);
        JSONObject expactedInformation = JSONObject.fromObject(response);

        /**发送请求*/
        String ret = HttpRequest.sendPost(url+"/login",postInformation.toString());

        /**检查返回值跟预期值是否一致*/
        assertEquals(expactedInformation,ret);
    }
}
