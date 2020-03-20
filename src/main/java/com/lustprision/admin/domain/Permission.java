package com.lustprision.admin.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Permission.
 */
@Entity
@Table(name = "permission")
public class Permission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_permission")
    private Integer idPermission;

    @Column(name = "desc_permission")
    private String descPermission;

    @OneToMany(mappedBy = "permission")
    private Set<Prisioner> idPrisionerPermissions = new HashSet<>();

    @OneToMany(mappedBy = "permission")
    private Set<SystemAdmin> idSystemPermissions = new HashSet<>();

    @OneToMany(mappedBy = "permission")
    private Set<AdminEmploy> idAdminPermissions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdPermission() {
        return idPermission;
    }

    public Permission idPermission(Integer idPermission) {
        this.idPermission = idPermission;
        return this;
    }

    public void setIdPermission(Integer idPermission) {
        this.idPermission = idPermission;
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

    public Set<Prisioner> getIdPrisionerPermissions() {
        return idPrisionerPermissions;
    }

    public Permission idPrisionerPermissions(Set<Prisioner> prisioners) {
        this.idPrisionerPermissions = prisioners;
        return this;
    }

    public Permission addIdPermission(Prisioner prisioner) {
        this.idPrisionerPermissions.add(prisioner);
//        prisioner.setPermission(this);
        return this;
    }

    public Permission removeIdPermission(Prisioner prisioner) {
        this.idPrisionerPermissions.remove(prisioner);
//        prisioner.setPermission(null);
        return this;
    }

    public void setIdPrsionerPermissions(Set<Prisioner> prisioners) {
        this.idPrisionerPermissions = prisioners;
    }

    public Set<SystemAdmin> getIdSystemPermissions() {
        return idSystemPermissions;
    }

    public Permission idSystemPermissions(Set<SystemAdmin> systemAdmins) {
        this.idSystemPermissions = systemAdmins;
        return this;
    }

    public Permission addIdPermission(SystemAdmin systemAdmin) {
        this.idSystemPermissions.add(systemAdmin);
        systemAdmin.setPermission(this);
        return this;
    }

    public Permission removeIdPermission(SystemAdmin systemAdmin) {
        this.idSystemPermissions.remove(systemAdmin);
        systemAdmin.setPermission(null);
        return this;
    }

    public void setIdPSystemermissions(Set<SystemAdmin> systemAdmins) {
        this.idSystemPermissions = systemAdmins;
    }

    public Set<AdminEmploy> getIdPermissions() {
        return idAdminPermissions;
    }

    public Permission idPermissions(Set<AdminEmploy> adminEmploys) {
        this.idAdminPermissions = adminEmploys;
        return this;
    }

    public Permission addIdPermission(AdminEmploy adminEmploy) {
        this.idAdminPermissions.add(adminEmploy);
        adminEmploy.setPermission(this);
        return this;
    }

    public Permission removeIdPermission(AdminEmploy adminEmploy) {
        this.idAdminPermissions.remove(adminEmploy);
        adminEmploy.setPermission(null);
        return this;
    }

    public void setIdPermissions(Set<AdminEmploy> adminEmploys) {
        this.idAdminPermissions = adminEmploys;
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
            ", idPermission=" + getIdPermission() +
            ", descPermission='" + getDescPermission() + "'" +
            "}";
    }
}
