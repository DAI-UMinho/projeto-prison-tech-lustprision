package com.lustprision.admin.repository;

import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.Purchase;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Purchase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    List<Purchase> findAllByPrisioner (Prisioner prisioner);
}
