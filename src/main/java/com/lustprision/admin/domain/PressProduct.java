package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PressProduct.
 */
@Entity
@Table(name = "press_product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PressProduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "qty")
    private Integer qty;

    @Column(name = "price_total")
    private Long priceTotal;

    @ManyToOne
    @JsonIgnoreProperties("ids")
    private Purchase purchase;

    @ManyToOne
    @JsonIgnoreProperties("ids")
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQty() {
        return qty;
    }

    public PressProduct qty(Integer qty) {
        this.qty = qty;
        return this;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public Long getPriceTotal() {
        return priceTotal;
    }

    public PressProduct priceEach(Long priceEach) {
        this.priceTotal = priceEach;
        return this;
    }

    public void setPriceTotal(Long priceEach) {
        this.priceTotal = priceEach;
    }

    public Purchase getPurchase() {
        return purchase;
    }

    public PressProduct purchase(Purchase purchase) {
        this.purchase = purchase;
        return this;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public Product getProduct() {
        return product;
    }

    public PressProduct product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PressProduct)) {
            return false;
        }
        return id != null && id.equals(((PressProduct) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PressProduct{" +
            "id=" + getId() +
            ", qty=" + getQty() +
            ", priceEach=" + getPriceTotal() +
            "}";
    }
}
