package sample.controller;

import sample.Main;
import sample.model.Prisioneiro;
import sample.model.Quiz;

public class SESSION {
    public Prisioneiro nowusing;
    public SHOPLIST shoplist = new SHOPLIST();
    public Quiz sessionquiz;

    boolean started = false;

    public SESSION(Prisioneiro nowusing){
        this.nowusing=nowusing;
        this.started = true;
        Main.sis.loadProductsTS();
        Main.sis.loadWorksTS();
       if(BD_CONTROLLER.getQuiz(nowusing.getID())!=null){
        this.sessionquiz =BD_CONTROLLER.getQuiz(nowusing.getID());
    }
    }

    //teste teste
    public void addShopping(PRODUCT_TB x) {
        shoplist.addSHOPLIST(x);
    }

    public void resetQuiz(){
        sessionquiz = null;
    }

    public void removeShopping(PRODUCT_TB x){
        for(int i = 0;i<shoplist.Shoplist.size();i++){
            if(shoplist.Shoplist.get(i).type.getID() == x.type.getID()){
                shoplist.Price-=shoplist.Shoplist.get(i).type.getPreco();
                shoplist.Shoplist.remove(i);
            }
        }
    }

    public void applyJOB(int id, int idjob){
        BD_CONTROLLER.applyjob(id,idjob);
    }

    public String finishShopping() {
        //checkar se há stock para vender
        for(int i=0;i < shoplist.Shoplist.size();i++){
            if(BD_CONTROLLER.getProductStock(shoplist.Shoplist.get(i).type.getID())>=0){}
            else return shoplist.Shoplist.get(i).type.getNome();
        }

        //atualizar a bd dos produtos
        for(int i=0;i < shoplist.Shoplist.size();i++){
            BD_CONTROLLER.removeProduct(shoplist.Shoplist.get(i).type.getID(),1);
        }

        //descontar o valor pago na bd
        int payprice =0;
        for(int i=0;i < shoplist.Shoplist.size();i++){
           payprice += shoplist.Shoplist.get(i).type.getPreco();
        }

        BD_CONTROLLER.removeCredits(nowusing.getID(),payprice);

        //criar e adicionar uma transaction ao user na bd

        //atualizar o frontend

        //reset shoplist
        shoplist.resetSHOPLIST();

        return "finished";
    }

    public void finishSession() {
    }
}
