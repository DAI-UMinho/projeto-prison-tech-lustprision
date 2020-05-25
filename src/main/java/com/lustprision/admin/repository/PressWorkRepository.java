package com.lustprision.admin.repository;

import com.lustprision.admin.domain.PressWork;

import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.Work;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
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

    Optional<PressWork> findOneByPrisionerAndWorkDate(Prisioner prisioner, LocalDate date);

    @Query(value = "SELECT COUNT (*) FROM PRESS_WORK WHERE STATE_ID = 2 AND PRISIONER_ID = ?1", nativeQuery = true)
    Integer getTotalCompletedWorks(Long prisonerID);

    @Query(value = "SELECT COUNT (*) FROM PRESS_WORK WHERE STATE_ID = 3 AND PRISIONER_ID = ?1", nativeQuery = true)
    Integer getTotalCanceledWorks(Long prisonerID);

    @Query(value = "select sum(total_credits) from work_job inner join press_work on work_job.id = press_work.work_id where press_work.state_id = 2 and press_work.prisioner_id = ?1", nativeQuery = true)
    Integer getTotalCreditsFromWork(Long prisonerID);

    @Query(value = "select to_char(DATE_WORK, 'YYYY-MM'), count(*) from WORK_JOB where STATE_ID =  2 " +
        "AND DATE_WORK between add_months(trunc(sysdate,'mm'), -6) and last_day(trunc(sysdate,'mm')))" +
        "group by to_char(DATE_WORK, 'YYYY-MM')", nativeQuery = true)
    Integer getHalfYearWorkStat();

    @Query(value = "SELECT COUNT(ID) as trabalhos from WORK_JOB t where t.state_id = 2 AND t.date_work BETWEEN TO_DATE(:initial, 'DD/MM/YYYY') AND TO_DATE(:finalData, 'DD/MM/YYYY')", nativeQuery = true)
    Integer getCompletedFromDateRange(@Param("initial") String initial, @Param("finalData") String finalData);
}
