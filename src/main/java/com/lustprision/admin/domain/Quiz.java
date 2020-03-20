package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Quiz.
 */
@Entity
@Table(name = "quiz")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Quiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_quiz")
    private Integer idQuiz;

    @Column(name = "qty_question")
    private Integer qtyQuestion;

    @OneToMany(mappedBy = "quiz")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PrisQuiz> idQuizs = new HashSet<>();

    @OneToMany(mappedBy = "quiz")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<QuestionQuiz> idQuzs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdQuiz() {
        return idQuiz;
    }

    public Quiz idQuiz(Integer idQuiz) {
        this.idQuiz = idQuiz;
        return this;
    }

    public void setIdQuiz(Integer idQuiz) {
        this.idQuiz = idQuiz;
    }

    public Integer getQtyQuestion() {
        return qtyQuestion;
    }

    public Quiz qtyQuestion(Integer qtyQuestion) {
        this.qtyQuestion = qtyQuestion;
        return this;
    }

    public void setQtyQuestion(Integer qtyQuestion) {
        this.qtyQuestion = qtyQuestion;
    }

    public Set<PrisQuiz> getIdQuizs() {
        return idQuizs;
    }

    public Quiz idQuizs(Set<PrisQuiz> prisQuizs) {
        this.idQuizs = prisQuizs;
        return this;
    }

    public Quiz addIdQuiz(PrisQuiz prisQuiz) {
        this.idQuizs.add(prisQuiz);
        prisQuiz.setQuiz(this);
        return this;
    }

    public Quiz removeIdQuiz(PrisQuiz prisQuiz) {
        this.idQuizs.remove(prisQuiz);
        prisQuiz.setQuiz(null);
        return this;
    }

    public void setIdQuizs(Set<PrisQuiz> prisQuizs) {
        this.idQuizs = prisQuizs;
    }

    public Set<QuestionQuiz> getIdQuzs() {
        return idQuzs;
    }

    public Quiz idQuzs(Set<QuestionQuiz> questionQuizs) {
        this.idQuzs = questionQuizs;
        return this;
    }

    public Quiz addIdQuz(QuestionQuiz questionQuiz) {
        this.idQuzs.add(questionQuiz);
        questionQuiz.setQuiz(this);
        return this;
    }

    public Quiz removeIdQuz(QuestionQuiz questionQuiz) {
        this.idQuzs.remove(questionQuiz);
        questionQuiz.setQuiz(null);
        return this;
    }

    public void setIdQuzs(Set<QuestionQuiz> questionQuizs) {
        this.idQuzs = questionQuizs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Quiz)) {
            return false;
        }
        return id != null && id.equals(((Quiz) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Quiz{" +
            "id=" + getId() +
            ", idQuiz=" + getIdQuiz() +
            ", qtyQuestion=" + getQtyQuestion() +
            "}";
    }
}
