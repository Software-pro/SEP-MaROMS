package cn.edu.nju;

import cn.edu.nju.datatables.User;
import com.google.gson.Gson;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.io.IOException;

import static org.junit.Assert.assertEquals;

import static cn.edu.nju.GlobalVar.host;
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

    @Test
    public void test01(){
        /**
         * test01(验证通过id查询单个人信息，id存在)
         * 输入：id = {1,101,201,301}
         * 预计输出：id = 1，  name = admin，      phone = 001，type = 0；
         *           id = 101，name = engineer，   phone = 101，type = 1；
         *           id = 201，name = saler，      phone = 201，type = 2；
         *           id = 301，name = distributor，phone = 301，type = 3；
         */
        testModel(1,"admin","001",0);
        testModel(101,"engineer","101",1);
        testModel(201,"saler","201",2);
        testModel(301,"distributor","301",3);
    }

    @Test
    public void test02() throws IOException {
        /**
         * test02(验证通过id查询单个人信息，id不存在))
         * 输入：id = 0
         * 预计输出：get请求发送失败
         */

        /**
         * 测试说明：对于不存在的id，服务器应返回相关错误信息。
         */

        /**预计结果*/
        String expectedInformation = "发送GET请求出现异常！";

        /**发送请求*/
        String returnInformation = HttpRequest.sendGet(url + 0, "");

        /**检查返回值跟预期值是否一致*/
        assertTrue(returnInformation.contains(expectedInformation));
    }
}
