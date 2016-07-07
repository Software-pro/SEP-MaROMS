package cn.edu.nju.rest.service.api;

import cn.edu.nju.rest.service.api.login.LoginResponse;

/**
 * Created by dell on 2016/7/7.
 */
public class RestResponseFactory {

    public LoginResponse createLoginResponse(boolean success){
        LoginResponse response = new LoginResponse(success);
        return response;
    }

}
