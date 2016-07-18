package cn.edu.nju.respository;

import cn.edu.nju.datatables.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by dell on 2016/7/18.
 */

@Transactional
public interface MessageRespository extends CrudRepository<Message, Long> {
    public Message findByReceiverId(long receiverId);
}
