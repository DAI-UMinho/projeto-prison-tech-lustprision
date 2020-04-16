package com.lustprision.admin.service.dto;

import com.lustprision.admin.config.Constants;
import com.lustprision.admin.domain.AdminEmploy;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.Set;

/**
 * A DTO representing a user, with his authorities.
 */
public class AdminEmployDTO {

    private Long id;

/*    @NotBlank
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    private String userName;*/

    @Size(max = 50)
    private String nameAdminEmp;

    @Email
    @Size(min = 5, max = 254)
    private String email;

    @Size(max = 256)
    private String imageUrl;

    private boolean activated = false;

    @Size(min = 2, max = 10)
    private String langKey;

    private String createdBy;

    private Instant createdDate;

    private String lastModifiedBy;

    private Instant lastModifiedDate;

    private String authority;

    public AdminEmployDTO() {
        // Empty constructor needed for Jackson.
    }

    public AdminEmployDTO(AdminEmploy employee) {
        this.id = employee.getId();
        this.nameAdminEmp = employee.getNameAdminEmp();
        this.email = employee.getEmail();
        this.activated = employee.isActivated();
//        this.imageUrl = user.getImageUrl();
//        this.langKey = user.getLangKey();
/*        this.createdBy = employee.getCreatedBy();
        this.createdDate = employee.getCreatedDate();
        this.lastModifiedBy = employee.getLastModifiedBy();
        this.lastModifiedDate = employee.getLastModifiedDate();*/
        this.authority = employee.getAuthority().getName();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

/*    public String getLogin() {
        return userName;
    }

    public void setLogin(String userName) {
        this.userName = userName;
    }*/

    public String getNameAdminEmp() {
        return nameAdminEmp;
    }

    public void setNameAdminEmp(String nameAdminEmp) {
        this.nameAdminEmp = nameAdminEmp;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
//            "login='" + userName + '\'' +
//            ", firstName='" + firstName + '\'' +
//            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", activated=" + activated +
            ", langKey='" + langKey + '\'' +
            ", createdBy=" + createdBy +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastModifiedBy + '\'' +
            ", lastModifiedDate=" + lastModifiedDate +
            ", authorities=" + authority +
            "}";
    }
}
