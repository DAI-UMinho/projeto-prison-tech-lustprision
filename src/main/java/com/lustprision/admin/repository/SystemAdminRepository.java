package com.lustprision.admin.repository;

import com.lustprision.admin.domain.SystemAdmin;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SystemAdmin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SystemAdminRepository extends JpaRepository<SystemAdmin, Long> {

}
