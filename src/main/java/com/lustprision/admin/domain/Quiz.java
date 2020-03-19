package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

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

    @Column(name = "quest_quiz_id")
    private Integer questQuizId;

    @Column(name = "qty_question")
    private Integer qtyQuestion;

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

    public Integer getQuestQuizId() {
        return questQuizId;
    }

    public Quiz questQuizId(Integer questQuizId) {
        this.questQuizId = questQuizId;
        return this;
    }

    public void setQuestQuizId(Integer questQuizId) {
        this.questQuizId = questQuizId;
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
            ", questQuizId=" + getQuestQuizId() +
            ", qtyQuestion=" + getQtyQuestion() +
            "}";
    }
}
