package cn.edu.nju.servicedata.task;

import java.util.Date;

/**
 * Created by dell on 2016/7/20.
 */
public class ReceiveRequest {
    private long id;
    private Date visitTime;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getVisitTime() {
        return visitTime;
    }

    public void setVisitTime(Date visitTime) {
        this.visitTime = visitTime;
    }
}
