package com.lustprision.admin.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Login.
 */
@Entity
@Table(name = "login")
public class Login implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "type")
    private String type;

    @OneToMany(mappedBy = "login")
    private Set<Prisioner> userPrisionerNames = new HashSet<>();

    @OneToMany(mappedBy = "login")
    private Set<SystemAdmin> userSystemNames = new HashSet<>();

    @OneToMany(mappedBy = "login")
    private Set<AdminEmploy> userAdminNames = new HashSet<>();

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

    public Set<Prisioner> getUserPrisionerNames() {
        return userPrisionerNames;
    }

    public Login userPrisionerNames(Set<Prisioner> prisioners) {
        this.userPrisionerNames = prisioners;
        return this;
    }

    public Login addUserName(Prisioner prisioner) {
        this.userPrisionerNames.add(prisioner);
//        prisioner.setLogin(this);
        return this;
    }

    public Login removeUserName(Prisioner prisioner) {
        this.userPrisionerNames.remove(prisioner);
//        prisioner.setLogin(null);
        return this;
    }

    public void setPrisionerUserNames(Set<Prisioner> prisioners) {
        this.userPrisionerNames = prisioners;
    }

    public Set<SystemAdmin> getSystemUserNames() {
        return userSystemNames;
    }

    public Login userSystemNames(Set<SystemAdmin> systemAdmins) {
        this.userSystemNames = systemAdmins;
        return this;
    }

    public Login addUserName(SystemAdmin systemAdmin) {
        this.userSystemNames.add(systemAdmin);
        systemAdmin.setLogin(this);
        return this;
    }

    public Login removeUserName(SystemAdmin systemAdmin) {
        this.userSystemNames.remove(systemAdmin);
        systemAdmin.setLogin(null);
        return this;
    }

    public void setUserSystemNames(Set<SystemAdmin> systemAdmins) {
        this.userSystemNames = systemAdmins;
    }

    public Set<AdminEmploy> getUserNames() {
        return userAdminNames;
    }

    public Login userNames(Set<AdminEmploy> adminEmploys) {
        this.userAdminNames = adminEmploys;
        return this;
    }

    public Login addUserName(AdminEmploy adminEmploy) {
        this.userAdminNames.add(adminEmploy);
        adminEmploy.setLogin(this);
        return this;
    }

    public Login removeUserName(AdminEmploy adminEmploy) {
        this.userAdminNames.remove(adminEmploy);
        adminEmploy.setLogin(null);
        return this;
    }

    public void setUserNames(Set<AdminEmploy> adminEmploys) {
        this.userAdminNames = adminEmploys;
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
            ", password='" + getPassword() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
