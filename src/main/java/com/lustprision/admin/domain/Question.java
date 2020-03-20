package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_question")
    private Integer idQuestion;

    @Column(name = "question")
    private String question;

    @Column(name = "jhi_value")
    private Double value;

    @Column(name = "answer")
    private String answer;

    @OneToMany(mappedBy = "question")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<QuestionQuiz> idQuestions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdQuestion() {
        return idQuestion;
    }

    public Question idQuestion(Integer idQuestion) {
        this.idQuestion = idQuestion;
        return this;
    }

    public void setIdQuestion(Integer idQuestion) {
        this.idQuestion = idQuestion;
    }

    public String getQuestion() {
        return question;
    }

    public Question question(String question) {
        this.question = question;
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Double getValue() {
        return value;
    }

    public Question value(Double value) {
        this.value = value;
        return this;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public String getAnswer() {
        return answer;
    }

    public Question answer(String answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Set<QuestionQuiz> getIdQuestions() {
        return idQuestions;
    }

    public Question idQuestions(Set<QuestionQuiz> questionQuizs) {
        this.idQuestions = questionQuizs;
        return this;
    }

    public Question addIdQuestion(QuestionQuiz questionQuiz) {
        this.idQuestions.add(questionQuiz);
        questionQuiz.setQuestion(this);
        return this;
    }

    public Question removeIdQuestion(QuestionQuiz questionQuiz) {
        this.idQuestions.remove(questionQuiz);
        questionQuiz.setQuestion(null);
        return this;
    }

    public void setIdQuestions(Set<QuestionQuiz> questionQuizs) {
        this.idQuestions = questionQuizs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", idQuestion=" + getIdQuestion() +
            ", question='" + getQuestion() + "'" +
            ", value=" + getValue() +
            ", answer='" + getAnswer() + "'" +
            "}";
    }
}
