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

    @Column(name = "qty_question")
    private Integer qtyQuestion;

    @OneToMany(mappedBy = "quiz")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PrisQuiz> ids = new HashSet<>();

    @OneToMany(mappedBy = "quiz")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<QuestionQuiz> idquestion = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    /*public Set<PrisQuiz> getIds() {
        return ids;
    }

    public Quiz ids(Set<PrisQuiz> prisQuizs) {
        this.ids = prisQuizs;
        return this;
    }*/

    public Quiz addId(PrisQuiz prisQuiz) {
        this.ids.add(prisQuiz);
        prisQuiz.setQuiz(this);
        return this;
    }

    public Quiz removeId(PrisQuiz prisQuiz) {
        this.ids.remove(prisQuiz);
        prisQuiz.setQuiz(null);
        return this;
    }

    /*public void setIds(Set<PrisQuiz> prisQuizs) {
        this.ids = prisQuizs;
    }

    public Set<QuestionQuiz> getIds() {
        return ids;
    }

    public Quiz ids(Set<QuestionQuiz> questionQuizs) {
        this.ids = questionQuizs;
        return this;
    }

    public Quiz addId(QuestionQuiz questionQuiz) {
        this.ids.add(questionQuiz);
        questionQuiz.setQuiz(this);
        return this;
    }*/

    public Quiz removeId(QuestionQuiz questionQuiz) {
        this.ids.remove(questionQuiz);
        questionQuiz.setQuiz(null);
        return this;
    }

   /* public void setIds(Set<QuestionQuiz> questionQuizs) {
        this.ids = questionQuizs;
    }*/
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
            ", qtyQuestion=" + getQtyQuestion() +
            "}";
    }
}
