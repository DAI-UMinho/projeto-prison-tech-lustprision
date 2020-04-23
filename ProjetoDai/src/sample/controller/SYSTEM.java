package sample.controller;

import java.util.*;

public class SYSTEM {

    ArrayList<PRODUCT_TB> products = new ArrayList();
    ArrayList<WORK_TB> works = new ArrayList<>();

    public SESSION sessionatual;

    public void loadProductsTS() {
        if (BD_CONTROLLER.getPRODUCTS() == null) {
        } else this.products = BD_CONTROLLER.getPRODUCTS();
    }

    public void loadWorksTS() {
        if (BD_CONTROLLER.getWORKS() == null) {
        } else this.works = BD_CONTROLLER.getWORKS();
    }

    public boolean LoginTS(int ID, int PIN) {
        if (PIN == BD_CONTROLLER.getPrisionerPIN(ID)) {
            SESSION atual = new SESSION(BD_CONTROLLER.loadUser(ID));
            this.sessionatual = atual;
            System.out.println("Login com sucesso");
            return true;
        } else System.out.println("Sem LOGIN");
        return false;
    }

    public void reset() {
        this.products= new ArrayList<>();
        this.works = new ArrayList<>();
    }


}
