package cn.edu.nju.servicedata.users;

import cn.edu.nju.servicedata.SuccessResponse;

/**
 * Created by dell on 2016/7/21.
 */
public class GradeResponse extends SuccessResponse {

    private String grade;

    public GradeResponse(){

    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }
}
