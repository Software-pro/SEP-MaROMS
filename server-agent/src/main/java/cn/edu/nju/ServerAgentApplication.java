package cn.edu.nju;

import cn.edu.nju.datatables.Message;
import cn.edu.nju.datatables.RepairForm;
import cn.edu.nju.datatables.User;
import cn.edu.nju.repository.MessageRepository;
import cn.edu.nju.repository.RepairFormRepository;
import cn.edu.nju.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;


@SpringBootApplication
public class ServerAgentApplication {


    public static void main(String[] args) {
        SpringApplication.run(ServerAgentApplication.class, args);
    }

    @Autowired
    UserRepository userRepository;

    @Autowired
    RepairFormRepository repairFormRepository;

    @Autowired
    MessageRepository messageRepository;

    @Bean
    public CommandLineRunner databaseInitializer() {
        return (args) -> {
            userRepository.save(new User(1, "admin", "admin", "001", 0));
            userRepository.save(new User(101, "engineer", "engineer", "101", 1));
            userRepository.save(new User(201, "saler", "saler", "201", 2));
            userRepository.save(new User(301, "distributor", "distributor", "301", 3));

            repairFormRepository.save(new RepairForm(
                    0,20,0,
                    "zavier","15850538991","Nanjing university","Mars",
                    101,201,301,new Date()
            ));

            messageRepository.save(new Message(0,1,1,new Date(),null));

        };
    }

}
