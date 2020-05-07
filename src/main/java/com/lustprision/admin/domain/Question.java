package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
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

    @Column(name = "question")
    private String question;

    @Column(name = "jhi_value")
    private Double value;

    @Column(name = "answer")
    private String answer;

    @Column(name = "wrong_answer_1")
    private String wrongAnswer1;

    @Column(name = "wrong_answer_2")
    private String wrongAnswer2;

    @Column(name = "wrong_answer_3")
    private String wrongAnswer3;

    @OneToMany(mappedBy = "question")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<QuestionQuiz> ids = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getWrongAnswer1() {
        return wrongAnswer1;
    }

    public Question wrongAnswer1(String wrongAnswer1) {
        this.wrongAnswer1 = wrongAnswer1;
        return this;
    }

    public void setWrongAnswer1(String wrongAnswer1) {
        this.wrongAnswer1 = wrongAnswer1;
    }

    public String getWrongAnswer2() {
        return wrongAnswer2;
    }

    public Question wrongAnswer2(String wrongAnswer2) {
        this.wrongAnswer2 = wrongAnswer2;
        return this;
    }

    public void setWrongAnswer2(String wrongAnswer2) {
        this.wrongAnswer2 = wrongAnswer2;
    }

    public String getWrongAnswer3() {
        return wrongAnswer3;
    }

    public Question wrongAnswer3(String wrongAnswer3) {
        this.wrongAnswer3 = wrongAnswer3;
        return this;
    }

    public void setWrongAnswer3(String wrongAnswer3) {
        this.wrongAnswer3 = wrongAnswer3;
    }

    public Set<QuestionQuiz> getIds() {
        return ids;
    }

    public Question ids(Set<QuestionQuiz> questionQuizs) {
        this.ids = questionQuizs;
        return this;
    }

    public Question addId(QuestionQuiz questionQuiz) {
        this.ids.add(questionQuiz);
        questionQuiz.setQuestion(this);
        return this;
    }

    public Question removeId(QuestionQuiz questionQuiz) {
        this.ids.remove(questionQuiz);
        questionQuiz.setQuestion(null);
        return this;
    }

    public void setIds(Set<QuestionQuiz> questionQuizs) {
        this.ids = questionQuizs;
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
            ", question='" + getQuestion() + "'" +
            ", value=" + getValue() +
            ", answer='" + getAnswer() + "'" +
            ", wrongAnswer1='" + getWrongAnswer1() + "'" +
            ", wrongAnswer2='" + getWrongAnswer2() + "'" +
            ", wrongAnswer3='" + getWrongAnswer3() + "'" +
            "}";
    }
}
