package cn.edu.nju;

import cn.edu.nju.datatables.User;
import cn.edu.nju.respository.UserRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class ServerAgentApplication {


	public static void main(String[] args) {
		SpringApplication.run(ServerAgentApplication.class, args);
	}

	@Autowired
	UserRespository userRespository;

	@Bean
	public CommandLineRunner databaseInitializer(){
		return (args)-> {
			userRespository.save(new User(1,"admin","admin",0));
			userRespository.save(new User(101,"engineer","engineer",1));
			userRespository.save(new User(201,"saler","saler",2));
			userRespository.save(new User(301,"distributor","distributor",3));
		};
	}

}
