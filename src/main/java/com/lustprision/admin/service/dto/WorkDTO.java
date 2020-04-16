package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.Work;

import javax.validation.constraints.Size;
import java.time.LocalDate;

public class WorkDTO {

    @Size(max = 38)
    private Long id;

    @Size(max = 255)
    private String nameWork;

    @Size(max = 38)
    private Long totalCredits;

    @Size()
    private LocalDate dateWork;


    public WorkDTO() {
        // Empty constructor needed for Jackson.
    }

    public WorkDTO(Work work) {
        this.id = work.getId();
        this.nameWork = work.getNameWork();
        this.totalCredits = work.getTotalCredits();
        this.dateWork = work.getDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameWork() { return nameWork; }

    public void setNameWork(String nameWork) { this.nameWork = nameWork;}

    public Long getTotalCredits() { return totalCredits; }

    public void setTotalCredits(Long id) { this.totalCredits = totalCredits; }

    public LocalDate getDateWork() { return dateWork; }

    public void setDateWork(LocalDate dateWork) { this.dateWork = dateWork; }
}
