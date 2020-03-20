package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
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

    @Column(name = "id_purchase")
    private Integer idPurchase;

    @OneToMany(mappedBy = "purchase")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PressProduct> idPurchases = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("idPrisioners")
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

    public Set<PressProduct> getIdPurchases() {
        return idPurchases;
    }

    public Purchase idPurchases(Set<PressProduct> pressProducts) {
        this.idPurchases = pressProducts;
        return this;
    }

    public Purchase addIdPurchase(PressProduct pressProduct) {
        this.idPurchases.add(pressProduct);
        pressProduct.setPurchase(this);
        return this;
    }

    public Purchase removeIdPurchase(PressProduct pressProduct) {
        this.idPurchases.remove(pressProduct);
        pressProduct.setPurchase(null);
        return this;
    }

    public void setIdPurchases(Set<PressProduct> pressProducts) {
        this.idPurchases = pressProducts;
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
            "}";
    }
}
