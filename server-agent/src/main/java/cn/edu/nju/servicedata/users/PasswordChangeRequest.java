package cn.edu.nju.servicedata.users;

/**
 * Created by dell on 2016/7/17.
 */
public class PasswordChangeRequest {
    private long id;
    private String oldPassword;
    private String newPassword;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
