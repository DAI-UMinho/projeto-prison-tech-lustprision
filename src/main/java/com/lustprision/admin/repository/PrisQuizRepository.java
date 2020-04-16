package com.lustprision.admin.repository;

import com.lustprision.admin.domain.PrisQuiz;

import com.lustprision.admin.domain.Prisioner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the PrisQuiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrisQuizRepository extends JpaRepository<PrisQuiz, Long> {

    List<PrisQuiz> getAllByPrisioner(Prisioner prisioner);
}
