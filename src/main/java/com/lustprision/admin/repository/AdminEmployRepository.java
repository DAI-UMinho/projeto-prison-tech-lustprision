package com.lustprision.admin.repository;

import com.lustprision.admin.domain.AdminEmploy;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AdminEmploy entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdminEmployRepository extends JpaRepository<AdminEmploy, Long> {

}
