package cn.edu.nju.servicedata.task;

import java.util.Date;

/**
 * Created by dell on 2016/7/20.
 */
public class ReceiveRequest {
    private long id;
    private Date date;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
