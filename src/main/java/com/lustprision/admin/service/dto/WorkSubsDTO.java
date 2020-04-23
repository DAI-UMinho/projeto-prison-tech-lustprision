package com.lustprision.admin.service.dto;

public class WorkSubsDTO {

    private Long pressID;

    private Long pressState;

    private String stateName;

    private String prisonerName;

    private byte[] prisonerImage;

    private String prisonerImageContentType;

    public WorkSubsDTO(){
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
