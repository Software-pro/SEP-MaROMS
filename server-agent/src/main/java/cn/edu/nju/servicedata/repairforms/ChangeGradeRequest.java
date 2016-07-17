package cn.edu.nju.servicedata.repairforms;

/**
 * Created by dell on 2016/7/17.
 */
public class ChangeGradeRequest {

    private long id;
    private int grade;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }
}
