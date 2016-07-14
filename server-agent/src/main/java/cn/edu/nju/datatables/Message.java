package cn.edu.nju.datatables;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by Wei Zhai on 2016/7/13.
 */

@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    @Size(min = 0,max = 2)
    private int type;

    @NotNull
    @Size(min = 0,max = 1)
    private int status;

    @NotNull
    private long senderId;

    @NotNull
    private long receiverId;

    private String content;
}
