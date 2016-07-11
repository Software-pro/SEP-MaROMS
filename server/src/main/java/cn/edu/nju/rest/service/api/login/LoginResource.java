package cn.edu.nju.rest.service.api.login;

import org.activiti.engine.ActivitiIllegalArgumentException;
import org.activiti.engine.IdentityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by zhaiwei on 2016/7/7.
 */

@RestController
public class LoginResource {

    @Autowired
    protected IdentityService identityService;

    @RequestMapping(value = "/login",method = RequestMethod.POST,produces = "application/json")
    public LoginResponse loginJudge(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
        if (loginRequest.getId() == null) {
            throw new ActivitiIllegalArgumentException("Id cannot be null.");
        }

        response.setStatus(HttpStatus.CREATED.value());

        boolean success = identityService.checkPassword(loginRequest.getId(),loginRequest.getPassword());

        return new LoginResponse(success);
    }
}
