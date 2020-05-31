package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Product.
 */
@Entity
@Audited
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_prod")
    private String nameProd;

    @Column(name = "price")
    private Long price;

    @Column(name = "seler")
    private String seler;

    @Column(name = "description_prod")
    private String descriptionProd;

    @Column(name = "quanty_in_stock")
    private Integer quantyInStock;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @NotAudited
    @OneToMany(mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PressProduct> ids = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameProd() {
        return nameProd;
    }

    public Product nameProd(String nameProd) {
        this.nameProd = nameProd;
        return this;
    }

    public void setNameProd(String nameProd) {
        this.nameProd = nameProd;
    }

    public Long getPrice() {
        return price;
    }

    public Product price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getSeler() {
        return seler;
    }

    public Product seler(String seler) {
        this.seler = seler;
        return this;
    }

    public void setSeler(String seler) {
        this.seler = seler;
    }

    public String getDescriptionProd() {
        return descriptionProd;
    }

    public Product descriptionProd(String descriptionProd) {
        this.descriptionProd = descriptionProd;
        return this;
    }

    public void setDescriptionProd(String descriptionProd) {
        this.descriptionProd = descriptionProd;
    }

    public Integer getQuantyInStock() {
        return quantyInStock;
    }

    public Product quantyInStock(Integer quantyInStock) {
        this.quantyInStock = quantyInStock;
        return this;
    }

    public void setQuantyInStock(Integer quantyInStock) {
        this.quantyInStock = quantyInStock;
    }

    public byte[] getImage() {
        return image;
    }

    public Product image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Product imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Set<PressProduct> getIds() {
        return ids;
    }

    public Product ids(Set<PressProduct> pressProducts) {
        this.ids = pressProducts;
        return this;
    }

    public Product addId(PressProduct pressProduct) {
        this.ids.add(pressProduct);
        pressProduct.setProduct(this);
        return this;
    }

    public Product removeId(PressProduct pressProduct) {
        this.ids.remove(pressProduct);
        pressProduct.setProduct(null);
        return this;
    }

    public void setIds(Set<PressProduct> pressProducts) {
        this.ids = pressProducts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", nameProd='" + getNameProd() + "'" +
            ", price=" + getPrice() +
            ", seler='" + getSeler() + "'" +
            ", descriptionProd='" + getDescriptionProd() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            "}";
    }
}
