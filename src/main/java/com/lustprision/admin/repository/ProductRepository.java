package com.lustprision.admin.repository;

import com.lustprision.admin.domain.Product;

import com.lustprision.admin.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

//    List<Product> getAllByNameProdContaining(String name);

//    List<Product> getAllByPriceBetween(Number lower, Number higher);

    Page<Product> findAllByNameProdContainingAndPriceBetween(String name, Number lower, Number higher, Pageable pageable);

    Page<Product> findAllByPriceBetween(Number lower, Number higher, Pageable pageable);

    @Query(value = "SELECT COUNT (ID) FROM PRODUCT", nativeQuery = true)
    Integer getTotalProductNumber();
}
