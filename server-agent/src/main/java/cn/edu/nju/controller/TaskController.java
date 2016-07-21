package cn.edu.nju.controller;

import cn.edu.nju.datatables.Message;
import cn.edu.nju.datatables.RepairForm;
import cn.edu.nju.repository.MessageRepository;
import cn.edu.nju.repository.RepairFormRepository;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.task.ReceiveRequest;
import cn.edu.nju.servicedata.task.SubmitRequest;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by dell on 2016/7/20.
 */

@CrossOrigin
@RestController
public class TaskController {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    RepairFormRepository repairFormRepository;

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private TaskService taskService;

    private ProcessInstance processInstance;

    @RequestMapping(value = "/task/read/{id}", method = RequestMethod.GET, produces = "application/json")
    public SuccessResponse readMessage(@PathVariable long id){

        SuccessResponse successResponse=new SuccessResponse(true);

        if (!(messageRepository.exists(id))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        Message message = messageRepository.findOne(id);
        message.setStatus(1);
        messageRepository.save(message);

        return successResponse;

    }

    @RequestMapping(value = "/task/receive", method = RequestMethod.POST, produces = "application/json")
    public SuccessResponse ReceiveRepairforms(@RequestBody ReceiveRequest receiveRequest){

        SuccessResponse successResponse=new SuccessResponse(true);

        if (!(repairFormRepository.exists(receiveRequest.getId()))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        RepairForm repairForm = repairFormRepository.findOne(receiveRequest.getId());

        if (repairForm.getStatus()!=0){
            successResponse.setSuccess(false);
            successResponse.setInfo("The status must be unreceived.");

            return successResponse;
        }

        repairForm.setStatus(1);
        repairForm.setVisitTime(receiveRequest.getVisitTime());
        repairForm.setReceivedTime(new Date());

        //activiti相关
        Map<String, Object> vars=new HashMap<>();
        vars.put("state",0);
        processInstance = runtimeService.startProcessInstanceByKey("orderwithservice",vars);

        repairForm.setProcessId(processInstance.getId());

        repairFormRepository.save(repairForm);

        return successResponse;

    }

    @RequestMapping(value = "/task/unreceive/{id}", method = RequestMethod.GET, produces = "application/json")
    public SuccessResponse UnreceiveRepairforms(@PathVariable long id){

        SuccessResponse successResponse=new SuccessResponse(true);

        if (!(repairFormRepository.exists(id))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        RepairForm repairForm = repairFormRepository.findOne(id);

        if (repairForm.getStatus()!=1){
            successResponse.setSuccess(false);
            successResponse.setInfo("The status must be received.");

            return successResponse;
        }

        repairForm.setStatus(0);
        repairForm.setVisitTime(null);
        repairForm.setReceivedTime(null);

        //activiti相关
        runtimeService.deleteProcessInstance(repairForm.getProcessId(),"unreceive");
        repairForm.setProcessId(null);

        repairFormRepository.save(repairForm);

        return successResponse;

    }

    @RequestMapping(value = "/task/submit", method = RequestMethod.POST, produces = "application/json")
    public SuccessResponse SubmitRepairforms(@RequestBody SubmitRequest submitRequest){

        SuccessResponse successResponse=new SuccessResponse(true);

        if (!(repairFormRepository.exists(submitRequest.getId()))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        RepairForm repairForm = repairFormRepository.findOne(submitRequest.getId());

        if (repairForm.getStatus()!=1){
            successResponse.setSuccess(false);
            successResponse.setInfo("The status must be received.");

            return successResponse;
        }

        repairForm.setStatus(2);
        repairForm.setSerialNumber(submitRequest.getSerialNumber());
        repairForm.setFeedbackInfo(submitRequest.getFeedbackInfo());
        repairForm.setCompletedTime(new Date());

        //activiti相关
        Task task=taskService.createTaskQuery().processInstanceId(repairForm.getProcessId()).singleResult();
        taskService.complete(task.getId());

        repairFormRepository.save(repairForm);

        return successResponse;

    }

    @RequestMapping(value = "/task/check/{id}", method = RequestMethod.GET, produces = "application/json")
    public SuccessResponse CheckRepairforms(@PathVariable long id){

        SuccessResponse successResponse=new SuccessResponse(true);

        if (!(repairFormRepository.exists(id))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        RepairForm repairForm = repairFormRepository.findOne(id);

        if (repairForm.getStatus()!=2){
            successResponse.setSuccess(false);
            successResponse.setInfo("The status must be submitted.");

            return successResponse;
        }

        repairForm.setStatus(3);
        repairForm.setCheckedTime(new Date());

        //activiti相关
        Task task=taskService.createTaskQuery().processInstanceId(repairForm.getProcessId()).singleResult();
        taskService.complete(task.getId());

        repairFormRepository.save(repairForm);

        return successResponse;

    }

}
