package cn.edu.nju.servicedata.task;

import java.util.Date;

/**
 * Created by dell on 2016/7/20.
 */
public class SubmitRequest {
    private long id;
    private String serialNumber;
    private String feedbackInfo;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getFeedbackInfo() {
        return feedbackInfo;
    }

    public void setFeedbackInfo(String feedbackInfo) {
        this.feedbackInfo = feedbackInfo;
    }
}
