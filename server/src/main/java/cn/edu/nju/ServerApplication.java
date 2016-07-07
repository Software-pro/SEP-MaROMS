package cn.edu.nju;

import cn.edu.nju.rest.service.api.login.LoginRequest;
import cn.edu.nju.rest.service.api.RestResponseFactory;

import cn.edu.nju.rest.service.api.login.LoginResponse;
import org.activiti.engine.ActivitiIllegalArgumentException;
import org.activiti.engine.IdentityService;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
import org.activiti.engine.impl.util.json.JSONArray;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@RestController
	public static class MyRestController {

		@Autowired
		protected IdentityService identityService;

		@Bean
		InitializingBean usersAndGroupsInitializer(final IdentityService identityService) {

			return new InitializingBean() {
				public void afterPropertiesSet() throws Exception {

					Group group = identityService.newGroup("user");
					group.setName("users");
					group.setType("security-role");
					identityService.saveGroup(group);

					User admin = identityService.newUser("admin");
					admin.setPassword("admin");
					identityService.saveUser(admin);

				}
			};
		}

		@RequestMapping(value = "/",method = RequestMethod.GET)
		public String hello(){
			return "Hello guys! We made it!";
		}


		@RequestMapping(value = "/login",method = RequestMethod.POST,produces = "application/json")
		public LoginResponse loginJudge(@RequestBody LoginRequest loginRequest, HttpServletRequest request, HttpServletResponse response) {
			if (loginRequest.getId() == null) {
				throw new ActivitiIllegalArgumentException("Id cannot be null.");
			}

			response.setStatus(HttpStatus.CREATED.value());

			boolean success = identityService.checkPassword(loginRequest.getId(),loginRequest.getPassword());

			LoginResponse loginResponse=new LoginResponse(success);

			return loginResponse;
		}



	}

}
