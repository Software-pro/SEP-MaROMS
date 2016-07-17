package cn.edu.nju;

import cn.edu.nju.servicedata.TestRequest;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.lang.StringBuffer;

import static cn.edu.nju.GlobalVar.*;

/**
 * Created by Wei Zhai on 2016/7/10.
 */

@CrossOrigin
@RestController
public class MyRestController {

    private String return_str;

    public MyRestController(){
        return_str="null";
    }

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String hello(){
        return_str= HttpRequest.sendGet("http://"+host+":8080/","");
        return return_str;
    }

    @RequestMapping(value = "/test",method = RequestMethod.POST,produces = "application/json")
    public String test(@RequestBody TestRequest testRequest){
        System.out.println(testRequest.getDate());
        return "hehe";
    }

}
