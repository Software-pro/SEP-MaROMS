package com.example;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.lang.StringBuffer;
import java.util.Map;
import java.util.Set;

/**
 * Created by dell on 2016/7/10.
 */

@CrossOrigin
@RestController
public class MyRestController {

    private String host;
    private String return_str;

    public MyRestController(){
        host="115.159.225.109";
        //host="localhost";
        return_str="null";
    }

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String hello(HttpServletResponse response){
        return_str= HttpRequest.sendGet("http://"+host+":8080/","");


        return return_str;
    }

    @RequestMapping(value = "/login",method = RequestMethod.POST,produces = "application/json")
    public String login(HttpServletRequest request, HttpServletResponse response) throws Exception{

        StringBuffer buff=new StringBuffer();
        String line = null;
        BufferedReader reader=request.getReader();
        while ((line=reader.readLine())!=null){
            buff.append(line);
        }

        return_str= HttpRequest.sendPost("http://"+host+":8080/login",buff.toString());

        return return_str;
    }

}
