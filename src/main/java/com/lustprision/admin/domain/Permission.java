package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name = "desc_permission")
    private String descPermission;

    @OneToMany(mappedBy = "permission")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Prisioner> ids = new HashSet<>();

    @OneToMany(mappedBy = "permission")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SystemAdmin> idsystem = new HashSet<>();

    @OneToMany(mappedBy = "permission")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AdminEmploy> idadmin = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

/*    public Set<Prisioner> getIds() {
        return ids;
    }

    public Permission ids(Set<Prisioner> prisioners) {
        this.ids = prisioners;
        return this;
    }*/

    public Permission addId(Prisioner prisioner) {
        this.ids.add(prisioner);
        prisioner.setPermission(this);
        return this;
    }

    public Permission removeId(Prisioner prisioner) {
        this.ids.remove(prisioner);
        prisioner.setPermission(null);
        return this;
    }

   /* public void setIds(Set<Prisioner> prisioners) {
        this.ids = prisioners;
    }

    public Set<SystemAdmin> getIds() {
        return ids;
    }

    public Permission ids(Set<SystemAdmin> systemAdmins) {
        this.ids = systemAdmins;
        return this;
    }

    public Permission addId(SystemAdmin systemAdmin) {
        this.ids.add(systemAdmin);
        systemAdmin.setPermission(this);
        return this;
    }*/

    public Permission removeId(SystemAdmin systemAdmin) {
        this.ids.remove(systemAdmin);
        systemAdmin.setPermission(null);
        return this;
    }

   /* public void setIds(Set<SystemAdmin> systemAdmins) {
        this.ids = systemAdmins;
    }

    public Set<AdminEmploy> getIds() {
        return ids;
    }

    public Permission ids(Set<AdminEmploy> adminEmploys) {
        this.ids = adminEmploys;
        return this;
    }

    public Permission addId(AdminEmploy adminEmploy) {
        this.ids.add(adminEmploy);
        adminEmploy.setPermission(this);
        return this;
    }*/

    public Permission removeId(AdminEmploy adminEmploy) {
        this.ids.remove(adminEmploy);
        adminEmploy.setPermission(null);
        return this;
    }

    /*public void setIds(Set<AdminEmploy> adminEmploys) {
        this.ids = adminEmploys;
    }*/
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
            ", descPermission='" + getDescPermission() + "'" +
            "}";
    }
}
