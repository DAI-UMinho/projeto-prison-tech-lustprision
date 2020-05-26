package sample.controller;

import java.util.*;

public class SYSTEM {

    public ArrayList<PRODUCT_TB> products = new ArrayList<>();
    public ArrayList<WORK_TB> works = new ArrayList<>();
    public ArrayList<WORK_TB> filterjob = new ArrayList<>();

    public SESSION sessionatual;

    public void loadProductsTS() {
        if (BD_CONTROLLER.getPRODUCTS() == null) {
        } else this.products = BD_CONTROLLER.getPRODUCTS();
    }

    public void loadWorksTS() {
        if (BD_CONTROLLER.getWORKS() == null) {
        } else {this.works = BD_CONTROLLER.getWORKS();
            System.out.println("Trabalhos carregados no sistema");
        };
    }

    public void loadFilterJobs() {
        if (BD_CONTROLLER.getJobFilter() == null) {
        } else {this.filterjob = BD_CONTROLLER.getJobFilter();
            System.out.println("Trabalhos Filtrados carregados no sistema");
        };
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

    public PRODUCT_TB getProductFS(int id){
        for(int i = 0;i<products.size();i++){
            if(products.get(i).type.getID()==id){
                return products.get(i);
            }
        }
        return null;
    }


    public PRODUCT_TB getProductFSNAME(String name){
        for(int i = 0;i<products.size();i++){
            if(products.get(i).type.getNome().equals(name)){
                return products.get(i);
            }
        }
        return null;
    }

}
