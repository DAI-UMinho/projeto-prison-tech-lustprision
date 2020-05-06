package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.Quiz;
import java.time.LocalDate;

public class QuizDTO {

    private Long id;

    private Integer qtyQuestion;

    private LocalDate quizDate;

    public QuizDTO(){}

    public QuizDTO(Quiz quiz){
        this.id = quiz.getId();
        this.qtyQuestion = quiz.getQtyQuestion();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQtyQuestion() {
        return qtyQuestion;
    }

    public void setQtyQuestion(Integer qtyQuestion) {
        this.qtyQuestion = qtyQuestion;
    }

    public LocalDate getQuizDate(){ return quizDate; }

    public void setQuizDate(LocalDate quizDate){ this.quizDate = quizDate; }

    public String toString() {
        return "id: " + id + " Quantidade de Questões: " + qtyQuestion;
    }
}
