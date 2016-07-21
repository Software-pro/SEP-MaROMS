package cn.edu.nju.controller;

import cn.edu.nju.datatables.RepairForm;
import cn.edu.nju.repository.RepairFormRepository;
import cn.edu.nju.servicedata.SuccessResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.sql.rowset.serial.SerialBlob;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.sql.Blob;

/**
 * Created by dell on 2016/7/21.
 */

@CrossOrigin
@RestController
public class ImgController {

    @Autowired
    RepairFormRepository repairFormRepository;

    @RequestMapping(value = "/upload/{id}/img",method = RequestMethod.POST, consumes = "image/jpeg",produces = "application/json")
    public SuccessResponse uploadImg (@PathVariable long id, HttpServletRequest request) throws Exception {
        SuccessResponse successResponse = new SuccessResponse(true);

        if (!(repairFormRepository.exists(id)))  {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The id do not exist.");

            return successResponse;
        }


        BufferedReader bufferedReader=new BufferedReader(new InputStreamReader(request.getInputStream()));

        StringBuilder stringBuilder=new StringBuilder();
        String line;

        while ((line=bufferedReader.readLine())!=null){
            stringBuilder.append(line);
        }

        Blob blob=new SerialBlob(stringBuilder.toString().getBytes());

        RepairForm repairForm = repairFormRepository.findOne(id);

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
    public Blob getImgs(@PathVariable long id){
//        List<Blob> blobs=new ArrayList<>();
        RepairForm repairForm = repairFormRepository.findOne(id);
//        switch (repairForm.getImgSize()){
//            case 0:
//                break;
//            case 1:
//                blobs.add(repairForm.getImg1());
//                break;
//            case 2:
//                blobs.add(repairForm.getImg1());
//                blobs.add(repairForm.getImg2());
//                break;
//            case 3:
//                blobs.add(repairForm.getImg1());
//                blobs.add(repairForm.getImg2());
//                blobs.add(repairForm.getImg3());
//                break;
//            default:
//                System.out.println("Why it is more than 3?");
//        }
//
//        return blobs;
        return repairForm.getImg1();
    }

}
