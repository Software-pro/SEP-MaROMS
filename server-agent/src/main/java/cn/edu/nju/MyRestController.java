package cn.edu.nju;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

    @RequestMapping(value = "/login",method = RequestMethod.POST,produces = "application/json")
    public String login(HttpServletRequest request) throws Exception{

        StringBuffer buff=new StringBuffer();
        String line = null;
        BufferedReader reader=request.getReader();
        while ((line=reader.readLine())!=null){
            line=line.replace("name","id");
            System.out.println(line);
            buff.append(line);
        }

        return_str= HttpRequest.sendPost("http://"+host+":8080/login",buff.toString());

        return return_str;
    }

}
