package com.lustprision.admin.service.dto.stats;

public class MonthDataDTO {

    private String monthName;
    private Integer value;

    public MonthDataDTO(){
        monthName = "";
        value = 0;
    }

    public MonthDataDTO(String monthName, Integer value){
        this.monthName = monthName;
        this.value = value;
    }

    public String getMonthName() {
        return monthName;
    }

    public void setMonthName(String monthName) {
        this.monthName = monthName;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }
}
