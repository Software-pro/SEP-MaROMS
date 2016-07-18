package cn.edu.nju.controller;

import cn.edu.nju.datatables.RepairForm;
import cn.edu.nju.respository.RepairFormRespository;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.repairforms.ChangeGradeRequest;
import cn.edu.nju.servicedata.repairforms.RepairFormCreateRequest;
import cn.edu.nju.servicedata.repairforms.RepairFormEditRequest;
import cn.edu.nju.servicedata.repairforms.RepairFormInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by dell on 2016/7/16.
 */

@CrossOrigin
@RestController
public class RepairFormController {

    @Autowired
    RepairFormRespository repairFormRespository;

    @RequestMapping(value = "/repairforms", method = RequestMethod.GET, produces = "application/json")
    public List<RepairFormInfoResponse> repairforms() {

        List<RepairFormInfoResponse> repairForms = new ArrayList<>();

        for (RepairForm repairForm:repairFormRespository.findAll()){

            repairForms.add(new RepairFormInfoResponse(repairForm));
        }

        return repairForms;
    }

    @RequestMapping(value = "/repairforms/{id}", method = RequestMethod.GET, produces = "application/json")
    public RepairFormInfoResponse findRepairformsById(@PathVariable long id) {
        RepairForm repairForm=repairFormRespository.findOne(id);

        return new RepairFormInfoResponse(repairForm);
    }

    @RequestMapping(value = "/repairforms/byEngineerId/{id}", method = RequestMethod.GET, produces = "application/json")
    public RepairFormInfoResponse findRepairformsByEngineerId(@PathVariable long id) {
        RepairForm repairForm=repairFormRespository.findByEngineerId(id);

        return new RepairFormInfoResponse(repairForm);
    }

    @RequestMapping(value = "/repairforms/bySalerId/{id}", method = RequestMethod.GET, produces = "application/json")
    public RepairFormInfoResponse findRepairformsBySalerId(@PathVariable long id) {
        RepairForm repairForm=repairFormRespository.findBySalerId(id);

        return new RepairFormInfoResponse(repairForm);
    }

    @RequestMapping(value = "/repairforms/create", method = RequestMethod.POST, produces = "application/json")
    public SuccessResponse createRepairform(@RequestBody RepairFormCreateRequest repairFormCreateRequest){
        RepairForm repairForm=new RepairForm(repairFormCreateRequest);

        repairFormRespository.save(repairForm);

        return new SuccessResponse(true);
    }

    @RequestMapping(value = "/repairforms/edit", method = RequestMethod.POST, produces = "application/json")
    public SuccessResponse editRepairform(@RequestBody RepairFormEditRequest repairFormEditRequest){
        SuccessResponse successResponse = new SuccessResponse();

        if (!(repairFormRespository.exists(repairFormEditRequest.getId()))) {
            successResponse.setSuccess(false);
            successResponse.setInfo("The repairform do not exist.");

            return successResponse;
        }

        RepairForm repairForm=new RepairForm(repairFormEditRequest);

        if (repairForm.getStatus()!=0) {
            successResponse.setSuccess(false);
            successResponse.setInfo("The repairform need to be not accepted.");

            return successResponse;
        }

        repairFormRespository.save(repairForm);

        successResponse.setSuccess(true);

        return successResponse;
    }

    @RequestMapping(value = "/repairforms/changeGrade", method = RequestMethod.POST, produces = "application/json")
    public SuccessResponse changeGrade(@RequestBody ChangeGradeRequest changeGradeRequest){
        SuccessResponse successResponse = new SuccessResponse();

        if (!(repairFormRespository.exists(changeGradeRequest.getId()))) {
            successResponse.setSuccess(false);
            successResponse.setInfo("The repairform do not exist.");

            return successResponse;
        }

        RepairForm repairForm = repairFormRespository.findOne(changeGradeRequest.getId());

        repairForm.setGrade(changeGradeRequest.getGrade());

        repairFormRespository.save(repairForm);

        successResponse.setSuccess(true);

        return successResponse;

    }

    @RequestMapping(value = "/repairforms/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public SuccessResponse deleteRepairform(@PathVariable long id) {
        SuccessResponse successResponse = new SuccessResponse();

        if (!(repairFormRespository.exists(id))) {
            successResponse.setSuccess(false);
            successResponse.setInfo("The repairform do not exist.");

            return successResponse;
        }

        repairFormRespository.delete(id);

        successResponse.setSuccess(true);
        return successResponse;
    }



}
