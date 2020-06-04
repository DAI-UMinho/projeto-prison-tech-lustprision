package com.lustprision.admin.repository;

import com.lustprision.admin.domain.Product;

import com.lustprision.admin.domain.Seller;
import com.lustprision.admin.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findAllByNameProdContainingAndPriceBetween(String name, Number lower, Number higher, Pageable pageable);

    Page<Product> findAllByPriceBetween(Number lower, Number higher, Pageable pageable);

    @Query(value = "SELECT COUNT (ID) FROM PRODUCT", nativeQuery = true)
    Integer getTotalProductNumber();

    @Query(value = "SELECT * FROM(SELECT PRICE FROM PRODUCT WHERE NAME_PROD LIKE %?1% ORDER BY PRICE DESC) WHERE ROWNUM < 2", nativeQuery = true)
    Integer getProductMaxValueFilter(String search);

    Optional<Product> findOneBySeller(Seller seller);
}
