package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Work.
 */
@Entity
@Table(name = "jhi_work")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Work implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_work")
    private Integer idWork;

    @Column(name = "name_work")
    private String nameWork;

    @Column(name = "price_hour")
    private Long priceHour;

    @Column(name = "num_vacancies")
    private Integer numVacancies;

    @OneToMany(mappedBy = "work")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PressWork> idWorks = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdWork() {
        return idWork;
    }

    public Work idWork(Integer idWork) {
        this.idWork = idWork;
        return this;
    }

    public void setIdWork(Integer idWork) {
        this.idWork = idWork;
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

    public Long getPriceHour() {
        return priceHour;
    }

    public Work priceHour(Long priceHour) {
        this.priceHour = priceHour;
        return this;
    }

    public void setPriceHour(Long priceHour) {
        this.priceHour = priceHour;
    }

    public Integer getNumVacancies() {
        return numVacancies;
    }

    public Work numVacancies(Integer numVacancies) {
        this.numVacancies = numVacancies;
        return this;
    }

    public void setNumVacancies(Integer numVacancies) {
        this.numVacancies = numVacancies;
    }

    public Set<PressWork> getIdWorks() {
        return idWorks;
    }

    public Work idWorks(Set<PressWork> pressWorks) {
        this.idWorks = pressWorks;
        return this;
    }

    public Work addIdWork(PressWork pressWork) {
        this.idWorks.add(pressWork);
        pressWork.setWork(this);
        return this;
    }

    public Work removeIdWork(PressWork pressWork) {
        this.idWorks.remove(pressWork);
        pressWork.setWork(null);
        return this;
    }

    public void setIdWorks(Set<PressWork> pressWorks) {
        this.idWorks = pressWorks;
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
            ", idWork=" + getIdWork() +
            ", nameWork='" + getNameWork() + "'" +
            ", priceHour=" + getPriceHour() +
            ", numVacancies=" + getNumVacancies() +
            "}";
    }
}
