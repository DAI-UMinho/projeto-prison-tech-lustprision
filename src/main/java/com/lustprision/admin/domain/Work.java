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

    @Column(name = "name_work")
    private String nameWork;

    @Column(name = "price_hour")
    private Long priceHour;

    @Column(name = "num_vacancies")
    private Integer numVacancies;

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
            ", priceHour=" + getPriceHour() +
            ", numVacancies=" + getNumVacancies() +
            "}";
    }
}
