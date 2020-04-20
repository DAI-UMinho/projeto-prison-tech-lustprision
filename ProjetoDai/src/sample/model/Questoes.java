package sample.model;

import java.util.ArrayList;

public class Questoes {

    public int idQuestao;
    public ArrayList<String> respostas;
    public String resposta;
    public int valorQuestao;

    public Questoes(int idQuestao, ArrayList<String> respostas , int valorQuestao, String resposta ){
        this.idQuestao=idQuestao;
        this.respostas=respostas;
        this.resposta=resposta;
        this.valorQuestao=valorQuestao;
    }
}
