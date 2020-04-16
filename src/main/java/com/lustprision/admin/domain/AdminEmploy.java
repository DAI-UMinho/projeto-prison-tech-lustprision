package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

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

    @Column(name = "name_admin_emp")
    private String nameAdminEmp;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "activated", nullable = false)
    private Boolean activated;

    @Size(max = 20)
    @Column(name = "activation_key", length = 20)
    private String actitionKey;

    @Size(max = 20)
    @Column(name = "reset_key", length = 20)
    private String resetKey;

    @Column(name = "reset_date")
    private Instant resetDate;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("adminEmploys")
    private Authority authority;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getEmail() {
        return email;
    }

    public AdminEmploy email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isActivated() {
        return activated;
    }

    public AdminEmploy activated(Boolean activated) {
        this.activated = activated;
        return this;
    }

    public void setActivated(Boolean activated) {
        this.activated = activated;
    }

    public String getActitionKey() {
        return actitionKey;
    }

    public AdminEmploy actitionKey(String actitionKey) {
        this.actitionKey = actitionKey;
        return this;
    }

    public void setActitionKey(String actitionKey) {
        this.actitionKey = actitionKey;
    }

    public String getResetKey() {
        return resetKey;
    }

    public AdminEmploy resetKey(String resetKey) {
        this.resetKey = resetKey;
        return this;
    }

    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    public Instant getResetDate() {
        return resetDate;
    }

    public AdminEmploy resetDate(Instant resetDate) {
        this.resetDate = resetDate;
        return this;
    }

    public void setResetDate(Instant resetDate) {
        this.resetDate = resetDate;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public Authority getAuthority(){ return authority; }

    public void setAuthority(Authority authority){ this.authority = authority; }

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
            ", nameAdminEmp='" + getNameAdminEmp() + "'" +
            ", email='" + getEmail() + "'" +
            ", activated='" + isActivated() + "'" +
            ", actitionKey='" + getActitionKey() + "'" +
            ", resetKey='" + getResetKey() + "'" +
            ", resetDate='" + getResetDate() + "'" +
            ", authority='" + getAuthority().getName() + "'" +
            "}";
    }
}
