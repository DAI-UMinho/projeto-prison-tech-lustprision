package sample.controller;

import sample.model.Prisioneiro;

public class SESSION {
    Prisioneiro nowusing;
    SHOPLIST shoplist = new SHOPLIST();
    //int balance=0; // resultado das compras do recluso para no fim da sessão ajustar o valor na BD
    boolean started = false;

    public SESSION(Prisioneiro nowusing){
        this.nowusing=nowusing;
        this.started = true;
    }

    //teste teste
    public void addShopping(PRODUCT_TB x) {
        shoplist.addSHOPLIST(x);

    }

    public void removeShopping(PRODUCT_TB x){
        for(int i = 0;i<shoplist.Shoplist.size();i++){
            if(shoplist.Shoplist.get(i).type.getID() == x.type.getID()){
                shoplist.Price-=shoplist.Shoplist.get(i).type.getPreco();
                shoplist.Shoplist.remove(i);
            }
        }
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
