package cn.edu.nju;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import static cn.edu.nju.GlobalVar.host;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/18.
 */
public class GetUserListTest {

    /**
     * loginTest:验证用户登录。
     */
    private static String url = "http://"+host+"/users";

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
