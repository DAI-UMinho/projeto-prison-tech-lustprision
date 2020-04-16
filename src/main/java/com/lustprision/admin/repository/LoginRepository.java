package com.lustprision.admin.repository;

import com.lustprision.admin.domain.Login;

import com.lustprision.admin.domain.User;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Login entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {

    Optional<Login> findOneByUserName(String username);
}
