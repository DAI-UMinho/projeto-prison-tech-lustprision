package sample.model;

import java.sql.Date;
import java.util.ArrayList;

public class Quiz {
    private int idQuiz;
    private ArrayList<Questoes> questoes = new ArrayList();
    private String respostaCorreta;
    private String respostaErrada1;
    private String respostaErrada2;
    private String respostaErrada3;


    public Quiz(int idQuiz, ArrayList<Questoes> questoes, String respostaCorreta, String respostaErrada1, String respostaErrada2, String respostaErrada3) {
        this.idQuiz = idQuiz;
        this.questoes = questoes;
        this.respostaCorreta = respostaCorreta;
        this.respostaErrada1 = respostaErrada1;
        this.respostaErrada2 = respostaErrada2;
        this.respostaErrada3 = respostaErrada3;
    }



    public void setID (int id){ idQuiz = id; }



    public int getIdQuiz() {
        return idQuiz;
    }



    public ArrayList getQuestoes() {
        return questoes;
    }


}
