package cn.edu.nju;

import cn.edu.nju.datatables.User;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.users.UserCreateRequest;
import cn.edu.nju.servicedata.users.UserInfoResponse;
import com.google.gson.Gson;
import org.junit.Test;

import static cn.edu.nju.GlobalVar.host;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/19.
 */
public class CreateAndDeleteUserTest {
    /**
     *  CreateAndDeleteUserTest：创建和删除用户测试
     */
    private static String url = "http://"+host+"/users/";

    public boolean checkUserExist(User user){
        /**
         * 检查仓库中是否存在某一用户
         */
        String information = HttpRequest.sendGet(url+user.getId(),"");
        if(information.contains("发送GET请求出现异常！"))
            return false;

        Gson gson = new Gson();
        UserInfoResponse userInRespository = gson.fromJson(information,UserInfoResponse.class);

        if(!user.getName().equals(userInRespository.getName()))
            return false;
        if(!user.getPhone().equals(userInRespository.getPhone()))
            return false;
        if(user.getType() !=userInRespository.getType())
            return false;
        return true;
    }


    public String createRequest(long id, String name, String password, String phone, int type){
        /**
         * 创建用户请求信息
         */
        UserCreateRequest request = new UserCreateRequest();
        request.setId(id);
        request.setName(name);
        request.setPassword(password);
        request.setPhone(phone);
        request.setType(type);

        Gson gson = new Gson();
        return gson.toJson(request);
    }

    public String expectedResult(boolean success, String info){
        /**
         * 构造预计结果
         */
        SuccessResponse response = new SuccessResponse(success);
        response.setInfo(info);

        Gson gson = new Gson();
        return gson.toJson(response);
    }

    @Test
    public void test01(){
        /**
         * test01(验证是否能正常创建/删除一个用户)
         * 输入：id = 99999，name = chezeyu，password = chezeyu19951010，phone = 18651615328，type = 2
         * 预计输出：success = true，info = null
         */

        /**待发送信息*/
        String postInformation = createRequest(99999,"chezeyu","chezeyu19951010","18651615328",2);

        /**预计结果*/
        String expectedInformation = expectedResult(true,null);

        /**发送请求*/
        Gson gson = new Gson();
        String returnInformation = HttpRequest.sendPost(url+"create",postInformation);
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查用户是否创建成功*/
        User user = new User(99999,"chezeyu","chezeyu19951010","18651615328",2);
        boolean createSuccess = checkUserExist(user);
        assertEquals(expectedInformation,returnInformation);
        assertTrue(createSuccess);

        /**删除创建的测试用户*/
        returnInformation = HttpRequest.sendGet(url+"delete/"+99999,"");
        temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);
        expectedInformation = expectedResult(true,null);

        /**检查删除是否成功*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test02(){
        /**
         * test02(验证是否能重复创建同一个用户)
         * 输入：id = 99999，name = chezeyu，password = chezeyu19951010，phone = 18651615328，type = 2
         * 预计输出：success = false，info = The userid exists.
         */

        /**待发送信息*/
        String postInformation = createRequest(99999,"chezeyu","chezeyu19951010","18651615328",2);

        /**预计结果*/
        String expectedInformation = expectedResult(true,null);

        /**发送请求*/
        Gson gson = new Gson();
        String returnInformation = HttpRequest.sendPost(url+"create",postInformation);
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        /**检查用户是否创建成功*/
        User user = new User(99999,"chezeyu","chezeyu19951010","18651615328",2);
        boolean createSuccess = checkUserExist(user);
        assertEquals(expectedInformation,returnInformation);
        assertTrue(createSuccess);

        /**重复创建*/
        returnInformation = HttpRequest.sendPost(url+"create",postInformation);
        temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);
        expectedInformation = expectedResult(false,"The userId exists.");

        /**检查重复创建结果是否符合预期*/
        assertEquals(expectedInformation,returnInformation);

        /**删除创建的测试用户*/
        returnInformation = HttpRequest.sendGet(url+"delete/"+99999,"");
        temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);
        expectedInformation = expectedResult(true,null);

        /**检查删除用户是否成功*/
        assertEquals(expectedInformation,returnInformation);

    }

    @Test
    public void test03(){
        /**
         * test03(验证是否能删除一个不存在用户)
         * 输入：id = 99999
         * 预计输出：success = false，info = The user do not exist。
         */
        Gson gson = new Gson();

        /**发送请求*/
        String returnInformation = HttpRequest.sendGet(url+"delete/"+99999,"");
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        /**预计结果*/
        String expectedInformation = expectedResult(false,"The user do not exist.");

        /**检查返回值是否符合预期*/
        assertEquals(expectedInformation,returnInformation);
    }

    @Test
    public void test04(){
        /**
         * 空字段测试
         */
    }
    /*
    @Test
    public void delete(){
        HttpRequest.sendGet(url+"delete/"+99999,"");
    }
    */
}
