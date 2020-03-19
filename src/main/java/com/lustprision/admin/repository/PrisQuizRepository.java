package com.lustprision.admin.repository;

import com.lustprision.admin.domain.PrisQuiz;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PrisQuiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrisQuizRepository extends JpaRepository<PrisQuiz, Long> {
}
