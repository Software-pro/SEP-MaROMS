package cn.edu.nju.datatables;


import cn.edu.nju.servicedata.messages.MessageCreateRequest;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by Wei Zhai on 2016/7/13.
 */

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private int type;

    @NotNull
    private int status;

    @NotNull
    private long infoId;

    @NotNull
    private long receiverId;

    private Date time;

    private String content;

    public Message(){

    }

    public Message(MessageCreateRequest messageCreateRequest){
        this.type=messageCreateRequest.getType();
        this.infoId =messageCreateRequest.getInfoId();
        this.receiverId=messageCreateRequest.getReceiverId();
        this.time=messageCreateRequest.getTime();
        this.content=messageCreateRequest.getContent();
    }

    public Message(int type, long infoId, long receiverId, Date time, String content){

        this.type=type;
        this.infoId = infoId;
        this.receiverId=receiverId;
        this.time=time;
        this.content=content;

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

    public long getInfoId() {
        return infoId;
    }

    public void setInfoId(long infoId) {
        this.infoId = infoId;
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
