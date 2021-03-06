package cn.edu.nju.controller;

import cn.edu.nju.datatables.User;
import cn.edu.nju.repository.UserRepository;
import cn.edu.nju.servicedata.users.LoginRequest;
import cn.edu.nju.servicedata.users.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Created by dell on 2016/7/16.
 */

@CrossOrigin
@RestController
public class LoginController {

    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/login",method = RequestMethod.POST,produces = "application/json")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) throws Exception{

        User user = userRepository.findOne(loginRequest.getId());

        LoginResponse loginResponse;

        if(user==null){
            loginResponse=new LoginResponse(false, "The user do not exists.", -1);
            return loginResponse;
        }

        if (!(loginRequest.getPassword().equals(user.getPassword()))){
            loginResponse=new LoginResponse(false, "Wrong password.", -1);
            return loginResponse;
        }

        loginResponse = new LoginResponse(true, null, user.getType());

        return loginResponse;
    }


}
