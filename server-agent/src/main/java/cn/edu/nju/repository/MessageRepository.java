package cn.edu.nju.repository;

import cn.edu.nju.datatables.Message;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by dell on 2016/7/18.
 */

@Transactional
public interface MessageRepository extends CrudRepository<Message, Long> {
    Iterable<Message> findByReceiverId(long receiverId);
}
