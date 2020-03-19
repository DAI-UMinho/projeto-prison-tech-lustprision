package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Permission.
 */
@Entity
@Table(name = "permission")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Permission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_premissin")
    private Integer idPremissin;

    @Column(name = "desc_permission")
    private String descPermission;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdPremissin() {
        return idPremissin;
    }

    public Permission idPremissin(Integer idPremissin) {
        this.idPremissin = idPremissin;
        return this;
    }

    public void setIdPremissin(Integer idPremissin) {
        this.idPremissin = idPremissin;
    }

    public String getDescPermission() {
        return descPermission;
    }

    public Permission descPermission(String descPermission) {
        this.descPermission = descPermission;
        return this;
    }

    public void setDescPermission(String descPermission) {
        this.descPermission = descPermission;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Permission)) {
            return false;
        }
        return id != null && id.equals(((Permission) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Permission{" +
            "id=" + getId() +
            ", idPremissin=" + getIdPremissin() +
            ", descPermission='" + getDescPermission() + "'" +
            "}";
    }
}
