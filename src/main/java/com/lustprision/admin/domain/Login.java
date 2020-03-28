package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Login.
 */
@Entity
@Table(name = "login")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Login implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "jhi_password")
    private String password;

    @Column(name = "jhi_type")
    private String type;

    @OneToMany(mappedBy = "login")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Prisioner> ids = new HashSet<>();

    @OneToMany(mappedBy = "login")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SystemAdmin> idsystem = new HashSet<>();

    @OneToMany(mappedBy = "login")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AdminEmploy> idadmin = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public Login userName(String userName) {
        this.userName = userName;
        return this;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public Login password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public Login type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

/*    public Set<Prisioner> getIds() {
        return ids;
    }

    public Login ids(Set<Prisioner> prisioners) {
        this.ids = prisioners;
        return this;
    }*/

    public Login addId(Prisioner prisioner) {
        this.ids.add(prisioner);
        prisioner.setLogin(this);
        return this;
    }

    public Login removeId(Prisioner prisioner) {
        this.ids.remove(prisioner);
        prisioner.setLogin(null);
        return this;
    }

/*    public void setIds(Set<Prisioner> prisioners) {
        this.ids = prisioners;
    }

    public Set<SystemAdmin> getIds() {
        return ids;
    }

    public Login ids(Set<SystemAdmin> systemAdmins) {
        this.ids = systemAdmins;
        return this;
    }*//*

    public Login addId(SystemAdmin systemAdmin) {
        this.ids.add(systemAdmin);
        systemAdmin.setLogin(this);
        return this;
    }*/

    public Login removeId(SystemAdmin systemAdmin) {
        this.ids.remove(systemAdmin);
        systemAdmin.setLogin(null);
        return this;
    }

/*    public void setIds(Set<SystemAdmin> systemAdmins) {
        this.ids = systemAdmins;
    }

    public Set<AdminEmploy> getIds() {
        return ids;
    }

    public Login ids(Set<AdminEmploy> adminEmploys) {
        this.ids = adminEmploys;
        return this;
    }

    public Login addId(AdminEmploy adminEmploy) {
        this.ids.add(adminEmploy);
        adminEmploy.setLogin(this);
        return this;
    }*/

    public Login removeId(AdminEmploy adminEmploy) {
        this.ids.remove(adminEmploy);
        adminEmploy.setLogin(null);
        return this;
    }

/*    public void setIds(Set<AdminEmploy> adminEmploys) {
        this.ids = adminEmploys;
    }*/
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Login)) {
            return false;
        }
        return id != null && id.equals(((Login) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Login{" +
            "id=" + getId() +
            ", userName='" + getUserName() + "'" +
            ", password='" + getPassword() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
