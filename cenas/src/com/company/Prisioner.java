public class Prisioner {

    private String name;
    private INT bi;
    private VAR image;
    private VAR n_prisioneir;
    private INT n_cell;
    private DATE data_nascimento;
    private INT Balance;



    public Prisioner() {
        this.name = "";
        this.bi= "";
        this.image = "";
        this.n_prisioneir = "";
        this.n_cell = "";
        this.data_nascimento = "";
        this.balance = "";
    }


    public Prisioner ( String name, INT bi, VAR image, VAR n_prisioneir, INT n_cell, DATE data_nascimento, INT Balance) {
        this.name = name;
        this.bi= bi;
        this.image = image;
        this.n_prisioneir = n_prisioneir;
        this.n_cell = n_cell;
        this.data_nascimento = data_nascimento;
        this.balance = balance;
    }


    public Prisioner (Prisioner p) {
        this.name = p.getName;
        this.bi= p.getBi;
        this.image = p.getImage;
        this.n_prisioneir = p.getN_Prisioner;
        this.n_cell = p.getN_cell;
        this.data_nascimento = p.getData_Nascimento;
        this.balance = p.getBalance;
    }




    public String getName(){
        return this.name;
    }
    public INT getBi(){
        return this.bi;
    }
    public VAR getImage(){
        return this.image;
    }
    public VAR getN_Prisioner(){
        return this.n_prisioneir;
    }
    public INT getN_cell(){
        return this.n_cell;
    }
    public DATE data_nascimento(){
        return this.data_nascimento;
    }
    public INT balance(){
        return this.balance;
    }


