package sample.model;

import com.sun.source.doctree.InheritDocTree;
import oracle.jdbc.proxy.annotation.Pre;

import java.sql.Date;

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

    public void setID (int id){ IdTrabalho = id; }

    public void setPrecoHora (int precoHora){ PrecoHora = precoHora; }

    public void setNome (String nome){ Nome = nome; }

    public void setVagas (int vagas){ Vagas = vagas; }

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

