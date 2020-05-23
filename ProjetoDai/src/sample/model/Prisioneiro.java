package sample.model;



import java.sql.Date;

public class Prisioneiro {
    private int ID;
    private String Nome;
    private int NumRecluso;
    private int Saldo;
    private boolean PermissaoQuiz;
    private Date DataNascim;


    public Prisioneiro(int ID, String Name, int NumRecluso, Date DataNascim, int Balance){
        this.ID=ID;
        this.Saldo=Balance;
        this.Nome=Name;
        this.NumRecluso = NumRecluso;
        this.DataNascim = DataNascim;
    }

    public void setID (int id){ ID = id; }

    public void setSaldo (int saldo){ Saldo = saldo; }

    public void setNome (String nome){ Nome = nome; }

    public void setNumRecluso (int numRecluso){ NumRecluso = numRecluso; }

    public void setDataNascim (Date dataNascim){ DataNascim = dataNascim; }

    public boolean isPermissaoQuiz() {
        return PermissaoQuiz;
    }

    public String getSaldo() {
        return String.valueOf(Saldo);
    }

    public String getNome() {
        return Nome;
    }

    public int getID() {
        return ID;
    }

    public String getNumRecluso() {return String.valueOf(NumRecluso);}

    public Date getDataNascim(){return (DataNascim);}







}
