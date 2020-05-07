package com.lustprision.admin.service.dto;

import com.lustprision.admin.domain.PrisQuiz;

public class PendingQuizDTO extends PrisQuizDTO {

    private String prisonerName;

    private byte[] prisonerImage;

    private String prisonerImageContentType;

    public PendingQuizDTO() {}

    public PendingQuizDTO(PrisQuiz prisQuiz) {
        super(prisQuiz);
        this.prisonerName = prisQuiz.getPrisioner().getName();
        this.prisonerImage = prisQuiz.getPrisioner().getProfileImage();
        this.prisonerImageContentType = prisQuiz.getPrisioner().getProfileImageContentType();
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

    public String getPrisonerName() {
        return prisonerName;
    }

    public void setPrisonerName(String prisonerName) {
        this.prisonerName = prisonerName;
    }

}
