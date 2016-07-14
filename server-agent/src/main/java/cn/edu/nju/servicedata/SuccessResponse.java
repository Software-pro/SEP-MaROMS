package cn.edu.nju.servicedata;

/**
 * Created by Wei Zhai on 2016/7/14.
 */
public class SuccessResponse {
    private boolean success;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public SuccessResponse(boolean success){
        this.success = success;
    }

}
