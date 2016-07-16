package cn.edu.nju.servicedata;

/**
 * Created by dell on 2016/7/16.
 */
public class LoginRequest {
    private long id;
    private String password;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
