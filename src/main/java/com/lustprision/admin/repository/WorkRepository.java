package com.lustprision.admin.repository;

import com.lustprision.admin.domain.Work;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Work entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {

    @Query(value = "SELECT COUNT (ID) FROM WORK_JOB", nativeQuery = true)
    Integer getTotalWorkNumber();

    @Query(value = "SELECT COUNT (*) FROM WORK_JOB WHERE STATE_ID = 2", nativeQuery = true)
    Integer getTotalCompletedWorkNumber();

    @Query(value = "SELECT COUNT (*) FROM WORK_JOB WHERE STATE_ID = 3", nativeQuery = true)
    Integer getTotalCanceledWorkNumber();
}
