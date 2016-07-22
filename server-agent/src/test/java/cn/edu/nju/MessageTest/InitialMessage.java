package cn.edu.nju.MessageTest;

import cn.edu.nju.HttpRequest;
import cn.edu.nju.UserTest.InitialUser;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.messages.MessageCreateRequest;

import cn.edu.nju.servicedata.messages.MessageInfoResponse;
import com.google.gson.*;

import java.lang.reflect.Type;
import java.util.Date;
import java.util.Iterator;

import static cn.edu.nju.RepairFormTest.InitialRepairForms.gson;
import static org.junit.Assert.assertTrue;

/**
 * Created by chezeyu on 2016/7/21.
 */
public class InitialMessage {
    /**
     *  MessageTest：消息测试
     */
    /**host值*/
    //static String host = "115.159.225.109";
    public static String host = "localhost";

    /**gson日期序列化，在数据传递过程中Date值为一个long型数据*/
    static JsonSerializer< Date> ser = new JsonSerializer< Date> () {
        @Override
        public JsonElement serialize(Date src, Type typeOfSrc, JsonSerializationContext
                context) {
            return src == null ? null : new JsonPrimitive(src.getTime());
        }
    };

    static JsonDeserializer< Date> deser = new JsonDeserializer< Date> () {
        @Override
        public Date deserialize(JsonElement json, Type typeOfT,
                                JsonDeserializationContext context) throws JsonParseException {
            return json == null ? null : new Date(json.getAsLong());
        }
    };
    public static Gson gson = new GsonBuilder().registerTypeAdapter(Date.class,ser).registerTypeAdapter(Date.class,deser).create();


    public static boolean createMessage(int type,long infoId,long receiverId,Date time,String content){
        /**创建消息*/
        String url = "http://"+host+"/messages/create";
        MessageCreateRequest request = new MessageCreateRequest();
        request.setType(type);
        request.setInfoId(infoId);
        request.setReceiverId(receiverId);
        request.setTime(time);
        request.setContent(content);

        String postInformation = gson.toJson(request);
        String returnInformation = HttpRequest.sendPost(url,postInformation);
        SuccessResponse response = gson.fromJson(returnInformation,SuccessResponse.class);
        returnInformation = gson.toJson(response);

        SuccessResponse expect = new SuccessResponse(true);
        expect.setInfo(null);
        String expectedInformation = gson.toJson(expect);

        return expectedInformation.equals(returnInformation);
    }

    public static long getMessageId(long receiverId){
        /**查询消息Id*/
        String url = "http://"+host+"/messages/byReceiverId/"+receiverId;
        String returnInformation = HttpRequest.sendGet(url,"");

        JsonParser jsonParser = new JsonParser();
        JsonElement jsonElement = jsonParser.parse(returnInformation);
        JsonArray jsonArray = jsonElement.getAsJsonArray();

        Iterator iterator = jsonArray.iterator();
        while(iterator.hasNext()){
            JsonElement element = (JsonElement)iterator.next();
            return gson.fromJson(gson.toJson(element), MessageInfoResponse.class).getId();
        }
        return -1;
    }
    
    public static int getMessageStatus(long receiverId){
    	/**查询报修单状态*/
    	String url = "http://"+host+"/messages/byReceiverId/"+receiverId;
        String returnInformation = HttpRequest.sendGet(url,"");

        JsonParser jsonParser = new JsonParser();
        JsonElement jsonElement = jsonParser.parse(returnInformation);
        JsonArray jsonArray = jsonElement.getAsJsonArray();

        Iterator iterator = jsonArray.iterator();
        while(iterator.hasNext()){
            JsonElement element = (JsonElement)iterator.next();
            return gson.fromJson(gson.toJson(element), MessageInfoResponse.class).getStatus();
        }
        return -1;
    }
    public static boolean deleteMessage(long messageId){
    	/**删除消息*/
    	 String url = "http://"+host+"/messages/delete/"+messageId;
         String returnInformation = HttpRequest.sendGet(url,"");
         SuccessResponse response = gson.fromJson(returnInformation,SuccessResponse.class);
         returnInformation = gson.toJson(response);

         SuccessResponse expect = new SuccessResponse(true);
         expect.setInfo(null);
         String expectedInformation = gson.toJson(expect);

         return expectedInformation.equals(returnInformation);
    }
    
}
