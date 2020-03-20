package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

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

    @ManyToOne
    @JsonIgnoreProperties("idQuzs")
    private Quiz quiz;

    @ManyToOne
    @JsonIgnoreProperties("idQuestions")
    private Question question;

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

    public Quiz getQuiz() {
        return quiz;
    }

    public QuestionQuiz quiz(Quiz quiz) {
        this.quiz = quiz;
        return this;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public Question getQuestion() {
        return question;
    }

    public QuestionQuiz question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
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
            "}";
    }
}
