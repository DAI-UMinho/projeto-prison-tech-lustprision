package com.lustprision.admin.repository;

import com.lustprision.admin.domain.PressWork;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PressWork entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PressWorkRepository extends JpaRepository<PressWork, Long> {
}
