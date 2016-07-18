package cn.edu.nju.servicedata.messages;

import cn.edu.nju.datatables.Message;

import java.util.Date;

/**
 * Created by dell on 2016/7/18.
 */
public class MessageInfoResponse {
    private long id;
    private int type;
    private int status;
    private long senderId;
    private long receiverId;
    private Date time;
    private String content;

    public MessageInfoResponse(){

    }

    public MessageInfoResponse(Message message){
        this.id=message.getId();
        this.type=message.getType();
        this.status=message.getStatus();
        this.senderId=message.getSenderId();
        this.receiverId=message.getReceiverId();
        this.time=message.getTime();
        this.content=message.getContent();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getSenderId() {
        return senderId;
    }

    public void setSenderId(long senderId) {
        this.senderId = senderId;
    }

    public long getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(long receiverId) {
        this.receiverId = receiverId;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
