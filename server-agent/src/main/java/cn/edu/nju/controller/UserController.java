package cn.edu.nju.controller;

import cn.edu.nju.datatables.RepairForm;
import cn.edu.nju.datatables.User;
import cn.edu.nju.repository.RepairFormRepository;
import cn.edu.nju.repository.UserRepository;
import cn.edu.nju.servicedata.*;
import cn.edu.nju.servicedata.users.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Wei Zhai on 2016/7/14.
 */

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RepairFormRepository repairFormRepository;

    @RequestMapping(value = "/users", method = RequestMethod.GET, produces = "application/json")
    public List<UserInfoResponse> findUsers() {

        List<UserInfoResponse> users = new ArrayList<>();

        for (User user : userRepository.findAll()) {

            users.add(new UserInfoResponse(user));
        }

        return users;

    }

    @RequestMapping(value = "/users/create", method = RequestMethod.POST, produces = "application/json")
    public SuccessResponse createUser(@RequestBody UserCreateRequest userCreateRequest) {

        SuccessResponse successResponse;

        if (userRepository.exists(userCreateRequest.getId())) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The userId exists.");

            return successResponse;
        }

        User user = new User(userCreateRequest);

        User check = userRepository.save(user);

        return new SuccessResponse(check.getId() == user.getId());

    }


    @RequestMapping(value = "/users/{id}", method = RequestMethod.GET, produces = "application/json")
    public UserInfoResponse findUserInfo(@PathVariable("id") long id) {

        User user = userRepository.findOne(id);

        return new UserInfoResponse(user);

    }

    @RequestMapping(value = "/users/delete/{id}", method = RequestMethod.GET, produces = "application/json")
    public SuccessResponse deleteUser(@PathVariable("id") long id) {

        SuccessResponse successResponse = new SuccessResponse(true);

        if (!(userRepository.exists(id))) {
            successResponse = new SuccessResponse(false);
            successResponse.setInfo("The user do not exist.");

            return successResponse;
        }

        userRepository.delete(id);

        return successResponse;
    }

    @RequestMapping(value = "/users/password/{id}", method = RequestMethod.GET, produces = "application/json")
    public PasswordResponse findPassword(@PathVariable("id") long id) {

        PasswordResponse passwordResponse = new PasswordResponse();

        if (!(userRepository.exists(id))) {
            passwordResponse.setSuccess(false);
            passwordResponse.setInfo("The user do not exist.");

            return passwordResponse;
        }

        passwordResponse.setSuccess(true);
        passwordResponse.setPassword(userRepository.findOne(id).getPassword());

        return passwordResponse;
    }

    @RequestMapping(value = "/users/password/change", method = RequestMethod.POST, produces = "application/json")
    public SuccessResponse changePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {

        SuccessResponse successResponse = new SuccessResponse();

        if (!(userRepository.exists(passwordChangeRequest.getId()))) {
            successResponse.setSuccess(false);
            successResponse.setInfo("The user do not exist.");

            return successResponse;
        }

        User user = userRepository.findOne(passwordChangeRequest.getId());

        if (!(user.getPassword().equals(passwordChangeRequest.getOldPassword()))) {
            successResponse.setSuccess(false);
            successResponse.setInfo("The old password is wrong.");

            return successResponse;
        }

        user.setPassword(passwordChangeRequest.getNewPassword());

        userRepository.save(user);

        successResponse.setSuccess(true);

        return successResponse;
    }

    @RequestMapping(value = "/users/getGrade/{id}", method = RequestMethod.GET, produces = "application/json")
    public GradeResponse getGrade(@PathVariable long id){
        GradeResponse gradeResponse=new GradeResponse();

        if (!(userRepository.exists(id))) {
            gradeResponse.setSuccess(false);
            gradeResponse.setInfo("The id do not exist.");

            return gradeResponse;
        }

        User user = userRepository.findOne(id);

        int[] grade=new int[12];

        for (int i=0;i<=11;i++){
            grade[i]=0;
        }

        if (user.getType()==1){
            for (RepairForm repairForm: repairFormRepository.findGradeByEngineerId(user.getId())){
                System.out.println(repairForm.getCompletedTime().getMonth());
                grade[repairForm.getCompletedTime().getMonth()]+=repairForm.getGrade();
            }
        }else if (user.getType()==2){
            for (RepairForm repairForm: repairFormRepository.findGradeBySalerId(user.getId())){
                System.out.println(repairForm.getCompletedTime().getMonth());
                grade[repairForm.getCompletedTime().getMonth()]+=repairForm.getGrade();
            }
        }else{
            gradeResponse.setSuccess(false);
            gradeResponse.setInfo("The user must be an engineer or a saler.");

            return gradeResponse;
        }

        gradeResponse.setSuccess(true);
        String result=Arrays.toString(grade).replace(", ","_");
        result=result.replace("[","");
        result=result.replace("]","");
        gradeResponse.setGrade(result);

        return gradeResponse;
    }

}
