package cn.edu.nju.datatables;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


/**
 * 对应数据库中用户表的数据结构
 *
 * Created by Wei Zhai on 2016/7/13.
 */

@Entity
@Table(name = "users")
public class User {

    @Id
    private long id;

    @NotNull
    private String name;

    @NotNull
    private String password;

    private String phone;

    private String grade;

    @NotNull
    private int type;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public User(){}

    public User(long id, String name, String password, int type){
        this.id=id;
        this.name=name;
        this.password=password;
        this.type=type;
    }

}
