package cn.edu.nju.servicedata.users;

import cn.edu.nju.servicedata.SuccessResponse;

/**
 * Created by dell on 2016/7/17.
 */
public class PasswordResponse extends SuccessResponse {
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
