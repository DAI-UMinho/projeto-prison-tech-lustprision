package sample.view.controllerView;

public class PRODUCTLISTLINE {
    public int price;
    public String Nome;
    public int qnt;

    public PRODUCTLISTLINE(int price, String nome, int qnt) {
        this.price = price;
        Nome = nome;
        this.qnt = qnt;
    }


    public int getPrice() {
        return price;
    }

    public String getNome() {
        return Nome;
    }

    public int getQnt() {
        return qnt;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public void setNome(String nome) {
        Nome = nome;
    }

    public void setQnt(int qnt) {
        this.qnt = qnt;
    }
}
