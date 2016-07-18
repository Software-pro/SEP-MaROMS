package cn.edu.nju.respository;

import cn.edu.nju.datatables.RepairForm;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by dell on 2016/7/16.
 */

@Transactional
public interface RepairFormRespository extends CrudRepository<RepairForm, Long>{
    public RepairForm findByEngineerId(long engineerId);
    public RepairForm findBySalerId(long salerId);
}
