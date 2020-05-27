package com.lustprision.admin.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

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

    @Column(name = "password_hash")
    private String password;

    @Column(name = "jhi_type")
    private String type;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private AdminEmploy adminEmploy;

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

    public AdminEmploy getAdminEmploy() {
        return adminEmploy;
    }

    public Login adminEmploy(AdminEmploy adminEmploy) {
        this.adminEmploy = adminEmploy;
        return this;
    }

    public void setAdminEmploy(AdminEmploy adminEmploy) {
        this.adminEmploy = adminEmploy;
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
