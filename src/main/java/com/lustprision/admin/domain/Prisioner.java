package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Prisioner.
 */
@Entity
@Table(name = "prisioner")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Prisioner implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "id_prisioner")
    private Integer idPrisioner;

    @Column(name = "name")
    private String name;

    @Column(name = "bi")
    private Integer bi;

    @Column(name = "image")
    private String image;

    @Column(name = "num_prisioner")
    private Integer numPrisioner;

    @Column(name = "num_cell")
    private Integer numCell;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "balance")
    private Double balance;

    @Column(name = "login_user_name")
    private String loginUserName;

    @Column(name = "permissinid_permission")
    private Integer permissinidPermission;

    @Column(name = "working")
    private Integer working;

    @Column(name = "jhi_password")
    private String password;

    @OneToMany(mappedBy = "prisioner")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Purchase> idPurchases = new HashSet<>();

    @OneToMany(mappedBy = "prisioner")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PressWork> workIds = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("prisioners")
    private Permission idPermission;

    @ManyToOne
    @JsonIgnoreProperties("loginUserNames")
    private Login login;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIdPrisioner() {
        return idPrisioner;
    }

    public Prisioner idPrisioner(Integer idPrisioner) {
        this.idPrisioner = idPrisioner;
        return this;
    }

    public void setIdPrisioner(Integer idPrisioner) {
        this.idPrisioner = idPrisioner;
    }

    public String getName() {
        return name;
    }

    public Prisioner name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBi() {
        return bi;
    }

    public Prisioner bi(Integer bi) {
        this.bi = bi;
        return this;
    }

    public void setBi(Integer bi) {
        this.bi = bi;
    }

    public String getImage() {
        return image;
    }

    public Prisioner image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getNumPrisioner() {
        return numPrisioner;
    }

    public Prisioner numPrisioner(Integer numPrisioner) {
        this.numPrisioner = numPrisioner;
        return this;
    }

    public void setNumPrisioner(Integer numPrisioner) {
        this.numPrisioner = numPrisioner;
    }

    public Integer getNumCell() {
        return numCell;
    }

    public Prisioner numCell(Integer numCell) {
        this.numCell = numCell;
        return this;
    }

    public void setNumCell(Integer numCell) {
        this.numCell = numCell;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public Prisioner dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Double getBalance() {
        return balance;
    }

    public Prisioner balance(Double balance) {
        this.balance = balance;
        return this;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getLoginUserName() {
        return loginUserName;
    }

    public Prisioner loginUserName(String loginUserName) {
        this.loginUserName = loginUserName;
        return this;
    }

    public void setLoginUserName(String loginUserName) {
        this.loginUserName = loginUserName;
    }

    public Integer getPermissinidPermission() {
        return permissinidPermission;
    }

    public Prisioner permissinidPermission(Integer permissinidPermission) {
        this.permissinidPermission = permissinidPermission;
        return this;
    }

    public void setPermissinidPermission(Integer permissinidPermission) {
        this.permissinidPermission = permissinidPermission;
    }

    public Integer getWorking() {
        return working;
    }

    public Prisioner working(Integer working) {
        this.working = working;
        return this;
    }

    public void setWorking(Integer working) {
        this.working = working;
    }

    public String getPassword() {
        return password;
    }

    public Prisioner password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Purchase> getIdPurchases() {
        return idPurchases;
    }

    public Prisioner idPurchases(Set<Purchase> purchases) {
        this.idPurchases = purchases;
        return this;
    }

    public Prisioner addIdPurchase(Purchase purchase) {
        this.idPurchases.add(purchase);
        purchase.setPrisioner(this);
        return this;
    }

    public Prisioner removeIdPurchase(Purchase purchase) {
        this.idPurchases.remove(purchase);
        purchase.setPrisioner(null);
        return this;
    }

    public void setIdPurchases(Set<Purchase> purchases) {
        this.idPurchases = purchases;
    }

    public Set<PressWork> getWorkIds() {
        return workIds;
    }

    public Prisioner workIds(Set<PressWork> pressWorks) {
        this.workIds = pressWorks;
        return this;
    }

    public Prisioner addWorkId(PressWork pressWork) {
        this.workIds.add(pressWork);
        pressWork.setPrisioner(this);
        return this;
    }

    public Prisioner removeWorkId(PressWork pressWork) {
        this.workIds.remove(pressWork);
        pressWork.setPrisioner(null);
        return this;
    }

    public void setWorkIds(Set<PressWork> pressWorks) {
        this.workIds = pressWorks;
    }

    public Permission getIdPermission() {
        return idPermission;
    }

    public Prisioner idPermission(Permission permission) {
        this.idPermission = permission;
        return this;
    }

    public void setIdPermission(Permission permission) {
        this.idPermission = permission;
    }

    public Login getLogin() {
        return login;
    }

    public Prisioner login(Login login) {
        this.login = login;
        return this;
    }

    public void setLogin(Login login) {
        this.login = login;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Prisioner)) {
            return false;
        }
        return id != null && id.equals(((Prisioner) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Prisioner{" +
            "id=" + getId() +
            ", idPrisioner=" + getIdPrisioner() +
            ", name='" + getName() + "'" +
            ", bi=" + getBi() +
            ", image='" + getImage() + "'" +
            ", numPrisioner=" + getNumPrisioner() +
            ", numCell=" + getNumCell() +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", balance=" + getBalance() +
            ", loginUserName='" + getLoginUserName() + "'" +
            ", permissinidPermission=" + getPermissinidPermission() +
            ", working=" + getWorking() +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
