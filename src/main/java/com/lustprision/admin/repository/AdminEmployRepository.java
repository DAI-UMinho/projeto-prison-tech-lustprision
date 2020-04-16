package com.lustprision.admin.repository;

import com.lustprision.admin.domain.AdminEmploy;

import com.lustprision.admin.domain.Login;
import com.lustprision.admin.domain.User;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the AdminEmploy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdminEmployRepository extends JpaRepository<AdminEmploy, Long> {

    Optional<AdminEmploy> findOneByEmail(String email);

    @EntityGraph(attributePaths = "authorities")
    Optional<AdminEmploy> findOneWithAuthoritiesById(Long id);
}
