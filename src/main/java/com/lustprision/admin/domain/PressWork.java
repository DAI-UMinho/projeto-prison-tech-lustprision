package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A PressWork.
 */
@Entity
@Table(name = "press_work")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PressWork implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "work_date")
    private LocalDate workDate;

    @ManyToOne
    @JsonIgnoreProperties("ids")
    private Prisioner prisioner;

    @ManyToOne
    @JsonIgnoreProperties("ids")
    private Work work;

    @OneToOne
    @JoinColumn(unique = true)
    private State state;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getWorkDate() {
        return workDate;
    }

    public PressWork workDate(LocalDate workDate) {
        this.workDate = workDate;
        return this;
    }

    public void setWorkDate(LocalDate workDate) {
        this.workDate = workDate;
    }

    public Prisioner getPrisioner() {
        return prisioner;
    }

    public PressWork prisioner(Prisioner prisioner) {
        this.prisioner = prisioner;
        return this;
    }

    public void setPrisioner(Prisioner prisioner) {
        this.prisioner = prisioner;
    }

    public Work getWork() {
        return work;
    }

    public PressWork work(Work work) {
        this.work = work;
        return this;
    }

    public void setWork(Work work) {
        this.work = work;
    }

    public State getState() {
        return state;
    }

    public PressWork state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PressWork)) {
            return false;
        }
        return id != null && id.equals(((PressWork) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PressWork{" +
            "id=" + getId() +
            ", workDate='" + getWorkDate() + "'" +
            "}";
    }
}
