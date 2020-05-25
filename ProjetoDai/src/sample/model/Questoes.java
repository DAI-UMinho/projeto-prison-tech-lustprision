package sample.model;

import java.sql.Date;
import java.util.ArrayList;

public class Questoes {

    private int idQuestao;
    private String questao;
    private ArrayList<String> respostaserradas;
    private String resposta;
    private int valorQuestao;


    public Questoes(int idQuestao,String questao, ArrayList<String> respostas , int valorQuestao, String resposta ){
        this.idQuestao=idQuestao;
        this.respostaserradas=respostas;
        this.resposta=resposta;
        this.valorQuestao=valorQuestao;
        this.questao=questao;
    }

    public boolean answer(String ans){
        if(ans.equals(resposta)){return true;}
        return false;
    }



    public String getRespostaErrada(int i){ //i = 0,1,2 só há 3 respostas erradas
        return respostaserradas.get(i);
    }

    public void setID (int id){ idQuestao = id; }

    public void setResposta (String Resposta){ resposta = Resposta; }

    public void setValorQuestao (int ValorQuestao){ valorQuestao = ValorQuestao; }

    public String getResposta() { return resposta;}

    public ArrayList<String> getRespostas() {
        return respostaserradas;
    }

    public int getIdQuestao() {
        return idQuestao;
    }

    public int getValorQuestao() {
        return valorQuestao;
    }

    public String getQuestao() {
        return questao;
    }
}
