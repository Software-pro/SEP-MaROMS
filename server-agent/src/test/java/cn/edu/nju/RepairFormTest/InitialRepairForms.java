package cn.edu.nju.RepairFormTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.repairforms.RepairFormCreateRequest;
import com.google.gson.Gson;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/20.
 */
public class InitialRepairForms {
    /**host值*/
    //static String host = "115.159.225.109";
    public static String host = "localhost";

    public static boolean createRepairForms(
             int grade,               //分值
             int service,             //服务类型
             String clientName,       //客户名
             String clientPhone,      //客户电话
             String clientWorkplace,  //客户单位
             String clientAddress,    //客户地址
             long engineerId,         //工程师id
             long salerId,            //销售员id
             long distributorId,      //派单员id
             Date creationTime        //保修单创建时间
    ){
        /**
         * 创建保修单
         */
        String url = "http://"+host+"/repairforms/create";

        RepairFormCreateRequest request = new RepairFormCreateRequest();
        request.setGrade(grade);
        request.setService(service);
        request.setClientName(clientName);
        request.setClientPhone(clientPhone);
        request.setClientWorkplace(clientWorkplace);
        request.setClientAddress(clientAddress);
        request.setEngineerId(engineerId);
        request.setSalerId(salerId);
        request.setDistributorId(distributorId);
        request.setCreationTime(creationTime);

        Gson gson = new Gson();
        String postInformation = gson.toJson(request);
        String returnInformation = HttpRequest.sendPost(url,postInformation);
        SuccessResponse response = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(response);

        SuccessResponse expect = new SuccessResponse(true);
        expect.setInfo(null);
        String expectedInformation = gson.toJson(expect);

        if(expectedInformation.equals(returnInformation))
            return true;
        else
            return false;

    }

    public static long getRepairFormsId(long id){
         /**通过工程师ID查看特定保修单ID*/
        String url = "http://"+host+"/repairforms/byEngineerId/"+id;
        String retrunInformation = HttpRequest.sendGet(url,"");
        return 0;
    }

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
    public void test(){
        Date date = new Date();
        assertTrue(createRepairForms(111,111,"chezeyu","18651615328","Nanjing University","Nanjing University",99998,99997,99996,date));
    }
}
