package cn.edu.nju.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * Created by zhaiwei on 2016/7/7.
 */
public class LoginRequest {
    protected String id;
    protected String password;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
    public String getPassword() {
        return password;
    }
}
