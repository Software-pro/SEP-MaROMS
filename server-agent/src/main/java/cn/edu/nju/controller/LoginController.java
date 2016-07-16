package cn.edu.nju.controller;

import cn.edu.nju.datatables.User;
import cn.edu.nju.respository.UserRespository;
import cn.edu.nju.servicedata.LoginRequest;
import cn.edu.nju.servicedata.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by dell on 2016/7/16.
 */

@CrossOrigin
@RestController
public class LoginController {

    @Autowired
    UserRespository userRespository;

    @RequestMapping(value = "/login",method = RequestMethod.POST,produces = "application/json")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) throws Exception{

        User user = userRespository.findById(loginRequest.getId());

        LoginResponse loginResponse;

        if(user==null){
            loginResponse=new LoginResponse(false,-1,"The user do not exists.");
            return loginResponse;
        }

        if (!(loginRequest.getPassword().equals(user.getPassword()))){
            loginResponse=new LoginResponse(false,-1,"Wrong password.");
            return loginResponse;
        }

        loginResponse = new LoginResponse(true,0,null);

        return loginResponse;
    }


}
