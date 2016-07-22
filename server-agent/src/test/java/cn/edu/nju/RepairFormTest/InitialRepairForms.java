package cn.edu.nju.RepairFormTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.repairforms.RepairFormCreateRequest;
import cn.edu.nju.servicedata.repairforms.RepairFormInfoResponse;
import cn.edu.nju.servicedata.task.ReceiveRequest;
import cn.edu.nju.servicedata.task.SubmitRequest;
import com.google.gson.*;
import javafx.scene.input.DataFormat;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/20.
 */
public class InitialRepairForms {
    /**host值*/
    public static String host = "115.159.225.109";
    //public static String host = "localhost";

    /**gson日期序列化，在数据传递过程中Date值为一个long型数据*/
    static JsonSerializer< Date>  ser = new JsonSerializer< Date> () {
        @Override
        public JsonElement serialize(Date src, Type typeOfSrc, JsonSerializationContext
                context) {
            return src == null ? null : new JsonPrimitive(src.getTime());
        }
    };

    static JsonDeserializer< Date>  deser = new JsonDeserializer< Date> () {
        @Override
        public Date deserialize(JsonElement json, Type typeOfT,
                                JsonDeserializationContext context) throws JsonParseException {
            return json == null ? null : new Date(json.getAsLong());
        }
    };
    public static Gson gson = new GsonBuilder().registerTypeAdapter(Date.class,ser).registerTypeAdapter(Date.class,deser).create();



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

    public static boolean createReceivedRepairForms(
            int grade,               //分值
            int service,             //服务类型
            String clientName,       //客户名
            String clientPhone,      //客户电话
            String clientWorkplace,  //客户单位
            String clientAddress,    //客户地址
            long engineerId,         //工程师id
            long salerId,            //销售员id
            long distributorId,      //派单员id
            Date creationTime,       //报修单创建时间
            Date visitTime           //报修单服务
    ){
        if(!createRepairForms(grade, service, clientName, clientPhone, clientWorkplace, clientAddress, engineerId, salerId, distributorId, creationTime))
            return false;

        /**创建已接报修单*/
        String url = "http://"+host+"/task/receive";

        ReceiveRequest request = new ReceiveRequest();
        request.setId(getRepairFormsId(engineerId));
        request.setVisitTime(visitTime);

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
    public static boolean createCompeletedRepairForms(
            int grade,                //分值
            int service,              //服务类型
            String clientName,        //客户名
            String clientPhone,       //客户电话
            String clientWorkplace,   //客户单位
            String clientAddress,     //客户地址
            long engineerId,          //工程师id
            long salerId,             //销售员id
            long distributorId,       //派单员id
            Date creationTime,        //报修单创建时间
            Date visitTime,           //报修单服务
            String serialNumber,      //序列号
            String feedbackInfo       //反馈信息
    ){
        if(!createReceivedRepairForms(grade, service, clientName, clientPhone, clientWorkplace, clientAddress, engineerId, salerId, distributorId, creationTime,visitTime))
            return false;

        /**创建已完成报修单*/
        String url = "http://"+host+"/task/submit";

        SubmitRequest request = new SubmitRequest();
        request.setId(getRepairFormsId(engineerId));
        request.setSerialNumber(serialNumber);
        request.setFeedbackInfo(feedbackInfo);

        String postInformation = gson.toJson(request);
        System.out.println(postInformation);
        String returnInformation = HttpRequest.sendPost(url,postInformation);
        System.out.println(returnInformation);

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

    public static boolean createCheckedRepairForms(
            int grade,                //分值
            int service,              //服务类型
            String clientName,        //客户名
            String clientPhone,       //客户电话
            String clientWorkplace,   //客户单位
            String clientAddress,     //客户地址
            long engineerId,          //工程师id
            long salerId,             //销售员id
            long distributorId,       //派单员id
            Date creationTime,        //报修单创建时间
            Date visitTime,           //报修单服务
            String serialNumber,      //序列号
            String feedbackInfo       //反馈信息
    ){
        if(!createCompeletedRepairForms(grade, service, clientName, clientPhone, clientWorkplace, clientAddress, engineerId, salerId, distributorId, creationTime,visitTime,serialNumber,feedbackInfo))
            return false;

        /**创建已审核报修单*/
        String url = "http://"+host+"/task/check/";

        long id = getRepairFormsId(engineerId);

        String returnInformation = HttpRequest.sendGet(url+id,"");

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
        String returnInformation = HttpRequest.sendGet(url,"");

        JsonParser jsonParser = new JsonParser();
        JsonElement jsonElement = jsonParser.parse(returnInformation);
        JsonArray jsonArray = jsonElement.getAsJsonArray();

        Iterator iterator = jsonArray.iterator();
        while(iterator.hasNext()) {
            JsonElement element = (JsonElement) iterator.next();
            return gson.fromJson(gson.toJson(element),RepairFormInfoResponse.class).getId();
        }
        return -1;
    }

    public static boolean deleteRepairForm(long id){
        /**删除报修单*/
        String url = "http://"+host+"/repairforms/delete/"+id;

        String returnInformation = HttpRequest.sendGet(url,"");
        SuccessResponse temp = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(temp);

        SuccessResponse expect = new SuccessResponse(true);
        expect.setInfo(null);
        String expectedInformation = gson.toJson(expect);

        return expectedInformation.equals(returnInformation);
    }


}
