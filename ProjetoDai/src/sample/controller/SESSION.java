package sample.controller;

import sample.Main;
import sample.model.Prisioneiro;
import sample.model.Quiz;

import java.util.ArrayList;

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

        Quiz x = BD_CONTROLLER.getQuiz(nowusing.getID());
       if(x!=null){
        this.sessionquiz =x;
    }


    }

    //teste teste
    public boolean addShopping(PRODUCT_TB x) {
        if(BD_CONTROLLER.getProductStock(x.type.getID())<=0){
            return false;
        }else  {
            shoplist.addSHOPLIST(x);
            return true;
        }

    }

    public void resetQuiz(){
        sessionquiz = null;
    }

    public void removeShopping(PRODUCT_TB x){
        shoplist.removeSHOPLIST(x);
    }

    public void applyJOB(int id, int idjob){
        BD_CONTROLLER.applyjob(id,idjob);
    }


    public ArrayList displayShoplist(){
        return shoplist.Shoplist;
    }


    public String finishShopping() {

        if(shoplist.getPrice()==0){return "";}
        //checkar se há stock para vender
        for(int i=0;i < shoplist.Shoplist.size();i++){
            if(BD_CONTROLLER.getProductStock(shoplist.Shoplist.get(i).type.getID())>= shoplist.Shoplist.get(i).quantity){}
            else{
                System.out.println("Não há stock");
                return shoplist.Shoplist.get(i).type.getNome(); }
        }

        if(nowusing.getSaldo()<shoplist.getPrice()){
            return "NO_SALDO";
        }


        nowusing.removeSaldo(shoplist.getPrice());
        BD_CONTROLLER.removeCredits(nowusing.getID(),shoplist.getPrice());




        //criar e adicionar uma transaction ao user na bd


        int d = BD_CONTROLLER.addPurchase(Main.sis.sessionatual.nowusing.getID());
        for(int i = 0; i<shoplist.Shoplist.size() ; i++){
            BD_CONTROLLER.addPressProdut(d,shoplist.Shoplist.get(i).quantity,Main.sis.sessionatual.shoplist.Shoplist.get(i).type.getID());
        }


        //reset shoplist

        resetShoplist();
        return "finished";
    }


    public void resetShoplist(){
        shoplist=new SHOPLIST();
    }

}
