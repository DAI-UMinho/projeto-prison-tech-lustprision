package com.lustprision.admin.repository;

import com.lustprision.admin.domain.PressWork;

import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.Work;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the PressWork entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PressWorkRepository extends JpaRepository<PressWork, Long> {

    List<PressWork> getAllByPrisioner(Prisioner prisioner);

    List<PressWork> getAllByWork(Work work);

    Optional<PressWork> findOneByPrisionerAndWork(Prisioner prisioner, Work work);

    @Query(value = "SELECT COUNT (*) FROM PRESS_WORK WHERE STATE_ID = 2 AND PRISIONER_ID = ?1", nativeQuery = true)
    Integer getTotalCompletedWorks(Long prisonerID);

    @Query(value = "SELECT COUNT (*) FROM PRESS_WORK WHERE STATE_ID = 3 AND PRISIONER_ID = ?1", nativeQuery = true)
    Integer getTotalCanceledWorks(Long prisonerID);

    @Query(value = "select sum(total_credits) from work_job inner join press_work on work_job.id = press_work.work_id where press_work.state_id = 2 and press_work.prisioner_id = ?1", nativeQuery = true)
    Integer getTotalCreditsFromWork(Long prisonerID);
}
