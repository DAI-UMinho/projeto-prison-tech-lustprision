package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.PrisQuiz;

public class CompletedQuizDTO extends PendingQuizDTO {

    private Long quizID;

    private Integer qtyQuestion;

    private Integer correctAnswers;

    public CompletedQuizDTO() {}

    public CompletedQuizDTO(PrisQuiz prisQuiz){
        super(prisQuiz);
        this.quizID = prisQuiz.getQuiz().getId();
        this.qtyQuestion = prisQuiz.getQuiz().getQtyQuestion();
        this.correctAnswers = 0;
    }

    public Long getQuizID() {
        return quizID;
    }

    public void setQuizID(Long quizID) {
        this.quizID = quizID;
    }

    public Integer getQtyQuestion(){ return qtyQuestion; }

    public void setQtyQuestion(Integer qtyQuestion) {
        this.qtyQuestion = qtyQuestion;
    }

    public Integer getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(Integer correctAnswers) {
        this.correctAnswers = correctAnswers;
    }
}
