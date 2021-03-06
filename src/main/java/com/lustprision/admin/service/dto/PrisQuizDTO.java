package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.PrisQuiz;
import com.lustprision.admin.domain.Prisioner;
import com.lustprision.admin.domain.Quiz;

import java.time.Instant;
import java.time.LocalDate;

public class PrisQuizDTO {

    private Long id;

    private Instant quizDate;

    private int approval;

    public Long getId() {
        return id;
    }

    public PrisQuizDTO() { }

    public PrisQuizDTO(PrisQuiz prisQuiz){
        this.id = prisQuiz.getId();
        this.quizDate = prisQuiz.getQuizDate();
        this.approval = prisQuiz.getApproval();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getQuizDate() {
        return quizDate;
    }

    public void setQuizDate(Instant quizDate) {
        this.quizDate = quizDate;
    }

    public int getApproval() {
        return approval;
    }

    public void setApproval(int approval) {
        this.approval = approval;
    }
}
