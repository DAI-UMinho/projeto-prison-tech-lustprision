package com.lustprision.admin.repository;

import com.lustprision.admin.domain.Prisioner;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Prisioner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrisionerRepository extends JpaRepository<Prisioner, Long> {

    Optional<Prisioner> findOneByNumPrisioner(Integer numPrisioner);

    Optional<Prisioner> findOneByNumCell(Integer numCell);

    Optional<Prisioner> findOneByNfcCode(Integer nfcCode);

    Optional<Prisioner> findOneByBi(Integer bi);
}
