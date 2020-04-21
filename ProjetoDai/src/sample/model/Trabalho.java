package sample.model;

public class Trabalho {
    private int IdTrabalho;
    private String Nome;
    private int PrecoHora;
    private int Vagas;


    public Trabalho(int IdTrabalho, String Nome,  int PrecoHora, int Vagas){
        this.IdTrabalho=IdTrabalho;
        this.Nome=Nome;
        this.PrecoHora=PrecoHora;
        this.Vagas=Vagas;
    }

    public int getVagas() { return Vagas;}

    public int getPrecoHora() {
        return PrecoHora;
    }

    public String getNome() {
        return Nome;
    }

    public int getIdTrabalho() {
        return IdTrabalho;
    }

}

