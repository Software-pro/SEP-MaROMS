package cn.edu.nju.controller;

import cn.edu.nju.datatables.RepairForm;
import cn.edu.nju.respository.RepairFormRespository;
import cn.edu.nju.servicedata.RepairFormInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by dell on 2016/7/16.
 */

@CrossOrigin
@RestController
public class RepairFormController {

    @Autowired
    RepairFormRespository repairFormRespository;

    @RequestMapping(value = "/repairforms", method = RequestMethod.GET, produces = "application/json")
    public RepairFormInfoResponse repairforms() {

        Iterable iterable = repairFormRespository.findAll();

        RepairForm repairForm = (RepairForm) iterable.iterator().next();

        RepairFormInfoResponse repairFormInfoResponse = new RepairFormInfoResponse(repairForm);

        return repairFormInfoResponse;
    }

}
