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

    @Column(name = "order_id")
    private Integer orderId;

    @Column(name = "qty")
    private Integer qty;

    @Column(name = "price_each")
    private Long priceEach;

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

    public Integer getOrderId() {
        return orderId;
    }

    public PressProduct orderId(Integer orderId) {
        this.orderId = orderId;
        return this;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
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

    public Long getPriceEach() {
        return priceEach;
    }

    public PressProduct priceEach(Long priceEach) {
        this.priceEach = priceEach;
        return this;
    }

    public void setPriceEach(Long priceEach) {
        this.priceEach = priceEach;
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
            ", orderId=" + getOrderId() +
            ", qty=" + getQty() +
            ", priceEach=" + getPriceEach() +
            "}";
    }
}
