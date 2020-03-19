package com.lustprision.admin.repository;

import com.lustprision.admin.domain.PressProduct;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PressProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PressProductRepository extends JpaRepository<PressProduct, Long> {
}
