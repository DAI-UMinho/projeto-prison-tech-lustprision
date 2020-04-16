package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Work.
 */
@Entity
@Table(name = "work_job")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Work implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_work")
    private String nameWork;

    @Column(name = "total_credits")
    private Long totalCredits;

    @Column(name = "num_remaining_entries")
    private Integer numRemainingEntries;

    @Column(name = "date_work")
    private LocalDate date;

    @OneToMany(mappedBy = "work")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PressWork> ids = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameWork() {
        return nameWork;
    }

    public Work nameWork(String nameWork) {
        this.nameWork = nameWork;
        return this;
    }

    public void setNameWork(String nameWork) {
        this.nameWork = nameWork;
    }

    public Long getTotalCredits() {
        return totalCredits;
    }

    public Work priceHour(Long priceHour) {
        this.totalCredits = priceHour;
        return this;
    }

    public void setTotalCredits(Long priceHour) {
        this.totalCredits = priceHour;
    }

    public Integer getNumRemainingEntries() {
        return numRemainingEntries;
    }

    public Work numVacancies(Integer numVacancies) {
        this.numRemainingEntries = numVacancies;
        return this;
    }

    public void setNumRemainingEntries(Integer numVacancies) {
        this.numRemainingEntries = numVacancies;
    }

    public LocalDate getDate() {
        return date;
    }

    public Work date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<PressWork> getIds() {
        return ids;
    }

    public Work ids(Set<PressWork> pressWorks) {
        this.ids = pressWorks;
        return this;
    }

    public Work addId(PressWork pressWork) {
        this.ids.add(pressWork);
        pressWork.setWork(this);
        return this;
    }

    public Work removeId(PressWork pressWork) {
        this.ids.remove(pressWork);
        pressWork.setWork(null);
        return this;
    }

    public void setIds(Set<PressWork> pressWorks) {
        this.ids = pressWorks;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Work)) {
            return false;
        }
        return id != null && id.equals(((Work) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Work{" +
            "id=" + getId() +
            ", nameWork='" + getNameWork() + "'" +
            ", priceHour=" + getTotalCredits() +
            ", numVacancies=" + getNumRemainingEntries() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
