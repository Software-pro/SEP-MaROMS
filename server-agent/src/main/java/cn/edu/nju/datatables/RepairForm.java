package cn.edu.nju.datatables;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Date;

/**
 * 对应数据库中报修单的数据结构
 *
 * Created by Wei Zhai on 2016/7/13.
 */

@Entity
@Table(name = "repairforms")
public class RepairForm {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private int status;

    @NotNull
    private int grade;

    @NotNull
    private String clientName;

    @NotNull
    private String clientPhone;

    @NotNull
    private String clientWorkplace;

    @NotNull
    private String clientAddress;

    @NotNull
    private int service;

    @NotNull
    private long engineerId;
    @NotNull
    private long salerId;
    @NotNull
    private long distributorId;
    private String distributorPhone;
    private String deliveryId;

    private Date creationTime;
    private Date receivedTime;
    private Date completedTime;
    private Date checkedTime;

}
