package com.lustprision.admin.web.rest.vm;

import com.lustprision.admin.service.dto.AdminEmployDTO;

public class ManagedEmployVM extends AdminEmployDTO {

    private String userName;

    private String password;

    public ManagedEmployVM(){}

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

}
