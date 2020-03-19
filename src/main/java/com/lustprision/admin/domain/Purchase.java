package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Purchase.
 */
@Entity
@Table(name = "purchase")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Purchase implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_purchase")
    private Integer idPurchase;

    @Column(name = "prisioner_id")
    private Integer prisionerId;

    @ManyToOne
    @JsonIgnoreProperties("idPurchases")
    private Prisioner prisioner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdPurchase() {
        return idPurchase;
    }

    public Purchase idPurchase(Integer idPurchase) {
        this.idPurchase = idPurchase;
        return this;
    }

    public void setIdPurchase(Integer idPurchase) {
        this.idPurchase = idPurchase;
    }

    public Integer getPrisionerId() {
        return prisionerId;
    }

    public Purchase prisionerId(Integer prisionerId) {
        this.prisionerId = prisionerId;
        return this;
    }

    public void setPrisionerId(Integer prisionerId) {
        this.prisionerId = prisionerId;
    }

    public Prisioner getPrisioner() {
        return prisioner;
    }

    public Purchase prisioner(Prisioner prisioner) {
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
        if (!(o instanceof Purchase)) {
            return false;
        }
        return id != null && id.equals(((Purchase) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Purchase{" +
            "id=" + getId() +
            ", idPurchase=" + getIdPurchase() +
            ", prisionerId=" + getPrisionerId() +
            "}";
    }
}
