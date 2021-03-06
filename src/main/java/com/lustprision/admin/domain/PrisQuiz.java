package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.time.LocalDate;

/**
 * A PrisQuiz.
 */
@Entity
@Table(name = "pris_quiz")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PrisQuiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "quiz_date")
    private Instant quizDate;

    @Max(value = 1)
    @Column(name = "approval")
    private Integer approval;

    @Max(value = 1)
    @Column(name = "completed")
    private Integer completed;

    @ManyToOne
    @JsonIgnoreProperties("ids")
    private Prisioner prisioner;

    @ManyToOne
    @JsonIgnoreProperties("ids")
    private Quiz quiz;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getQuizDate() {
        return quizDate;
    }

    public PrisQuiz quizDate(Instant quizDate) {
        this.quizDate = quizDate;
        return this;
    }

    public void setQuizDate(Instant quizDate) {
        this.quizDate = quizDate;
    }

    public Integer getApproval() {
        return approval;
    }

    public PrisQuiz approval(Integer approval) {
        this.approval = approval;
        return this;
    }

    public void setApproval(Integer approval) {
        this.approval = approval;
    }

    public Prisioner getPrisioner() {
        return prisioner;
    }

    public PrisQuiz prisioner(Prisioner prisioner) {
        this.prisioner = prisioner;
        return this;
    }

    public void setPrisioner(Prisioner prisioner) {
        this.prisioner = prisioner;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public PrisQuiz quiz(Quiz quiz) {
        this.quiz = quiz;
        return this;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PrisQuiz)) {
            return false;
        }
        return id != null && id.equals(((PrisQuiz) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PrisQuiz{" +
            "id=" + getId() +
            ", quizDate='" + getQuizDate() + "'" +
            ", approval=" + getApproval() +
            "}";
    }

    public Integer getCompleted() {
        return completed;
    }

    public void setCompleted(Integer completed) {
        this.completed = completed;
    }
}
