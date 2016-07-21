package cn.edu.nju.servicedata;

/**
 * Created by Wei Zhai on 2016/7/14.
 */
public class SuccessResponse {
    protected boolean success;
    protected String info;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public SuccessResponse(){}

    public SuccessResponse(boolean success){
        this.success = success;
    }

}
