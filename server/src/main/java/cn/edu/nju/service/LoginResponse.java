package cn.edu.nju.service;

/**
 * Created by dell on 2016/7/7.
 */
public class LoginResponse {
    protected boolean success;

    public LoginResponse(boolean t){
        setSuccess(t);
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isSuccess() {
        return success;
    }
}
