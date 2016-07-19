package cn.edu.nju;

import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.users.UserCreateRequest;
import cn.edu.nju.servicedata.users.UserInfoResponse;
import com.google.gson.Gson;
import org.junit.Test;

import static cn.edu.nju.GlobalVar.host;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/19.
 */

public class InitialUser {
    public static boolean createUser(long id, String name, String password, String phone, int type){
        /**
         * 创建用户
         */
        String url = "http://"+host+"/users/create";

        UserCreateRequest request = new UserCreateRequest();
        request.setId(id);
        request.setName(name);
        request.setPassword(password);
        request.setPhone(phone);
        request.setType(type);

        Gson gson = new Gson();
        String postInformation = gson.toJson(request);

        String returnInformation = HttpRequest.sendPost(url,postInformation);
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        SuccessResponse expect = new SuccessResponse(true);
        expect.setInfo(null);
        String expectedInformation = gson.toJson(expect);

        if(expectedInformation.equals(returnInformation))
            return true;
        else
            return false;
    }
    public static boolean deleteUser(long id){
        /**
         * 删除用户
         */
        String url = "http://"+host+"/users/delete/"+id;

        String returnInformation = HttpRequest.sendGet(url,"");
        Gson gson = new Gson();
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        SuccessResponse expect = new SuccessResponse(true);
        expect.setInfo(null);
        String expectedInformation = gson.toJson(expect);

        if (expectedInformation.equals(returnInformation))
            return true;
        else
            return false;
    }

    public static String findUser(long id){
        /**
         * 查找用户
         */
        String url = "http://"+host+"/users/"+id;

        String returnInformation = HttpRequest.sendGet(url,"");
        Gson gson = new Gson();
        UserInfoResponse temp = gson.fromJson(returnInformation,UserInfoResponse.class);
        returnInformation = gson.toJson(temp);

        return returnInformation;
    }
    @Test
    public void test(){
        assertTrue(createUser(99999,"chezeyu","chezeyu19951010","18651615328",0));
        System.out.println(findUser(99999));
        assertTrue(deleteUser(99999));
    }
}

