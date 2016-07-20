package cn.edu.nju.controller;

import cn.edu.nju.datatables.Message;
import cn.edu.nju.respository.MessageRespository;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.messages.MessageCreateRequest;
import cn.edu.nju.servicedata.messages.MessageInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Wei Zhai on 2016/7/18.
 */

@CrossOrigin
@RestController
public class MessageController {

    @Autowired
    MessageRespository messageRespository;

    @RequestMapping(value = "/messages", method = RequestMethod.GET, produces = "application/json")
    public List<MessageInfoResponse> findMessages(){
        List<MessageInfoResponse> messageInfoResponses = new ArrayList<>();

        for (Message message : messageRespository.findAll()){
            messageInfoResponses.add(new MessageInfoResponse(message));
        }

        return messageInfoResponses;
    }

    @RequestMapping(value = "/messages/{id}", method = RequestMethod.GET, produces = "application/json")
    public MessageInfoResponse findMessageById(@PathVariable long id){
        return new MessageInfoResponse(messageRespository.findOne(id));
    }

    @RequestMapping(value = "/messages/byReceiverId/{id}", method = RequestMethod.GET, produces = "application/json")
    public MessageInfoResponse findMessagebyReceiverId(@PathVariable long id){
        return new MessageInfoResponse(messageRespository.findByReceiverId(id));
    }

    @RequestMapping(value = "/messages/create", method = RequestMethod.POST, produces = "application/json")
    public SuccessResponse createMessage(@RequestBody MessageCreateRequest messageCreateRequest){
        messageRespository.save(new Message(messageCreateRequest));

        return new SuccessResponse(true);
    }

    @RequestMapping(value = "/messages/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public SuccessResponse deleteMessage(@PathVariable long id){
        SuccessResponse successResponse = new SuccessResponse(true);

        if (!(messageRespository.exists(id))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The message do not exist.");

            return successResponse;
        }

        messageRespository.delete(id);

        successResponse.setSuccess(true);

        return successResponse;
    }
}
