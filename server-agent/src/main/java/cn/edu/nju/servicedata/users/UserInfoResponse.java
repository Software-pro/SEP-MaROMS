package cn.edu.nju.servicedata.users;

import cn.edu.nju.datatables.User;

/**
 * Created by Wei Zhai on 2016/7/14.
 */
public class UserInfoResponse {
    protected long id;
    protected String name;
    protected String phone;
    protected int type;

    public UserInfoResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.type = user.getType();

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
