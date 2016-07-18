package cn.edu.nju;

import cn.edu.nju.servicedata.users.LoginRequest;
import cn.edu.nju.servicedata.users.LoginResponse;
import net.sf.json.JSONObject;
import org.junit.Test;

import static cn.edu.nju.GlobalVar.host;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 * Created by chezeyu on 2016/7/18.
 */
public class GetUserListTest {

    /**
     * loginTest:验证用户登录。
     */
    private static String url = "http://"+host+"/users";

    @Test
    public void test01(){
        /**
         * test01(验证是否能得到用户列表)
         * 输入：发送get请求
         * 预计输出：得到用户列表
         */

        /**发送请求*/
        String ret = HttpRequest.sendGet(url,"");

        /**打印列表信息在控制台查看*/
        System.out.println(ret);

        /**检查返回值跟预期值是否位空*/
        assertNotNull(ret);
    }
}
