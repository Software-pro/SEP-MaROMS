package cn.edu.nju.controller;

import cn.edu.nju.datatables.User;
import cn.edu.nju.respository.UserRespository;
import cn.edu.nju.servicedata.SuccessResponse;
import cn.edu.nju.servicedata.UserCreateRequest;
import cn.edu.nju.servicedata.UserInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Wei Zhai on 2016/7/14.
 */

@CrossOrigin
@RestController
public class UserController {

    @Autowired
    UserRespository userRespository;

    @RequestMapping(value = "/users",method = RequestMethod.GET,produces = "application/json")
    public List<UserInfoResponse> findUsers(){

        Iterable<User> all = userRespository.findAll();

        List<UserInfoResponse> users=new ArrayList<UserInfoResponse>();

        for (Iterator<User> user=all.iterator();user.hasNext();){
            UserInfoResponse userInfo=new UserInfoResponse();

            User user_t=user.next();
            userInfo.setPhone(user_t.getPhone());
            userInfo.setName(user_t.getName());
            userInfo.setId(user_t.getId());
            userInfo.setType(user_t.getType());

            users.add(userInfo);
        }

        System.out.println();

        return users;

    }

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


    @RequestMapping(value = "/users/{id}",method = RequestMethod.GET,produces = "application/json")
    public UserInfoResponse findUserInfo(@PathVariable("id") long id){

        User result = userRespository.findById(id);

        UserInfoResponse userInfoResponse=new UserInfoResponse();

        userInfoResponse.setId(result.getId());
        userInfoResponse.setName(result.getName());
        userInfoResponse.setPhone(result.getPhone());
        userInfoResponse.setType(result.getType());

        return userInfoResponse;

    }

}
