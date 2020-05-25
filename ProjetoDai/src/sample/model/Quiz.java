package sample.model;

import java.sql.Date;
import java.util.ArrayList;

public class Quiz {
    private int idQuiz;
    private ArrayList<Questoes> questoes = new ArrayList();

    private int currentquest; // em qual questão vai, refere-se a uma questao lista de questoes
    private int totalpoints;

    private int right_cont=0; //contadores para no fim aparecer lá quantas acertou e errou
    private int wrong_cont=0;

    public Quiz(int idQuiz, int QtdQuestoes, ArrayList<Questoes> questoes) {
        this.idQuiz = idQuiz;
        this.questoes = questoes;
    }

    public Questoes displayQuestion(){
        return questoes.get(currentquest);
    }

    public boolean answerQuestion(String x){ //não é a melhor maneira mas é prática e serve perfeitamente , podiamos ir por ids de resposta
        if(questoes.get(currentquest).answer(x)){
            totalpoints+= questoes.get(currentquest).getValorQuestao();
            currentquest++;
            right_cont++;
            return true;
        }else wrong_cont++;return false;
    }

    public void setID (int id){ idQuiz = id; }



    public int getIdQuiz() {
        return idQuiz;
    }



    public ArrayList getQuestoes() {
        return questoes;
    }


}
