package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

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

    @Column(name = "prisioner_id")
    private Integer prisionerId;

    @Column(name = "work_id")
    private Integer workId;

    @ManyToOne
    @JsonIgnoreProperties("pressWorks")
    private Work idWork;

    @ManyToOne
    @JsonIgnoreProperties("workIds")
    private Prisioner prisioner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPrisionerId() {
        return prisionerId;
    }

    public PressWork prisionerId(Integer prisionerId) {
        this.prisionerId = prisionerId;
        return this;
    }

    public void setPrisionerId(Integer prisionerId) {
        this.prisionerId = prisionerId;
    }

    public Integer getWorkId() {
        return workId;
    }

    public PressWork workId(Integer workId) {
        this.workId = workId;
        return this;
    }

    public void setWorkId(Integer workId) {
        this.workId = workId;
    }

    public Work getIdWork() {
        return idWork;
    }

    public PressWork idWork(Work work) {
        this.idWork = work;
        return this;
    }

    public void setIdWork(Work work) {
        this.idWork = work;
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
            ", prisionerId=" + getPrisionerId() +
            ", workId=" + getWorkId() +
            "}";
    }
}
