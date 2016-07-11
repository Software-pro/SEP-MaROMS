package cn.edu.nju;


import org.activiti.engine.IdentityService;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@RestController
	public static class MyRestController {



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


	}

}
