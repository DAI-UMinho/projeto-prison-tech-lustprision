package sample.model;

import java.util.ArrayList;

public class Quiz {
    public int idQuiz;
    public int QtdQuestoes;
    public ArrayList<Questoes> questoes= new ArrayList();

    public Quiz(int idQuiz,int QtdQuestoes, ArrayList<Questoes> questoes){
        this.idQuiz=idQuiz;
        this.QtdQuestoes=QtdQuestoes;
        this.questoes=questoes;
    }
}
