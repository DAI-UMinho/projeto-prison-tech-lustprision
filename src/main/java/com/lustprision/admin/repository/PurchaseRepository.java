package com.lustprision.admin.repository;

import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.Purchase;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Purchase entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    List<Purchase> findAllByPrisioner(Prisioner prisioner);

    @Query(value = "SELECT COUNT (ID) FROM PURCHASE", nativeQuery = true)
    Integer getTotalPurchaseNumber();
    @Query(value =
        "SELECT COUNT(*) from PURCHASE p" +
            " where p.PURCHASE_DATE BETWEEN " +
            "TO_DATE(:initialDate, 'DD/MM/YYYY') AND TO_DATE(:finalDate, 'DD/MM/YYYY')", nativeQuery = true)
    Integer getProductSalesFromDateRange( @Param("initialDate") String initial, @Param("finalDate") String finalData);

}
