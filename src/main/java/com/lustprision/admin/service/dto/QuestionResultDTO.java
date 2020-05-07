package com.lustprision.admin.service.dto;

public class QuestionResultDTO {

    private String question;

    private String questionAnswer;

    private String userAnswer;

    private boolean isCorrect;

    public QuestionResultDTO() {}

    public QuestionResultDTO(String question, String questionAnswer, String userAnswer, boolean isCorrect) {
        this.question = question;
        this.questionAnswer = questionAnswer;
        this.userAnswer = userAnswer;
        this.isCorrect = isCorrect;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQuestionAnswer() {
        return questionAnswer;
    }

    public void setQuestionAnswer(String questionAnswer) {
        this.questionAnswer = questionAnswer;
    }

    public String getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(String userAnswer) {
        this.userAnswer = userAnswer;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}
