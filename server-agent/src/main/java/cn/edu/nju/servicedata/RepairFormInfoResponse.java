package cn.edu.nju.servicedata;

import cn.edu.nju.datatables.RepairForm;

import java.util.Date;

/**
 * Created by dell on 2016/7/16.
 */
public class RepairFormInfoResponse {

    private long id;
    private int status;
    private int grade;
    private int service;

    private String clientName;
    private String clientPhone;
    private String clientWorkplace;
    private String clientAddress;

    private long engineerId;
    private long salerId;
    private long distributorId;
    private String distributorPhone;

    private Date creationTime;
    private Date receivedTime;
    private Date completedTime;
    private Date checkedTime;

    public RepairFormInfoResponse(RepairForm repairForm){

        this.id = repairForm.getId();
        this.status = repairForm.getStatus();
        this.grade = repairForm.getGrade();
        this.service = repairForm.getService();

        this.clientName = repairForm.getClientName();
        this.clientPhone = repairForm.getClientPhone();
        this.clientWorkplace = repairForm.getClientWorkplace();
        this.clientAddress = repairForm.getClientAddress();

        this.engineerId = repairForm.getEngineerId();
        this.salerId = repairForm.getSalerId();
        this.distributorId = repairForm.getDistributorId();
        this.distributorPhone = repairForm.getDistributorPhone();

        this.creationTime = repairForm.getCreationTime();
        this.receivedTime = repairForm.getReceivedTime();
        this.completedTime = repairForm.getCompletedTime();
        this.checkedTime = repairForm.getCheckedTime();

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

    public int getService() {
        return service;
    }

    public void setService(int service) {
        this.service = service;
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
