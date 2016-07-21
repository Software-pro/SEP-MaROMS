package cn.edu.nju.servicedata.users;

import cn.edu.nju.servicedata.SuccessResponse;

/**
 * Created by dell on 2016/7/16.
 */
public class LoginResponse extends SuccessResponse {
    private int type;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public LoginResponse(boolean success, String info, int type){
        this.success = success;
        this.info = info;
        this.type = type;
    }
}
