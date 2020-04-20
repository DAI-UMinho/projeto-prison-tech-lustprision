package sample.model;

import java.util.ArrayList;

public class Quiz {
    private int idQuiz;
    private int QtdQuestoes;
    private ArrayList<Questoes> questoes = new ArrayList();


    public Quiz(int idQuiz, int QtdQuestoes, ArrayList<Questoes> questoes) {
        this.idQuiz = idQuiz;
        this.QtdQuestoes = QtdQuestoes;
        this.questoes = questoes;
    }

    public int getIdQuiz() {
        return idQuiz;
    }

    public int getQtdQuestoes() {
        return QtdQuestoes;
    }

    public ArrayList getQuestoes() {
        return questoes;
    }
    
}