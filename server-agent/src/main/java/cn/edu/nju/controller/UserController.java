package cn.edu.nju.controller;

import cn.edu.nju.datatables.User;
import cn.edu.nju.respository.UserRespository;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.UserCreateRequest;
import cn.edu.nju.servicedata.UserInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Wei Zhai on 2016/7/14.
 */

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    UserRespository userRespository;

    @RequestMapping(value = "/users/create",method = RequestMethod.POST,produces = "application/json")
    public SuccessResponse createUser(@RequestBody UserCreateRequest userCreateRequest){

        long id = userCreateRequest.getId();
        String name = userCreateRequest.getName();
        String password = userCreateRequest.getPassword();
        String phone = userCreateRequest.getPhone();
        int type = userCreateRequest.getType();

        User user = new User(id,name,password,type);
        user.setPhone(phone);

        User check=userRespository.save(user);

        return new SuccessResponse(check.getId()==id);

    }


    @RequestMapping(value = "/users/{userName}",method = RequestMethod.GET,produces = "application/json")
    public UserInfoResponse findUserInfo(@PathVariable("userName") String userName){

        User result = userRespository.findByName(userName);

        UserInfoResponse userInfoResponse=new UserInfoResponse();

        userInfoResponse.setId(result.getId());
        userInfoResponse.setName(result.getName());
        userInfoResponse.setPhone(result.getPhone());
        userInfoResponse.setType(result.getType());

        return userInfoResponse;

    }

}
