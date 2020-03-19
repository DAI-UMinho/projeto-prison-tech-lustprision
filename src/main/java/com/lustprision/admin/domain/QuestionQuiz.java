package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A QuestionQuiz.
 */
@Entity
@Table(name = "question_quiz")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QuestionQuiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "question_quiz_id")
    private Integer questionQuizId;

    @Column(name = "id_quiz")
    private Integer idQuiz;

    @Column(name = "id_question")
    private Integer idQuestion;

    @ManyToOne
    @JsonIgnoreProperties("questionQuizs")
    private Quiz idQuiz;

    @ManyToOne
    @JsonIgnoreProperties("questionQuizs")
    private Question idQuestion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuestionQuizId() {
        return questionQuizId;
    }

    public QuestionQuiz questionQuizId(Integer questionQuizId) {
        this.questionQuizId = questionQuizId;
        return this;
    }

    public void setQuestionQuizId(Integer questionQuizId) {
        this.questionQuizId = questionQuizId;
    }

    public Integer getIdQuiz() {
        return idQuiz;
    }

    public QuestionQuiz idQuiz(Integer idQuiz) {
        this.idQuiz = idQuiz;
        return this;
    }

    public void setIdQuiz(Integer idQuiz) {
        this.idQuiz = idQuiz;
    }

    public Integer getIdQuestion() {
        return idQuestion;
    }

    public QuestionQuiz idQuestion(Integer idQuestion) {
        this.idQuestion = idQuestion;
        return this;
    }

    public void setIdQuestion(Integer idQuestion) {
        this.idQuestion = idQuestion;
    }

    public Quiz getIdQuiz() {
        return idQuiz;
    }

    public QuestionQuiz idQuiz(Quiz quiz) {
        this.idQuiz = quiz;
        return this;
    }

    public void setIdQuiz(Quiz quiz) {
        this.idQuiz = quiz;
    }

    public Question getIdQuestion() {
        return idQuestion;
    }

    public QuestionQuiz idQuestion(Question question) {
        this.idQuestion = question;
        return this;
    }

    public void setIdQuestion(Question question) {
        this.idQuestion = question;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QuestionQuiz)) {
            return false;
        }
        return id != null && id.equals(((QuestionQuiz) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "QuestionQuiz{" +
            "id=" + getId() +
            ", questionQuizId=" + getQuestionQuizId() +
            ", idQuiz=" + getIdQuiz() +
            ", idQuestion=" + getIdQuestion() +
            "}";
    }
}
