package cn.edu.nju.UserTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.users.PasswordChangeRequest;
import com.google.gson.Gson;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import static cn.edu.nju.UserTest.InitialUser.host;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/19.
 */
public class PasswordChangeTest {
    /**
     *   PasswordChangeTest：修改密码测试
     */
    private static String url = "http://"+host+"/users/password/change";

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
         * test01(验证管理员用户修改密码是否成功)
         * 输入：id = 99999，oldPassword = chezeyu19951010，newPassword = test0
         * 预计输出：success = true，info = null
         */

        Gson gson = new Gson();

        /**待发送信息*/
        PasswordChangeRequest request = new PasswordChangeRequest();
        request.setId(99999);
        request.setOldPassword("chezeyu19951010");
        request.setNewPassword("test0");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        SuccessResponse response = new SuccessResponse(true);
        response.setInfo(null);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url,postInformation);
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);

        /**检查密码是否被修改*/
        assertEquals(InitialUser.getPassword(99999),"test0");
    }

    @Test
    public void test02(){
        /**
         * test02(验证工程师用户修改密码是否成功)
         * 输入：id = 99998，oldPassword = test119951010，newPassword = test1
         * 预计输出：success = true，info = null
         */

        Gson gson = new Gson();

        /**待发送信息*/
        PasswordChangeRequest request = new PasswordChangeRequest();
        request.setId(99998);
        request.setOldPassword("test119951010");
        request.setNewPassword("test1");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        SuccessResponse response = new SuccessResponse(true);
        response.setInfo(null);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url,postInformation);
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);

        /**检查密码是否被修改*/
        assertEquals(InitialUser.getPassword(99998),"test1");
    }

    @Test
    public void test03(){
        /**
         * test03(验证销售员用户修改密码是否成功)
         * 输入：id = 99997，oldPassword = test219951010，newPassword = test2
         * 预计输出：success = true，info = null
         */

        Gson gson = new Gson();

        /**待发送信息*/
        PasswordChangeRequest request = new PasswordChangeRequest();
        request.setId(99997);
        request.setOldPassword("test219951010");
        request.setNewPassword("test2");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        SuccessResponse response = new SuccessResponse(true);
        response.setInfo(null);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url,postInformation);
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);

        /**检查密码是否被修改*/
        assertEquals(InitialUser.getPassword(99997),"test2");
    }

    @Test
    public void test04(){
        /**
         * test04(验证派单员用户修改密码是否成功)
         * 输入：id = 99996，oldPassword = test319951010，newPassword = test3
         * 预计输出：success = true，info = null
         */

        Gson gson = new Gson();

        /**待发送信息*/
        PasswordChangeRequest request = new PasswordChangeRequest();
        request.setId(99996);
        request.setOldPassword("test319951010");
        request.setNewPassword("test3");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        SuccessResponse response = new SuccessResponse(true);
        response.setInfo(null);
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url,postInformation);
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);

        /**检查密码是否被修改*/
        assertEquals(InitialUser.getPassword(99996),"test3");
    }

    @Test
    public void test05(){
        /**
         * test05(验证不存在用户修改密码是否成功)
         * 输入：id = 10000，oldPassword = chezeyu19951010，newPassword = test0
         * 预计输出：success = false，info = The user do not exist.
         */

        Gson gson = new Gson();

        /**待发送信息*/
        PasswordChangeRequest request = new PasswordChangeRequest();
        request.setId(10000);
        request.setOldPassword("chezeyu19951010");
        request.setNewPassword("test0");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        SuccessResponse response = new SuccessResponse(false);
        response.setInfo("The user do not exist.");
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url,postInformation);
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);

    }

    @Before
    public void test06before(){
        /**在test01中修改过管理员账号。所以在做test06时重置初始值*/
        assertTrue(InitialUser.deleteUser(99999));
        assertTrue(InitialUser.createUser(99999,"chezeyu","chezeyu19951010","18651615329",0));
    }
    @Test
    public void test06(){
        /**
         * test06(验证用户修改密码时旧密码错误，是否能修改成功)
         * 输入：id = 99999，oldPassword = chezeyu，newPassword = test0
         * 预计输出：success = false，info = The old password is wrong.
         */

        Gson gson = new Gson();

        /**待发送信息*/
        PasswordChangeRequest request = new PasswordChangeRequest();
        request.setId(99999);
        request.setOldPassword("chezeyu");
        request.setNewPassword("test0");
        String postInformation = gson.toJson(request);

        /**预计结果*/
        SuccessResponse response = new SuccessResponse(false);
        response.setInfo("The old password is wrong.");
        String expectedInformation = gson.toJson(response);

        /**发送请求*/
        String returnInformation = HttpRequest.sendPost(url,postInformation);
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查返回值跟预期值是否一致*/
        assertEquals(expectedInformation,returnInformation);

        /**检查密码是否被修改*/
        assertEquals(InitialUser.getPassword(99999),"chezeyu19951010");
    }

}
