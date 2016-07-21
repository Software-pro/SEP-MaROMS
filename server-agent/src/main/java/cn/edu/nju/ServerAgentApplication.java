package cn.edu.nju;

import cn.edu.nju.datatables.Message;
import cn.edu.nju.datatables.RepairForm;
import cn.edu.nju.datatables.User;
import cn.edu.nju.respository.MessageRespository;
import cn.edu.nju.respository.RepairFormRespository;
import cn.edu.nju.respository.UserRespository;
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
    UserRespository userRespository;

    @Autowired
    RepairFormRespository repairFormRespository;

    @Autowired
    MessageRespository messageRespository;

    @Bean
    public CommandLineRunner databaseInitializer() {
        return (args) -> {
            userRespository.save(new User(1, "admin", "admin", "001", 0));
            userRespository.save(new User(101, "engineer", "engineer", "101", 1));
            userRespository.save(new User(201, "saler", "saler", "201", 2));
            userRespository.save(new User(301, "distributor", "distributor", "301", 3));

            repairFormRespository.save(new RepairForm(
                    0,20,0,
                    "zavier","15850538991","Nanjing university","Mars",
                    101,201,301,new Date()
            ));

            messageRespository.save(new Message(0,1,1,new Date(),null));

        };
    }

}
