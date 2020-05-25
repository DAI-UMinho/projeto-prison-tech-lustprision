package com.lustprision.admin.repository;

import com.lustprision.admin.domain.PressProduct;

import com.lustprision.admin.domain.Product;
import com.lustprision.admin.domain.Purchase;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the PressProduct entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PressProductRepository extends JpaRepository<PressProduct, Long> {

    List<PressProduct> findAllByPurchase(Purchase purchase);

    List<PressProduct> findAllByProduct(Product product);

    @Query(value =
        "SELECT COUNT(*) from PRESS_PRODUCT t inner join PURCHASE p on p.id = t.purchase_id " +
        "where t.product_id = :id AND p.PURCHASE_DATE BETWEEN " +
        "TO_DATE(:initialDate, 'DD/MM/YYYY') AND TO_DATE(:finalDate, 'DD/MM/YYYY')", nativeQuery = true)
    Integer getProductSalesFromDateRange(@Param("id") Long id, @Param("initialDate") String initial, @Param("finalDate") String finalData);
}
