package sample.model;

public class Prisioneiro {
    private int ID;
    private String Nome;
    private int Saldo;
    private boolean PermissaoQuiz;

    public Prisioneiro(int ID, String Name, int Balance){

        this.ID=ID;
        this.Saldo=Balance;
        this.Nome=Name;

    }


    public boolean isPermissaoQuiz() {
        return PermissaoQuiz;
    }

    public int getSaldo() {
        return Saldo;
    }

    public String getNome() {
        return Nome;
    }

    public int getID() {
        return ID;
    }







}
