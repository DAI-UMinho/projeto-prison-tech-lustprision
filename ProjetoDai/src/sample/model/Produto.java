package sample.model;

import java.sql.Date;

public class Produto {
    private int ID;
    private String Nome;
    private String Descricao;
    private int Preco;
    private int Stock;


    public Produto(int ID, String Name, String Description, int Price, int Stock) {
        this.ID = ID;
        this.Nome = Name;
        this.Descricao = Description;
        this.Preco = Price;
        this.Stock = Stock;
    }

    public Produto(String Name, int Price){
        this.Nome = Name;
        this.Preco = Price;
    }

    public void setID (int id){ ID = id; }

    public void setDescricao (String descricao){ Descricao = descricao; }

    public void setNome (String nome){ Nome = nome; }

    public void setPreco (int preco){ Preco = preco; }

    public void setStock (int stock){ Stock = stock; }

    public int getStock() { return Stock;}

    public int getPreco() {
        return Preco;
    }

    public String getDescricao() {
        return Descricao;
    }

    public String getNome() {
        return Nome;
    }

    public int getID() {
        return ID;
    }


}
