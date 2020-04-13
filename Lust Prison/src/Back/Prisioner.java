package Back;

import java.util.Date;

public class Prisioner {

    private String name;
    private int bi;
    private String image;
    private String n_prisioneir;
    private int n_cell;
    private Date data_nascimento;
    private int balance;


    public Prisioner() {
        this.name = "";
        this.bi =Integer.parseInt("");
        this.image = "";
        this.n_prisioneir = "";
        this.n_cell = Integer.parseInt("");
        this.data_nascimento = new Date();
        this.balance = Integer.parseInt("");
    }


    public Prisioner(String name, int bi, String image, String n_prisioneir, int n_cell, Date data_nascimento, int Balance) {
        this.name = name;
        this.bi = bi;
        this.image = image;
        this.n_prisioneir = n_prisioneir;
        this.n_cell = n_cell;
        this.data_nascimento = data_nascimento;
        this.balance = balance;
    }


    public Prisioner(Prisioner p) {
        this.name = p.getName();
        this.bi = p.getBi();
        this.image = p.getImage();
        this.n_prisioneir = p.getN_Prisioner();
        this.n_cell = p.getN_cell();
        this.data_nascimento = p.getData_Nascimento();
        this.balance = p.getBalance();
    }


    public String getName() {
        return this.name;
    }

    public int getBi() {
        return this.bi;
    }

    public String getImage() {
        return this.image;
    }

    public String getN_Prisioner() {
        return this.n_prisioneir;
    }

    public int getN_cell() {
        return this.n_cell;
    }

    public Date getData_Nascimento() {
        return this.data_nascimento;
    }

    public int getBalance() {
        return this.balance;
    }
}

