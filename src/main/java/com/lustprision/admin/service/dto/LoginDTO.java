package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.Login;

public class LoginDTO {

    private Long id;

    private String userName;

    private String password;

    private Long employeeID;

    public LoginDTO(){}

    public LoginDTO(Login login){
        this.id = login.getId();
        this.userName = login.getUserName();
        this.password = login.getPassword();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getEmployeeID() { return employeeID; }

    public void setEmployeeID(Long employeeID){ this.employeeID = employeeID;}

}
