package sample.model;

import java.util.ArrayList;

public class Questoes {

    private int idQuestao;
    private ArrayList<String> respostas;
    private String resposta;

    public String getResposta() {
        return resposta;
    }

    public ArrayList<String> getRespostas() {
        return respostas;
    }

    public int getIdQuestao() {
        return idQuestao;
    }

    public int getValorQuestao() {
        return valorQuestao;
    }

    private int valorQuestao;

    public Questoes(int idQuestao, ArrayList<String> respostas , int valorQuestao, String resposta ){
        this.idQuestao=idQuestao;
        this.respostas=respostas;
        this.resposta=resposta;
        this.valorQuestao=valorQuestao;
    }
}
