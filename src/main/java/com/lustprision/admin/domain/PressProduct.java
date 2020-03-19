package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

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

    @Column(name = "product_code")
    private Integer productCode;

    @Column(name = "quaty")
    private Integer quaty;

    @Column(name = "price_each")
    private Long priceEach;

    @Column(name = "purchase_id_purchase")
    private Integer purchaseIdPurchase;

    @ManyToOne
    @JsonIgnoreProperties("pressProducts")
    private Purchase idPrisioner;

    @ManyToOne
    @JsonIgnoreProperties("pressProducts")
    private Product idProduct;

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

    public Integer getProductCode() {
        return productCode;
    }

    public PressProduct productCode(Integer productCode) {
        this.productCode = productCode;
        return this;
    }

    public void setProductCode(Integer productCode) {
        this.productCode = productCode;
    }

    public Integer getQuaty() {
        return quaty;
    }

    public PressProduct quaty(Integer quaty) {
        this.quaty = quaty;
        return this;
    }

    public void setQuaty(Integer quaty) {
        this.quaty = quaty;
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

    public Integer getPurchaseIdPurchase() {
        return purchaseIdPurchase;
    }

    public PressProduct purchaseIdPurchase(Integer purchaseIdPurchase) {
        this.purchaseIdPurchase = purchaseIdPurchase;
        return this;
    }

    public void setPurchaseIdPurchase(Integer purchaseIdPurchase) {
        this.purchaseIdPurchase = purchaseIdPurchase;
    }

    public Purchase getIdPrisioner() {
        return idPrisioner;
    }

    public PressProduct idPrisioner(Purchase purchase) {
        this.idPrisioner = purchase;
        return this;
    }

    public void setIdPrisioner(Purchase purchase) {
        this.idPrisioner = purchase;
    }

    public Product getIdProduct() {
        return idProduct;
    }

    public PressProduct idProduct(Product product) {
        this.idProduct = product;
        return this;
    }

    public void setIdProduct(Product product) {
        this.idProduct = product;
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
            ", productCode=" + getProductCode() +
            ", quaty=" + getQuaty() +
            ", priceEach=" + getPriceEach() +
            ", purchaseIdPurchase=" + getPurchaseIdPurchase() +
            "}";
    }
}
