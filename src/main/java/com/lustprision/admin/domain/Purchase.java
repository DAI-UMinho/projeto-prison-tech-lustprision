package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

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

    @NotNull
    @Column(name = "purchase_date", nullable = false)
    private Instant date;

    @NotNull
    @Column(name = "purchase_total", nullable = false)
    private Double purchaseTotal;

    @OneToMany(mappedBy = "purchase")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PressProduct> ids = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("ids")
    private Prisioner prisioner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Purchase date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Double getPurchaseTotal() {
        return purchaseTotal;
    }

    public Purchase purchaseTotal(Double purchaseTotal) {
        this.purchaseTotal = purchaseTotal;
        return this;
    }

    public void setPurchaseTotal(Double purchaseTotal) {
        this.purchaseTotal = purchaseTotal;
    }

    public Set<PressProduct> getIds() {
        return ids;
    }

    public Purchase ids(Set<PressProduct> pressProducts) {
        this.ids = pressProducts;
        return this;
    }

    public Purchase addId(PressProduct pressProduct) {
        this.ids.add(pressProduct);
        pressProduct.setPurchase(this);
        return this;
    }

    public Purchase removeId(PressProduct pressProduct) {
        this.ids.remove(pressProduct);
        pressProduct.setPurchase(null);
        return this;
    }

    public void setIds(Set<PressProduct> pressProducts) {
        this.ids = pressProducts;
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
            ", date='" + getDate() + "'" +
            ", purchaseTotal=" + getPurchaseTotal() +
            "}";
    }
}
