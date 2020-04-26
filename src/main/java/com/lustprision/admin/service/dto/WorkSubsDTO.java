package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.PressWork;

public class WorkSubsDTO {

    private Long pressID;

    private Long pressState;

    private String stateName;

    private String prisonerName;

    private byte[] prisonerImage;

    private String prisonerImageContentType;

    public WorkSubsDTO(PressWork pressWork){
        this.pressID = pressWork.getId();
        this.pressState = pressWork.getState().getId();
        this.stateName = pressWork.getState().getName();
        this.prisonerName = pressWork.getPrisioner().getName();
        this.prisonerImage = pressWork.getPrisioner().getProfileImage();
        this.prisonerImageContentType = pressWork.getPrisioner().getProfileImageContentType();
    }

    public Long getPressID() {
        return pressID;
    }

    public void setPressID(Long pressID) {
        this.pressID = pressID;
    }

    public Long getPressState() {
        return pressState;
    }

    public void setPressState(Long pressState) {
        this.pressState = pressState;
    }

    public String getStateName() {
        return stateName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public String getPrisonerName() {
        return prisonerName;
    }

    public void setPrisonerName(String prisonerName) {
        this.prisonerName = prisonerName;
    }

    public byte[] getPrisonerImage() {
        return prisonerImage;
    }

    public void setPrisonerImage(byte[] prisonerImage) {
        this.prisonerImage = prisonerImage;
    }

    public String getPrisonerImageContentType() {
        return prisonerImageContentType;
    }

    public void setPrisonerImageContentType(String prisonerImageContentType) {
        this.prisonerImageContentType = prisonerImageContentType;
    }
}
