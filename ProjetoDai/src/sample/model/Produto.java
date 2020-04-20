package sample.model;

public class Produto {
    private int ID;
    private String Nome;
    private String Descricao;
    private int Preco;
    private int Stock;

    public int getStock() {
        return Stock;
    }

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

    public Produto(int ID, String Name, String Description, int Price, int Stock){
        this.ID=ID;
        this.Nome=Name;
        this.Descricao=Description;
        this.Preco=Price;
        this.Stock=Stock;
}}
