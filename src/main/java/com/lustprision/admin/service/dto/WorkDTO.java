package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.Work;

import javax.validation.constraints.Size;

public class WorkDTO {

    @Size(max = 38)
    private Long id;

    @Size(max = 255)
    private String nameWork;

    @Size(max = 38)
    private Long priceHour;


    public WorkDTO() {
        // Empty constructor needed for Jackson.
    }

    public WorkDTO(Work work) {
        this.id = work.getId();
        this.nameWork = work.getNameWork();
        this.priceHour = work.getPriceHour();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameWork() { return nameWork; }

    public void setNameWork(String nameWork) { this.nameWork = nameWork;}

    public Long getPriceHour() { return priceHour; }

    public void setPriceHour(Long id) { this.priceHour = priceHour; }
}
