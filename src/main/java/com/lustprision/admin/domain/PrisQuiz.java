package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
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

    @Column(name = "id_prisioner")
    private Integer idPrisioner;

    @Column(name = "id_quiz")
    private Integer idQuiz;

    @Column(name = "quiz_date")
    private LocalDate quizDate;

    @ManyToOne
    @JsonIgnoreProperties("prisQuizs")
    private Quiz idQuiz;

    @ManyToOne
    @JsonIgnoreProperties("prisQuizs")
    private Prisioner idPrisioner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdPrisioner() {
        return idPrisioner;
    }

    public PrisQuiz idPrisioner(Integer idPrisioner) {
        this.idPrisioner = idPrisioner;
        return this;
    }

    public void setIdPrisioner(Integer idPrisioner) {
        this.idPrisioner = idPrisioner;
    }

    public Integer getIdQuiz() {
        return idQuiz;
    }

    public PrisQuiz idQuiz(Integer idQuiz) {
        this.idQuiz = idQuiz;
        return this;
    }

    public void setIdQuiz(Integer idQuiz) {
        this.idQuiz = idQuiz;
    }

    public LocalDate getQuizDate() {
        return quizDate;
    }

    public PrisQuiz quizDate(LocalDate quizDate) {
        this.quizDate = quizDate;
        return this;
    }

    public void setQuizDate(LocalDate quizDate) {
        this.quizDate = quizDate;
    }

    public Quiz getIdQuiz() {
        return idQuiz;
    }

    public PrisQuiz idQuiz(Quiz quiz) {
        this.idQuiz = quiz;
        return this;
    }

    public void setIdQuiz(Quiz quiz) {
        this.idQuiz = quiz;
    }

    public Prisioner getIdPrisioner() {
        return idPrisioner;
    }

    public PrisQuiz idPrisioner(Prisioner prisioner) {
        this.idPrisioner = prisioner;
        return this;
    }

    public void setIdPrisioner(Prisioner prisioner) {
        this.idPrisioner = prisioner;
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
            ", idPrisioner=" + getIdPrisioner() +
            ", idQuiz=" + getIdQuiz() +
            ", quizDate='" + getQuizDate() + "'" +
            "}";
    }
}
