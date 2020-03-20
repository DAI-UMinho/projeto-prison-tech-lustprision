package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A AdminEmploy.
 */
@Entity
@Table(name = "admin_employ")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AdminEmploy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_admin_emp")
    private Integer idAdminEmp;

    @Column(name = "name_admin_emp")
    private String nameAdminEmp;

    @Column(name = "jhi_password")
    private String password;

    @ManyToOne
    @JsonIgnoreProperties("userNames")
    private Login login;

    @ManyToOne
    @JsonIgnoreProperties("idPermissions")
    private Permission permission;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdAdminEmp() {
        return idAdminEmp;
    }

    public AdminEmploy idAdminEmp(Integer idAdminEmp) {
        this.idAdminEmp = idAdminEmp;
        return this;
    }

    public void setIdAdminEmp(Integer idAdminEmp) {
        this.idAdminEmp = idAdminEmp;
    }

    public String getNameAdminEmp() {
        return nameAdminEmp;
    }

    public AdminEmploy nameAdminEmp(String nameAdminEmp) {
        this.nameAdminEmp = nameAdminEmp;
        return this;
    }

    public void setNameAdminEmp(String nameAdminEmp) {
        this.nameAdminEmp = nameAdminEmp;
    }

    public String getPassword() {
        return password;
    }

    public AdminEmploy password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Login getLogin() {
        return login;
    }

    public AdminEmploy login(Login login) {
        this.login = login;
        return this;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public Permission getPermission() {
        return permission;
    }

    public AdminEmploy permission(Permission permission) {
        this.permission = permission;
        return this;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AdminEmploy)) {
            return false;
        }
        return id != null && id.equals(((AdminEmploy) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AdminEmploy{" +
            "id=" + getId() +
            ", idAdminEmp=" + getIdAdminEmp() +
            ", nameAdminEmp='" + getNameAdminEmp() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
