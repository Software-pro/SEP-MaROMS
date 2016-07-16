package cn.edu.nju.servicedata;

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

    public LoginResponse(boolean success, int type, String info){
        this.success = success;
        this.type = type;
        this.info = info;
    }
}
