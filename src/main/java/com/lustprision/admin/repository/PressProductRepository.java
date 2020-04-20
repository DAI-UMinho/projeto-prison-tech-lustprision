package com.lustprision.admin.repository;

import com.lustprision.admin.domain.PressProduct;

import com.lustprision.admin.domain.Product;
import com.lustprision.admin.domain.Purchase;
import org.springframework.data.jpa.repository.*;
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
}
