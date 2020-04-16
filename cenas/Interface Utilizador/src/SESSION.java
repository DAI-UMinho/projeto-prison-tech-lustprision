import java.util.ArrayList;

public class SESSION {
    USER nowusing;
    SHOPLIST shoplist = new SHOPLIST();
    int balance=0; // resultado das compras do recluso para no fim da sessão ajustar o valor na BD


    public SESSION(){}

    public void startSession() {
        //ir buscar a info do user à bd através do SYSTEM.login()
        //carregar o frontend
    }


    public void addShopping() {


    }

    public void finishShopping() {
        //atualizar a bd dos produtos
        //criar e adicionar uma transaction ao user na bd
        //mudar o balance
        //atualizar o frontend
        //reset shoplist


    }

    public void finishSession() {
        //atualizar o balance na bd
        //reset frontend

    }

}
