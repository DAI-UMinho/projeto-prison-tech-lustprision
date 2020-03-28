package com.lustprision.admin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

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
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Prisioner implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "bi")
    private Integer bi;

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

    @Column(name = "jhi_password")
    private String password;

    @Lob
    @Column(name = "profile_image")
    private byte[] profileImage;

    @Column(name = "profile_image_content_type")
    private String profileImageContentType;

    @OneToMany(mappedBy = "prisioner")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PressWork> ids = new HashSet<>();

    @OneToMany(mappedBy = "prisioner")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PrisQuiz> idsa = new HashSet<>();

    @OneToMany(mappedBy = "prisioner")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Purchase> idsaa = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("ids")
    private Login login;

    @ManyToOne
    @JsonIgnoreProperties("ids")
    private Permission permission;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public byte[] getProfileImage() {
        return profileImage;
    }

    public Prisioner profileImage(byte[] profileImage) {
        this.profileImage = profileImage;
        return this;
    }

    public void setProfileImage(byte[] profileImage) {
        this.profileImage = profileImage;
    }

    public String getProfileImageContentType() {
        return profileImageContentType;
    }

    public Prisioner profileImageContentType(String profileImageContentType) {
        this.profileImageContentType = profileImageContentType;
        return this;
    }

    public void setProfileImageContentType(String profileImageContentType) {
        this.profileImageContentType = profileImageContentType;
    }

  /*  public Set<PressWork> getIds() {
        return ids;
    }

    public Prisioner ids(Set<PressWork> pressWorks) {
        this.ids = pressWorks;
        return this;
    }

    public Prisioner addId(PressWork pressWork) {
        this.ids.add(pressWork);
        pressWork.setPrisioner(this);
        return this;
    }

    public Prisioner removeId(PressWork pressWork) {
        this.ids.remove(pressWork);
        pressWork.setPrisioner(null);
        return this;
    }

    public void setIds(Set<PressWork> pressWorks) {
        this.ids = pressWorks;
    }

    public Set<PrisQuiz> getIds() {
        return ids;
    }

    public Prisioner ids(Set<PrisQuiz> prisQuizs) {
        this.ids = prisQuizs;
        return this;
    }

    public Prisioner addId(PrisQuiz prisQuiz) {
        this.ids.add(prisQuiz);
        prisQuiz.setPrisioner(this);
        return this;
    }

    public Prisioner removeId(PrisQuiz prisQuiz) {
        this.ids.remove(prisQuiz);
        prisQuiz.setPrisioner(null);
        return this;
    }

    public void setIds(Set<PrisQuiz> prisQuizs) {
        this.ids = prisQuizs;
    }

    public Set<Purchase> getIds() {
        return ids;
    }

    public Prisioner ids(Set<Purchase> purchases) {
        this.ids = purchases;
        return this;
    }

    public Prisioner addId(Purchase purchase) {
        this.ids.add(purchase);
        purchase.setPrisioner(this);
        return this;
    }

    public Prisioner removeId(Purchase purchase) {
        this.ids.remove(purchase);
        purchase.setPrisioner(null);
        return this;
    }

    public void setIds(Set<Purchase> purchases) {
        this.ids = purchases;
    }*/

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
            ", name='" + getName() + "'" +
            ", bi=" + getBi() +
            ", numPrisioner=" + getNumPrisioner() +
            ", numCell=" + getNumCell() +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", balance=" + getBalance() +
            ", working=" + getWorking() +
            ", password='" + getPassword() + "'" +
            ", profileImage='" + getProfileImage() + "'" +
            ", profileImageContentType='" + getProfileImageContentType() + "'" +
            "}";
    }
}
