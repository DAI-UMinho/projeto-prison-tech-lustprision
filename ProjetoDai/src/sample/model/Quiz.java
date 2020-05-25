package sample.model;

import sample.controller.BD_CONTROLLER;

import java.sql.Date;
import java.util.ArrayList;

public class Quiz {
    private int idQuiz;
    private ArrayList<Questoes> questoes = new ArrayList();

    private int currentquest; // em qual questão vai, refere-se a uma questao lista de questoes
    private int totalpoints;
    private boolean lastquest=false;
    private int right_cont=0; //contadores para no fim aparecer lá quantas acertou e errou
    private int wrong_cont=0;

    public Quiz(int idQuiz, int QtdQuestoes, ArrayList<Questoes> questoes) {
        this.idQuiz = idQuiz;
        this.questoes = questoes;
    }

    public Questoes displayQuestion(){
        if(currentquest==4){
            lastquest=true;
        }

        return questoes.get(currentquest);
    }

    public boolean answerQuestion(String x){ //não é a melhor maneira mas é prática e serve perfeitamente , podiamos ir por ids de resposta
        try {
            //BD_CONTROLLER.answerQuestion(x, questoes.get(currentquest).getIdQuestao(), idQuiz);
        }catch(Exception e){e.printStackTrace();}

        if(questoes.get(currentquest).answer(x)){
            totalpoints+= questoes.get(currentquest).getValorQuestao();
            currentquest++;
            right_cont++;
            return true;
        }else currentquest++;wrong_cont++;return false;
    }

    public void setID (int id){ idQuiz = id; }



    public int getIdQuiz() {
        return idQuiz;
    }

    public boolean isLastquest() {return lastquest;}

    public ArrayList getQuestoes() {
        return questoes;
    }

    public int getTotalpoints(){return totalpoints;}

    public int getRight_cont(){return right_cont;}

    public int getWrong_cont(){return wrong_cont;}

}
