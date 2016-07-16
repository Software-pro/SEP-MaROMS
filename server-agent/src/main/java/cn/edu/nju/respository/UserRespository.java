package cn.edu.nju.respository;

import cn.edu.nju.datatables.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Wei Zhai on 2016/7/14.
 */

@Transactional
public interface UserRespository extends CrudRepository<User, Long>{
    User findById(long id);
}
