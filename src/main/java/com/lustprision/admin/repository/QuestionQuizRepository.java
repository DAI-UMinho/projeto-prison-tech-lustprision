package com.lustprision.admin.repository;

import com.lustprision.admin.domain.QuestionQuiz;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the QuestionQuiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionQuizRepository extends JpaRepository<QuestionQuiz, Long> {
}
