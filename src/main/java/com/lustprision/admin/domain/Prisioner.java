package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lustprision.admin.domain.Login;
import com.lustprision.admin.domain.PressWork;
import com.lustprision.admin.domain.PrisQuiz;
import com.lustprision.admin.domain.Purchase;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Prisioner.
 */
@Entity
@Table(name = "prisioner")
public class Prisioner implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "working")
    private Integer working;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "prisioner")
    private Set<PressWork> idWorkPrisioners = new HashSet<>();

    @OneToMany(mappedBy = "prisioner")
    private Set<PrisQuiz> idQuizPrisioners = new HashSet<>();

    @OneToMany(mappedBy = "prisioner")
    private Set<Purchase> idPurchasePrisioners = new HashSet<>();

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

    public Set<PressWork> getIdWorkPrisioners() {
        return idWorkPrisioners;
    }

    public Prisioner idWorkPrisioners(Set<PressWork> pressWorks) {
        this.idWorkPrisioners = pressWorks;
        return this;
    }

    public Prisioner addIdPrisioner(PressWork pressWork) {
        this.idWorkPrisioners.add(pressWork);
        pressWork.setPrisioner(this);
        return this;
    }

    public Prisioner removeIdPrisioner(PressWork pressWork) {
        this.idWorkPrisioners.remove(pressWork);
        pressWork.setPrisioner(null);
        return this;
    }

    public void setIdWorkPrisioners(Set<PressWork> pressWorks) {
        this.idWorkPrisioners = pressWorks;
    }

    public Set<PrisQuiz> getIdQuizPrisioners() {
        return idQuizPrisioners;
    }

    public Prisioner idQuizPrisioners(Set<PrisQuiz> prisQuizs) {
        this.idQuizPrisioners = prisQuizs;
        return this;
    }

    public Prisioner addIdPrisioner(PrisQuiz prisQuiz) {
        this.idQuizPrisioners.add(prisQuiz);
        prisQuiz.setPrisioner(this);
        return this;
    }

    public Prisioner removeIdPrisioner(PrisQuiz prisQuiz) {
        this.idQuizPrisioners.remove(prisQuiz);
        prisQuiz.setPrisioner(null);
        return this;
    }

    public void setIdQuizPrisioners(Set<PrisQuiz> prisQuizs) {
        this.idQuizPrisioners = prisQuizs;
    }

    public Set<Purchase> getIdPurchasePrisioners() {
        return idPurchasePrisioners;
    }

    public Prisioner idPurchasePrisioners(Set<Purchase> purchases) {
        this.idPurchasePrisioners = purchases;
        return this;
    }

    public Prisioner addIdPrisioner(Purchase purchase) {
        this.idPurchasePrisioners.add(purchase);
        purchase.setPrisioner(this);
        return this;
    }

    public Prisioner removeIdPrisioner(Purchase purchase) {
        this.idPurchasePrisioners.remove(purchase);
        purchase.setPrisioner(null);
        return this;
    }

    public void setIdPrisioners(Set<Purchase> purchases) {
        this.idPurchasePrisioners = purchases;
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

    public Permission getPermission() {
        return permission;
    }

    public Prisioner permission(Permission permission) {
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
            ", working=" + getWorking() +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
