package cn.edu.nju.controller;

import cn.edu.nju.datatables.Message;
import cn.edu.nju.datatables.RepairForm;
import cn.edu.nju.respository.MessageRespository;
import cn.edu.nju.respository.RepairFormRespository;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.task.ReceiveRequest;
import cn.edu.nju.servicedata.task.SubmitRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by dell on 2016/7/20.
 */

@CrossOrigin
@RestController
public class TaskController {

    @Autowired
    MessageRespository messageRespository;

    @Autowired
    RepairFormRespository repairFormRespository;

    @RequestMapping(value = "/task/read/{id}", method = RequestMethod.GET, produces = "application/json")
    public SuccessResponse readMessage(@PathVariable long id){

        SuccessResponse successResponse=new SuccessResponse(true);

        if (!(messageRespository.exists(id))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        Message message = messageRespository.findOne(id);
        message.setStatus(1);
        messageRespository.save(message);

        return successResponse;

    }

    @RequestMapping(value = "/task/receive", method = RequestMethod.POST, produces = "application/json")
    public SuccessResponse ReceiveRepairforms(@RequestBody ReceiveRequest receiveRequest){

        SuccessResponse successResponse=new SuccessResponse(true);

        if (!(repairFormRespository.exists(receiveRequest.getId()))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        RepairForm repairForm = repairFormRespository.findOne(receiveRequest.getId());

        if (repairForm.getStatus()!=0){
            successResponse.setSuccess(false);
            successResponse.setInfo("The status must be unreceived.");

            return successResponse;
        }

        repairForm.setStatus(1);
        repairForm.setVisitTime(receiveRequest.getDate());

        repairFormRespository.save(repairForm);

        return successResponse;

    }

    @RequestMapping(value = "/task/unreceive/{id}", method = RequestMethod.GET, produces = "application/json")
    public SuccessResponse UnreceiveRepairforms(@PathVariable long id){

        SuccessResponse successResponse=new SuccessResponse(true);

        if (!(repairFormRespository.exists(id))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        RepairForm repairForm = repairFormRespository.findOne(id);

        if (repairForm.getStatus()!=1){
            successResponse.setSuccess(false);
            successResponse.setInfo("The status must be received.");

            return successResponse;
        }

        repairForm.setStatus(0);
        repairForm.setVisitTime(null);

        repairFormRespository.save(repairForm);

        return successResponse;

    }

    @RequestMapping(value = "/task/submit", method = RequestMethod.POST, produces = "application/json")
    public SuccessResponse SubmitRepairforms(@RequestBody SubmitRequest submitRequest){

        SuccessResponse successResponse=new SuccessResponse(true);

        if (!(repairFormRespository.exists(submitRequest.getId()))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        RepairForm repairForm = repairFormRespository.findOne(submitRequest.getId());

        if (repairForm.getStatus()!=1){
            successResponse.setSuccess(false);
            successResponse.setInfo("The status must be received.");

            return successResponse;
        }

        repairForm.setStatus(2);
        repairForm.setSerialNumber(submitRequest.getSerialNumber());
        repairForm.setFeedbackInfo(submitRequest.getFeedbackInfo());

        repairFormRespository.save(repairForm);

        return successResponse;

    }

    @RequestMapping(value = "/task/check/{id}", method = RequestMethod.GET, produces = "application/json")
    public SuccessResponse CheckRepairforms(@PathVariable long id){

        SuccessResponse successResponse=new SuccessResponse(true);

        if (!(repairFormRespository.exists(id))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        RepairForm repairForm = repairFormRespository.findOne(id);

        if (repairForm.getStatus()!=2){
            successResponse.setSuccess(false);
            successResponse.setInfo("The status must be submitted.");

            return successResponse;
        }

        repairForm.setStatus(3);

        repairFormRespository.save(repairForm);

        return successResponse;

    }

}
