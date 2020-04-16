//package com.lustprision.admin.domain;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import org.hibernate.annotations.BatchSize;
//import org.hibernate.annotations.Cache;
//import org.hibernate.annotations.CacheConcurrencyStrategy;
//
//import javax.persistence.*;
//import javax.validation.constraints.Email;
//import javax.validation.constraints.NotNull;
//import javax.validation.constraints.Size;
//import java.io.Serializable;
//import java.time.Instant;
//import java.util.HashSet;
//import java.util.Set;
//
///**
// * A user.
// */
//@Entity
//@Table(name = "admin_employ")
//@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
//public class AdminEmployA extends AbstractAuditingEntity implements Serializable {
//
//    private static final long serialVersionUID = 1L;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
//    @SequenceGenerator(name = "sequenceGenerator")
//    private Long id;
//
///*    @Size(max = 50)
//    @Column(name = "first_name", length = 50)
//    private String firstName;
//
//    @Size(max = 50)
//    @Column(name = "last_name", length = 50)
//    private String lastName;*/
//
//    @Column(name = "name_admin_emp")
//    private String nameAdminEmp;
//
//    @Email
//    @Size(min = 5, max = 254)
//    @Column(length = 254, unique = true)
//    private String email;
//
//    @NotNull
//    @Column(nullable = false)
//    private boolean activated = false;
//
///*    @Size(min = 2, max = 10)
//    @Column(name = "lang_key", length = 10)
//    private String langKey;*/
//
//    @Size(max = 256)
//    @Column(name = "image_url", length = 256)
//    private String imageUrl;
//
//    @Size(max = 20)
//    @Column(name = "activation_key", length = 20)
//    @JsonIgnore
//    private String activationKey;
//
//    @Size(max = 20)
//    @Column(name = "reset_key", length = 20)
//    @JsonIgnore
//    private String resetKey;
//
//    @Column(name = "reset_date")
//    private Instant resetDate = null;
//
//    @JsonIgnore
//    @ManyToMany
//    @JoinTable(
//        name = "jhi_user_authority",
//        joinColumns = {@JoinColumn(name = "admin_employ_id", referencedColumnName = "id")},
//        inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})
//    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
//    @BatchSize(size = 20)
//    private Set<Authority> authorities = new HashSet<>();
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getNameAdminEmp() {
//        return nameAdminEmp;
//    }
//
//    public AdminEmploy nameAdminEmp(String nameAdminEmp) {
//        this.nameAdminEmp = nameAdminEmp;
//        return this;
//    }
//
///*    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }*/
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getImageUrl() {
//        return imageUrl;
//    }
//
//    public void setImageUrl(String imageUrl) {
//        this.imageUrl = imageUrl;
//    }
//
//    public boolean getActivated() {
//        return activated;
//    }
//
//    public void setActivated(boolean activated) {
//        this.activated = activated;
//    }
//
//    public String getActivationKey() {
//        return activationKey;
//    }
//
//    public void setActivationKey(String activationKey) {
//        this.activationKey = activationKey;
//    }
//
//    public String getResetKey() {
//        return resetKey;
//    }
//
//    public void setResetKey(String resetKey) {
//        this.resetKey = resetKey;
//    }
//
//    public Instant getResetDate() {
//        return resetDate;
//    }
//
//    public void setResetDate(Instant resetDate) {
//        this.resetDate = resetDate;
//    }
//
///*    public String getLangKey() {
//        return langKey;
//    }
//
//    public void setLangKey(String langKey) {
//        this.langKey = langKey;
//    }*/
//
//    public Set<Authority> getAuthorities() {
//        return authorities;
//    }
//
//    public void setAuthorities(Set<Authority> authorities) {
//        this.authorities = authorities;
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) {
//            return true;
//        }
//        if (!(o instanceof AdminEmploy)) {
//            return false;
//        }
//        return id != null && id.equals(((AdminEmploy) o).id);
//    }
//
//    @Override
//    public int hashCode() {
//        return 31;
//    }
//
//    @Override
//    public String toString() {
//        return "User{" +
////            "login='" + login + '\'' +
////            ", firstName='" + firstName + '\'' +
////            ", lastName='" + lastName + '\'' +
//            ", email='" + email + '\'' +
//            ", imageUrl='" + imageUrl + '\'' +
//            ", activated='" + activated + '\'' +
////            ", langKey='" + langKey + '\'' +
//            ", activationKey='" + activationKey + '\'' +
//            "}";
//    }
//}
