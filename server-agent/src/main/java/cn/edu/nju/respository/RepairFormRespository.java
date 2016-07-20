package cn.edu.nju.respository;

import cn.edu.nju.datatables.RepairForm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by dell on 2016/7/16.
 */

@Transactional
public interface RepairFormRespository extends CrudRepository<RepairForm, Long>{
    Iterable<RepairForm> findByEngineerId(long engineerId);
    Iterable<RepairForm> findBySalerId(long salerId);

    @Query("select r.clientName from RepairForm r")
    List<String> findClientNames();

    @Query("select r.clientPhone from RepairForm r")
    List<String> findClientPhones();

    @Query("select r.clientWorkplace from RepairForm r")
    List<String> findClientWorkplaces();
}
