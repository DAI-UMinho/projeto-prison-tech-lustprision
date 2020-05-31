package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.Work;

import javax.validation.constraints.Size;
import java.time.LocalDate;

public class WorkDTO extends AuditDTO{

    @Size(max = 38)
    private Long id;

    private Long pressProductId;

    @Size(max = 255)
    private String nameWork;

    @Size(max = 38)
    private Long totalCredits;

    @Size()
    private LocalDate dateWork;

    @Size(max = 38)
    private Long stateID;

    private String stateName;

    public WorkDTO() {
        super(null, null, null, null);
        // Empty constructor needed for Jackson.
    }

    public WorkDTO(Work work) {
        super(work.getCreatedBy(), work.getCreatedDate(), work.getLastModifiedBy(), work.getLastModifiedDate());
        this.id = work.getId();
        this.nameWork = work.getNameWork();
        this.totalCredits = work.getTotalCredits();
        this.dateWork = work.getDate();
        this.stateID = Long.valueOf(1);
        this.stateName = "";
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

    public Long getStateID(){ return stateID; }

    public void setStateID(Long stateID){ this.stateID = stateID; }

    public String getStateName(){ return stateName; }

    public void setStateName(String stateName){ this.stateName = stateName; }

    public Long getPressProductId(){ return pressProductId; }

    public void setPressProductId(Long pressProductId){ this.pressProductId = pressProductId; }
}
