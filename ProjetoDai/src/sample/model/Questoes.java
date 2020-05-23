package sample.model;

import java.sql.Date;
import java.util.ArrayList;

public class Questoes {

    private int idQuestao;
    private ArrayList<String> respostas;
    private String resposta;
    private int valorQuestao;

    public Questoes(int idQuestao, ArrayList<String> respostas , int valorQuestao, String resposta ){
        this.idQuestao=idQuestao;
        this.respostas=respostas;
        this.resposta=resposta;
        this.valorQuestao=valorQuestao;
    }

    public void setID (int id){ idQuestao = id; }

    public void setResposta (String Resposta){ resposta = Resposta; }

    public void setValorQuestao (int ValorQuestao){ valorQuestao = ValorQuestao; }

    public String getResposta() { return resposta;}

    public ArrayList<String> getRespostas() {
        return respostas;
    }

    public int getIdQuestao() {
        return idQuestao;
    }

    public int getValorQuestao() {
        return valorQuestao;
    }


}
