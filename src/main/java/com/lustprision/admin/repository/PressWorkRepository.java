package com.lustprision.admin.repository;

import com.lustprision.admin.domain.PressWork;

import com.lustprision.admin.domain.Prisioner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the PressWork entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PressWorkRepository extends JpaRepository<PressWork, Long> {

    List<PressWork> getAllByPrisioner(Prisioner prisioner);
}
