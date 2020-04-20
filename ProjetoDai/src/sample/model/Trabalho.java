package sample.model;

public class Trabalho {
    private int IdTrabalho;
    private String Nome;
    private String Descricao;
    private String PrecoHora;
    private int Vagas;

    public int getVagas() {
        return Vagas;
    }

    public String getPrecoHora() {
        return PrecoHora;
    }

    public String getDescricao() {
        return Descricao;
    }

    public String getNome() {
        return Nome;
    }

    public int getIdTrabalho() {
        return IdTrabalho;
    }

    public Trabalho(int IdTrabalho, String Nome, String Descricao, String PrecoHora, int Vagas){
        this.IdTrabalho=IdTrabalho;
        this.Nome=Nome;
        this.Descricao=Descricao;
        this.PrecoHora=PrecoHora;
        this.Vagas=Vagas;
    }
}

