package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
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

    @Column(name = "possword")
    private String possword;

    @Column(name = "jhi_type")
    private String type;

    @OneToMany(mappedBy = "login")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Prisioner> loginUserNames = new HashSet<>();

    @OneToMany(mappedBy = "login")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SystemAdmin> userNameAdmins = new HashSet<>();

    @OneToMany(mappedBy = "login")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AdminEmploy> loginUsernames = new HashSet<>();

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

    public String getPossword() {
        return possword;
    }

    public Login possword(String possword) {
        this.possword = possword;
        return this;
    }

    public void setPossword(String possword) {
        this.possword = possword;
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

    public Set<Prisioner> getLoginUserNames() {
        return loginUserNames;
    }

    public Login loginUserNames(Set<Prisioner> prisioners) {
        this.loginUserNames = prisioners;
        return this;
    }

    public Login addLoginUserName(Prisioner prisioner) {
        this.loginUserNames.add(prisioner);
        prisioner.setLogin(this);
        return this;
    }

    public Login removeLoginUserName(Prisioner prisioner) {
        this.loginUserNames.remove(prisioner);
        prisioner.setLogin(null);
        return this;
    }

    public void setLoginUserNames(Set<Prisioner> prisioners) {
        this.loginUserNames = prisioners;
    }

    public Set<SystemAdmin> getUserNameAdmins() {
        return userNameAdmins;
    }

    public Login userNameAdmins(Set<SystemAdmin> systemAdmins) {
        this.userNameAdmins = systemAdmins;
        return this;
    }

    public Login addUserNameAdmin(SystemAdmin systemAdmin) {
        this.userNameAdmins.add(systemAdmin);
        systemAdmin.setLogin(this);
        return this;
    }

    public Login removeUserNameAdmin(SystemAdmin systemAdmin) {
        this.userNameAdmins.remove(systemAdmin);
        systemAdmin.setLogin(null);
        return this;
    }

    public void setUserNameAdmins(Set<SystemAdmin> systemAdmins) {
        this.userNameAdmins = systemAdmins;
    }

    public Set<AdminEmploy> getLoginUsernames() {
        return loginUsernames;
    }

    public Login loginUsernames(Set<AdminEmploy> adminEmploys) {
        this.loginUsernames = adminEmploys;
        return this;
    }

    public Login addLoginUsername(AdminEmploy adminEmploy) {
        this.loginUsernames.add(adminEmploy);
        adminEmploy.setLogin(this);
        return this;
    }

    public Login removeLoginUsername(AdminEmploy adminEmploy) {
        this.loginUsernames.remove(adminEmploy);
        adminEmploy.setLogin(null);
        return this;
    }

    public void setLoginUsernames(Set<AdminEmploy> adminEmploys) {
        this.loginUsernames = adminEmploys;
    }
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
            ", possword='" + getPossword() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
