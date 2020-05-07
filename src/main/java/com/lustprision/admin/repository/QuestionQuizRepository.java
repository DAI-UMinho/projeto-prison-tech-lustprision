package com.lustprision.admin.repository;

import com.lustprision.admin.domain.QuestionQuiz;

import com.lustprision.admin.domain.Quiz;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the QuestionQuiz entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionQuizRepository extends JpaRepository<QuestionQuiz, Long> {
    List<QuestionQuiz> findAllByQuiz(Quiz quiz);
}
