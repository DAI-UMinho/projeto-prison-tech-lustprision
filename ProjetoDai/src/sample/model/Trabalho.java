package sample.model;

public class Trabalho {
    public int IdTrabalho;
    public String Nome;
    public String Descricao;
    public String PrecoHora;
    public int Vagas;

    public Trabalho(int IdTrabalho,String Nome,String Descricao,String PrecoHora,int Vagas){
        this.IdTrabalho=IdTrabalho;
        this.Nome=Nome;
        this.Descricao=Descricao;
        this.PrecoHora=PrecoHora;
        this.Vagas=Vagas;
    }
}

