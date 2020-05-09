package com.lustprision.admin.service.dto;

public class WorkStatDTO {

    private int completed;

    private int creditsEarned;

    private int canceled;

    public WorkStatDTO(){
        creditsEarned = 0;
        completed = 0;
        canceled = 0;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public int getCreditsEarned() {
        return creditsEarned;
    }

    public void setCreditsEarned(int creditsEarned) {
        this.creditsEarned = creditsEarned;
    }

    public int getCanceled() {
        return canceled;
    }

    public void setCanceled(int canceled) {
        this.canceled = canceled;
    }
}
