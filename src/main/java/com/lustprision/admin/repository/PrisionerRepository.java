package com.lustprision.admin.repository;

import com.lustprision.admin.domain.Prisioner;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Prisioner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrisionerRepository extends JpaRepository<Prisioner, Long> {

}
