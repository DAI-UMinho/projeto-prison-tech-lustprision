package com.lustprision.admin.repository;

import com.lustprision.admin.domain.Seller;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Seller entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {

    Optional<Seller> getByName(String name);
}
