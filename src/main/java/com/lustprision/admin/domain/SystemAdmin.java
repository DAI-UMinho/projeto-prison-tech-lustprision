package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A SystemAdmin.
 */
@Entity
@Table(name = "system_admin")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SystemAdmin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_sys_admin")
    private Integer idSysAdmin;

    @Column(name = "name_admin")
    private String nameAdmin;

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

    public Integer getIdSysAdmin() {
        return idSysAdmin;
    }

    public SystemAdmin idSysAdmin(Integer idSysAdmin) {
        this.idSysAdmin = idSysAdmin;
        return this;
    }

    public void setIdSysAdmin(Integer idSysAdmin) {
        this.idSysAdmin = idSysAdmin;
    }

    public String getNameAdmin() {
        return nameAdmin;
    }

    public SystemAdmin nameAdmin(String nameAdmin) {
        this.nameAdmin = nameAdmin;
        return this;
    }

    public void setNameAdmin(String nameAdmin) {
        this.nameAdmin = nameAdmin;
    }

    public String getPassword() {
        return password;
    }

    public SystemAdmin password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Login getLogin() {
        return login;
    }

    public SystemAdmin login(Login login) {
        this.login = login;
        return this;
    }

    public void setLogin(Login login) {
        this.login = login;
    }

    public Permission getPermission() {
        return permission;
    }

    public SystemAdmin permission(Permission permission) {
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
        if (!(o instanceof SystemAdmin)) {
            return false;
        }
        return id != null && id.equals(((SystemAdmin) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SystemAdmin{" +
            "id=" + getId() +
            ", idSysAdmin=" + getIdSysAdmin() +
            ", nameAdmin='" + getNameAdmin() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
