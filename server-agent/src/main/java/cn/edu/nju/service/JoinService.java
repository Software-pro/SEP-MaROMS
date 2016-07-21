package cn.edu.nju.service;

import org.activiti.engine.delegate.DelegateExecution;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

/**
 * Created by dell on 2016/7/20.
 */


@Service("JoinService")
public class JoinService {

    public void setstate2(DelegateExecution execution){
        execution.setVariable("state",2);
        System.out.println(execution.getVariable("state"));
    }

    public void setstate3(DelegateExecution execution){
        execution.setVariable("state",3);
        System.out.println(execution.getVariable("state"));
    }

}
