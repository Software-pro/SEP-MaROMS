package cn.edu.nju.controller;

import cn.edu.nju.datatables.RepairForm;
import cn.edu.nju.repository.RepairFormRepository;
import cn.edu.nju.servicedata.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.sql.rowset.serial.SerialBlob;
import java.io.BufferedReader;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by dell on 2016/7/21.
 */

@CrossOrigin
@RestController
public class UploadController {

    @Autowired
    RepairFormRepository repairFormRepository;

    @RequestMapping(value = "/upload/{id}/img",method = RequestMethod.POST, consumes = "image/jpeg")
    public SuccessResponse uploadImg (@PathVariable long id, HttpServletRequest request) throws Exception {
        SuccessResponse successResponse = new SuccessResponse(true);

        if (!(repairFormRepository.exists(id)))  {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }

        RepairForm repairForm = repairFormRepository.findOne(id);

        BufferedReader bufferedReader=request.getReader();

        String buffer="";
        String temp;
        while ((temp=bufferedReader.readLine())!= null){
            buffer+=temp;
        }

        Blob blob=new SerialBlob(buffer.getBytes());

        switch (repairForm.getImgSize()){
            case 0:
                repairForm.setImg1(blob);
                repairForm.addImgSize();
                break;
            case 1:
                repairForm.setImg2(blob);
                repairForm.addImgSize();
                break;
            case 2:
                repairForm.setImg3(blob);
                repairForm.addImgSize();
                break;
            default:
                System.out.println("There must be at most three pictures.");
        }

        repairFormRepository.save(repairForm);

        return successResponse;
    }

    @RequestMapping(value = "/get/{id}/img",method = RequestMethod.GET, produces = "image/jpeg")
    public List<Blob> getImgs(@PathVariable long id){
        List<Blob> blobs=new ArrayList<>();
        RepairForm repairForm = repairFormRepository.findOne(id);
        switch (repairForm.getImgSize()){
            case 1:
                blobs.add(repairForm.getImg1());
                break;
            case 2:
                blobs.add(repairForm.getImg1());
                blobs.add(repairForm.getImg2());
                break;
            case 3:
                blobs.add(repairForm.getImg1());
                blobs.add(repairForm.getImg2());
                blobs.add(repairForm.getImg3());
                break;
            default:
                System.out.println("Why it is more than 3?");
        }

        return blobs;
    }

}
