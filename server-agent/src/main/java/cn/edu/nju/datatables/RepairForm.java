package cn.edu.nju.datatables;

import cn.edu.nju.servicedata.repairforms.RepairFormCreateRequest;
import cn.edu.nju.servicedata.repairforms.RepairFormEditRequest;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * 对应数据库中报修单的数据结构
 * <p>
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
    private int service;

    @NotNull
    private String clientName;

    @NotNull
    private String clientPhone;

    @NotNull
    private String clientWorkplace;

    @NotNull
    private String clientAddress;

    @NotNull
    private long engineerId;
    @NotNull
    private long salerId;
    @NotNull
    private long distributorId;
    private String distributorPhone;

    private Date creationTime;
    private Date receivedTime;
    private Date completedTime;
    private Date checkedTime;

    public RepairForm() {
    }

    public RepairForm(
            int status, int grade, int service,
            String clientName, String clientPhone, String clientWorkplace, String clientAddress,
            long engineerId, long salerId, long distributorId,
            Date creationTime, Date receivedTime, Date completedTime, Date checkedTime) {
        this.status = status;
        this.grade = grade;
        this.service = service;

        this.clientName = clientName;
        this.clientPhone = clientPhone;
        this.clientWorkplace = clientWorkplace;
        this.clientAddress = clientAddress;

        this.engineerId = engineerId;
        this.salerId = salerId;
        this.distributorId = distributorId;

        this.creationTime = creationTime;
        this.receivedTime=receivedTime;
        this.completedTime=completedTime;
        this.checkedTime=checkedTime;
    }

    public RepairForm(RepairFormCreateRequest repairFormCreateRequest) {
        this.grade = repairFormCreateRequest.getGrade();
        this.service = repairFormCreateRequest.getService();

        this.clientName = repairFormCreateRequest.getClientName();
        this.clientPhone = repairFormCreateRequest.getClientPhone();
        this.clientWorkplace = repairFormCreateRequest.getClientWorkplace();
        this.clientAddress = repairFormCreateRequest.getClientAddress();

        this.engineerId = repairFormCreateRequest.getEngineerId();
        this.salerId = repairFormCreateRequest.getSalerId();
        this.distributorId = repairFormCreateRequest.getDistributorId();

        this.creationTime = repairFormCreateRequest.getCreationTime();
    }

    public RepairForm(RepairFormEditRequest repairFormEditRequest) {

        this.id=repairFormEditRequest.getId();
        this.grade = repairFormEditRequest.getGrade();
        this.service = repairFormEditRequest.getService();

        this.clientName = repairFormEditRequest.getClientName();
        this.clientPhone = repairFormEditRequest.getClientPhone();
        this.clientWorkplace = repairFormEditRequest.getClientWorkplace();
        this.clientAddress = repairFormEditRequest.getClientAddress();

        this.engineerId = repairFormEditRequest.getEngineerId();
        this.salerId = repairFormEditRequest.getSalerId();
        this.distributorId = repairFormEditRequest.getDistributorId();

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientPhone() {
        return clientPhone;
    }

    public void setClientPhone(String clientPhone) {
        this.clientPhone = clientPhone;
    }

    public String getClientWorkplace() {
        return clientWorkplace;
    }

    public void setClientWorkplace(String clientWorkplace) {
        this.clientWorkplace = clientWorkplace;
    }

    public String getClientAddress() {
        return clientAddress;
    }

    public void setClientAddress(String clientAddress) {
        this.clientAddress = clientAddress;
    }

    public int getService() {
        return service;
    }

    public void setService(int service) {
        this.service = service;
    }

    public long getEngineerId() {
        return engineerId;
    }

    public void setEngineerId(long engineerId) {
        this.engineerId = engineerId;
    }

    public long getSalerId() {
        return salerId;
    }

    public void setSalerId(long salerId) {
        this.salerId = salerId;
    }

    public long getDistributorId() {
        return distributorId;
    }

    public void setDistributorId(long distributorId) {
        this.distributorId = distributorId;
    }

    public String getDistributorPhone() {
        return distributorPhone;
    }

    public void setDistributorPhone(String distributorPhone) {
        this.distributorPhone = distributorPhone;
    }


    public Date getCreationTime() {
        return creationTime;
    }

    public void setCreationTime(Date creationTime) {
        this.creationTime = creationTime;
    }

    public Date getReceivedTime() {
        return receivedTime;
    }

    public void setReceivedTime(Date receivedTime) {
        this.receivedTime = receivedTime;
    }

    public Date getCompletedTime() {
        return completedTime;
    }

    public void setCompletedTime(Date completedTime) {
        this.completedTime = completedTime;
    }

    public Date getCheckedTime() {
        return checkedTime;
    }

    public void setCheckedTime(Date checkedTime) {
        this.checkedTime = checkedTime;
    }
}
