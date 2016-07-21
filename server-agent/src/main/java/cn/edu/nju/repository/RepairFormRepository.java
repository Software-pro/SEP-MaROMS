package cn.edu.nju.repository;

import cn.edu.nju.datatables.RepairForm;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by dell on 2016/7/16.
 */

@Transactional
public interface RepairFormRepository extends CrudRepository<RepairForm, Long>{
    Iterable<RepairForm> findByEngineerId(long engineerId);
    Iterable<RepairForm> findBySalerId(long salerId);

    @Query("select r from RepairForm r where r.status=3 and r.engineerId=?1")
    Iterable<RepairForm> findGradeByEngineerId(long engineerId);

    @Query("select r from RepairForm r where r.status=3 and r.salerId=?1")
    Iterable<RepairForm> findGradeBySalerId(long salerId);

    @Query("select r.clientName from RepairForm r")
    List<String> findClientNames();

    @Query("select r.clientPhone from RepairForm r")
    List<String> findClientPhones();

    @Query("select r.clientWorkplace from RepairForm r")
    List<String> findClientWorkplaces();

}
